import AsyncStorage from "@react-native-async-storage/async-storage"

import { validateReceiptIos } from "react-native-iap"

const retrievePurchases = (callback) => {
    AsyncStorage.getAllKeys((error, keys) => {
        if(error){
            console.warn(error)
        } else {
            if(keys.includes("quote-it-iap")){
                AsyncStorage.getItem("quote-it-iap", (error, purchased) => {
                    if(error){
                        console.warn(error)
                    } else {
                        try {
                            callback(JSON.parse(purchased))
                        } catch(error) {
                            console.warn(error)
                        }
                    }
                })
            } else {
                AsyncStorage.setItem("quote-it-iap", "{}", (error) => {
                    if(error){
                        console.warn(error)
                    } else {
                        callback({})
                    }
                })
            }
        }
    })
}

const hasPurchase = (purchaseId, callback) => {
    retrievePurchases((purchases) => {
        if(purchases.hasOwnProperty(purchaseId)){
            validateReceiptIos({ receiptBody: purchases[purchaseId], isTest: false }).then((valid) => {
                callback(valid)
            }).catch((error) => {
                console.warn(error)
                callback(false)
            })
        } else {
            callback(false)
        }
    })
}

const addPurchase = (purchaseId, receipt, callback) => {
    retrievePurchases((purchases) => {
        const updatedPurchases = purchases
        updatedPurchases[purchaseId] = receipt

        AsyncStorage.setItem("quote-it-iap", JSON.stringify(updatedPurchases), (error) => {
            if(error){
                console.warn(error)
            } else {
                callback()
            }
        })
    })
}

export {
    hasPurchase,
    addPurchase
}