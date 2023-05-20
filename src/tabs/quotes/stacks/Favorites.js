import React, { useState, useEffect } from "react"

import { View, FlatList, Text, StyleSheet } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import InteractiveQuote from "../../../components/InteractiveQuote"

import Storage from "../../../scripts/storage"

import { screen, colors } from "../../../constants"

const FavoritesStack = ({ navigation }) => {
    const quoteWidth = Math.min(320, (4 / 3) * (screen.width - 80))

    const [quotes, setQuotes] = useState([])

    const updateQuotes = () => {
        const storage = new Storage()

        storage.initialize(() => {
            setQuotes(storage.getFavorites())
        })
    }

    useEffect(() => {
        updateQuotes()

        const subscriber = navigation.getParent().addListener("state", updateQuotes)

        return subscriber
    }, [])
    
    return (
        <Page>
            <View style={styles.headerContainer}>
                <Button style={[styles.navigationButton, { width: 80 }]} onPress={navigation.goBack}>
                    <FontAwesomeIcon icon={faXmark} color={colors.extraLight} size={32} />
                </Button>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText} numberOfLines={2} ellipsizeMode="tail">Favorite Quotes</Text>
                </View>
            </View>
            <FlatList showsVerticalScrollIndicator={false} data={quotes} renderItem={({ item, index }) => {
                return (
                    <InteractiveQuote {...item.info} navigation={navigation} timestamp={item.id} renderHeight={quoteWidth} last={index == quotes.length - 1} onMutate={updateQuotes} />
                )
            }} />
        </Page>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: screen.width,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: colors.extraLight,
        borderBottomWidth: 4,
        borderBottomColor: colors.flair,
    },
    navigationButton: {
        height: 80,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    },
    headerTextContainer: {
        marginRight: 20,
        width: screen.width - 140,
        height: 80,
        justifyContent: "center"
    },
    headerText: {
        fontFamily: "Roboto",
        fontSize: 28,
        fontWeight: "900",
        color: colors.flair
    }
})

export default FavoritesStack