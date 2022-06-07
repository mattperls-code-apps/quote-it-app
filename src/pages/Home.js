import React, { useState, useEffect } from "react"

import { View, Text, FlatList, StyleSheet } from "react-native"

import Page from "../components/Page"
import Button from "../components/Button"
import Quotee from "../components/Quotee"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus, faInfo } from "@fortawesome/free-solid-svg-icons"

import Storage from "../scripts/storage"

import { screen, colors } from "../constants"

const HomePage = ({ navigation, onInitialized }) => {
    const [quotees, setQuotees] = useState([])

    useEffect(() => {
        const storage = new Storage()
        storage.initialize(() => {
            setQuotees(storage.getQuotees())
            onInitialized()
        })

        const subscriber = navigation.addListener("state", () => {
            storage.initialize(() => {
                setQuotees(storage.getQuotees())
            })
        })

        return subscriber
    }, [])

    return (
        <Page>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Quote It</Text>
                </View>
                <Button style={styles.createButton} onPress={() => {
                    navigation.push("Create", { id: Date.now() })
                }}>
                    <FontAwesomeIcon icon={faPlus} color={colors.extraLight} size={32} />
                </Button>
            </View>
            {
                quotees.length == 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No quotes yet</Text>
                    </View>
                ) : (
                    <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }} data={quotees} renderItem={({ item, index }) => {
                        return (
                            <Quotee key={index} navigation={navigation} formattedQuotee={item.formattedQuotee} quotesCount={item.quotesCount} />
                        )
                    }} />
                )
            }
            <Button style={styles.infoButton} onPress={() => {
                navigation.push("PrivacyPolicy")
            }}>
                <FontAwesomeIcon icon={faInfo} color={colors.extraLight} size={18} />
            </Button>
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
        borderBottomColor: colors.flair
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
        fontSize: 32,
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
    infoButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    }
})

export default HomePage