import AsyncStorage from "@react-native-async-storage/async-storage"

import { needsUpdate, convert } from "./infrastructureChange"
import formatQuotee from "./formatQuotee"

class Storage {
    constructor(){
        this.items = []
    }
    static fromItems(items){
        const storage = new Storage()
        storage.items = items

        return storage
    }
    initialize(callback){
        AsyncStorage.getAllKeys((error, keys) => {
            if(error){
                console.warn(error)
            } else {
                if(keys.includes("quote-it-storage")){
                    AsyncStorage.getItem("quote-it-storage", (error, storageString) => {
                        if(error){
                            console.warn(error)
                        } else {
                            try {
                                this.items = JSON.parse(storageString)

                                // handle infrastructure change
                                let rewrite = false
                                for(let i = 0;i<this.items.length;i++){
                                    if(needsUpdate(this.items[i].info)){
                                        rewrite = true
                                        this.items[i].info = convert(this.items[i].info)
                                    }
                                }
                                if(rewrite){
                                    AsyncStorage.setItem("quote-it-storage", JSON.stringify(this.items), (error) => {
                                        if(error){
                                            console.warn(error)
                                        } else {
                                            callback()
                                        }
                                    })
                                } else {
                                    callback()
                                }
                            } catch(error){
                                console.warn(error)
                            }
                        }
                    })
                } else {
                    AsyncStorage.setItem("quote-it-storage", JSON.stringify([]), (error) => {
                        if(error){
                            console.warn(error)
                        } else {
                            callback()
                        }
                    })
                }
            }
        })
    }
    getQuotees(){
        const quotees = []
        this.items.forEach(item => {
            let foundQuotee = false
            let i = 0
            while(!foundQuotee && i < quotees.length){
                if(quotees[i].formattedQuotee == formatQuotee(item.info.quotee)){
                    foundQuotee = true
                } else {
                    i++
                }
            }
            if(foundQuotee){
                quotees[i].quotesCount++
            } else {
                quotees.push({ formattedQuotee: formatQuotee(item.info.quotee), quotesCount: 1 })
            }
        })
        return quotees.sort((a, b) => {
            if(a.quotesCount > b.quotesCount){
                return -1
            } else if(a.quotesCount < b.quotesCount){
                return 1
            } else {
                return (a.formattedQuotee > b.formattedQuotee)
            }
        })
    }
    getFromQuotee(formattedQuotee){
        return this.items.filter((item) => formatQuotee(item.info.quotee) == formattedQuotee)
    }
    getInfo(id){
        for(let i = 0;i<this.items.length;i++){
            if(this.items[i].id == id){
                return {
                    quote: this.items[i].info.quote,
                    quotee: this.items[i].info.quotee,
                    font: this.items[i].info.font,
                    color: this.items[i].info.color,
                    scale: this.items[i].info.scale
                }
            }
        }
        return {
            quote: "",
            quotee: "",
            font: 0,
            color: 0,
            scale: 1
        }
    }
    update(id, info, callback){
        let foundId = false
        let i = 0
        while(!foundId && i < this.items.length){
            if(this.items[i].id == id){
                foundId = true
            } else {
                i++
            }
        }
        if(foundId){
            this.items[i].info = info
        } else {
            this.items.unshift({ id, info })
        }
        AsyncStorage.setItem("quote-it-storage", JSON.stringify(this.items), (error) => {
            if(error){
                console.warn(error)
            } else {
                callback()
            }
        })
    }
    updateMultiple(data, callback){
        data.forEach(({ id, info }) => {
            let foundId = false
            let i = 0
            while(!foundId && i < this.items.length){
                if(this.items[i].id == id){
                    foundId = true
                } else {
                    i++
                }
            }
            if(foundId){
                this.items[i].info = info
            } else {
                this.items.unshift({ id, info })
            }
        })
        AsyncStorage.setItem("quote-it-storage", JSON.stringify(this.items), (error) => {
            if(error){
                console.warn(error)
            } else {
                callback()
            }
        })
    }
    delete(id, callback){
        this.items = this.items.filter((item) => item.id != id)
        AsyncStorage.setItem("quote-it-storage", JSON.stringify(this.items), (error) => {
            if(error){
                console.warn(error)
            } else {
                callback()
            }
        })
    }
}

export default Storage