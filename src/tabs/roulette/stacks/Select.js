import React, { useState, useEffect } from "react"

import { TouchableWithoutFeedback, View, Text, FlatList, StyleSheet, Alert } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import { QuoteeSelectable } from  "../../../components/Quotee"

import Storage from "../../../scripts/storage"
import roulette from "../../../scripts/roulette"

import { screen, colors } from "../../../constants"

const SelectStack = ({ navigation }) => {
    const [items, setItems] = useState([])
    const [selectedQuotees, setSelectedQuotees] = useState({})

    useEffect(() => {
        let mounted = true

        const subscriber = navigation.getParent().addListener("state", () => {
            const storage = new Storage()

            storage.initialize(() => {
                if(mounted){
                    setItems(storage.items)

                    const selectedMap = {}

                    storage.getQuotees().forEach(quotee => {
                        if(typeof selectedQuotees[quotee.formattedQuotee] == "boolean"){
                            selectedMap[quotee.formattedQuotee] = selectedQuotees[quotee.formattedQuotee]
                        } else {
                            selectedMap[quotee.formattedQuotee] = true
                        }
                    })

                    setSelectedQuotees(selectedMap)
                }
            })
        })

        return () => {
            mounted = false

            subscriber()
        }
    }, [selectedQuotees])

    const renderSelectable = ({ item, index }) => {
        const quotee = item[0]
        const selected = item[1]

        const toggleSelected = () => {
            const temp = { ...selectedQuotees }
            temp[quotee] = !temp[quotee]

            setSelectedQuotees(temp)
        }

        return (
            <QuoteeSelectable key={index} formattedQuotee={quotee} selected={selected} toggleSelected={toggleSelected} />
        )
    }

    const generateGame = () => {
        const quoteeList = Object.entries(selectedQuotees).filter(entry => entry[1]).map(entry => entry[0])

        return roulette(Storage.fromItems(items), quoteeList)
    }

    return (
        <Page>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Quote Roulette</Text>
                </View>
                <Button style={styles.createButton} onPress={() => {
                    if(Object.entries(selectedQuotees).filter(entry => entry[1]).length > 1){
                        navigation.push("Game", { questions: generateGame() })
                    } else {
                        Alert.alert("Not Enough People", "You need to select at least 2 people to create a game.")
                    }
                }}>
                    <FontAwesomeIcon icon={faChevronRight} color={colors.extraLight} size={32} />
                </Button>
            </View>
            {
                Object.keys(selectedQuotees).length == 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No quotes yet</Text>
                    </View>
                ) : (
                    // content container > paddingBottom: 80
                    <FlatList contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false} data={Object.entries(selectedQuotees)} renderItem={renderSelectable} ListHeaderComponent={(
                        <TouchableWithoutFeedback>
                            <View style={styles.instructionsContainer}>
                                <Text style={styles.instructionsText}>Select Included Quotees</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )} />
                )
            }
        </Page>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: screen.width,
        height: 120,
        flexDirection: "row",
        backgroundColor: colors.extraLight,
        borderBottomWidth: 4,
        borderBottomColor: colors.flair,
        zIndex: 1000
    },
    headerTextContainer: {
        marginTop: 20,
        marginLeft: 40,
        width: screen.width - 160,
        height: 80,
        justifyContent: "center"
    },
    headerText: {
        fontFamily: "Roboto",
        fontSize: 28,
        fontWeight: "900",
        color: colors.flair
    },
    createButton: {
        marginTop: 20,
        marginLeft: 20,
        width: 80,
        height: 80,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    },
    emptyMessageContainer: {
        marginTop: 40,
        width: screen.width,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    emptyMessage: {
        textAlign: "center",
        fontFamily: "Roboto",
        fontWeight: "100",
        fontSize: 20,
        color: colors.extraDark
    },
    instructionsContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: screen.width,
        padding: 20,
        paddingBottom: 10
    },
    instructionsText: {
        fontFamily: "Roboto",
        fontWeight: "300",
        fontSize: 20,
        color: colors.dark
    }
})

export default SelectStack