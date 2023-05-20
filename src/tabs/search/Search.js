import React, { useState, useEffect, useRef } from "react"

import { TouchableWithoutFeedback, View, FlatList, Text, TextInput, StyleSheet } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

import Page from "../../components/Page"
import InteractiveQuote from "../../components/InteractiveQuote"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

import Storage from "../../scripts/storage"
import { queryQuotes } from "../../scripts/query"

import { screen, colors } from "../../constants"

const SearchTab = ({ navigation }) => {
    const quoteWidth = Math.min(320, (4 / 3) * (screen.width - 80))

    const [quotes, setQuotes] = useState([])

    const updateQuotes = () => {
        const storage = new Storage()

        storage.initialize(() => {
            setQuotes(storage.items)
        })
    }

    useEffect(() => {
        updateQuotes()

        const updateSubscriber = navigation.addListener("state", updateQuotes)

        const hapticSubscriber = navigation.addListener("tabPress", () => {
            ReactNativeHapticFeedback.trigger("impactLight")
        })

        return () => {
            updateSubscriber()
            hapticSubscriber()
        }
    }, [])

    const inputRef = useRef()
    const focusInput = () => inputRef.current.focus()
    const blurInput = () => inputRef.current.blur()

    const [queryText, setQueryText] = useState("")

    const queriedQuotes = queryQuotes(quotes, queryText)

    return (
        <Page onPress={blurInput}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Search Quotes</Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={focusInput}>
                <View style={styles.searchContainer}>
                    <TextInput ref={inputRef} value={queryText} onChangeText={setQueryText} style={styles.searchInput} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={styles.searchIcon} />
                </View>
            </TouchableWithoutFeedback>
            {
                quotes.length == 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No Quotes Yet</Text>
                    </View>
                ) : queriedQuotes.length == 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No Matches Found</Text>
                    </View>
                ) : (
                    <FlatList showsVerticalScrollIndicator={false} data={queriedQuotes} renderItem={({ item, index }) => {
                        return (
                            <InteractiveQuote {...item.info} navigation={navigation} timestamp={item.id} renderHeight={quoteWidth} last={index == queriedQuotes.length - 1} onMutate={updateQuotes} />
                        )
                    }} />
                )
            }
        </Page>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: screen.width,
        height: 100,
        flexDirection: "row",
        backgroundColor: colors.extraLight,
        zIndex: 1000
    },
    headerTextContainer: {
        marginTop: 20,
        marginLeft: 40,
        height: 80,
        justifyContent: "center"
    },
    headerText: {
        fontFamily: "Roboto",
        fontSize: 28,
        fontWeight: "900",
        color: colors.flair
    },
    searchContainer: {
        position: "relative",
        padding: 10,
        backgroundColor: colors.extraLight,
        borderBottomColor: colors.flair,
        borderBottomWidth: 4
    },
    searchIcon: {
        position: "absolute",
        top: 22.5,
        left: 25
    },
    searchInput: {
        borderRadius: 10,
        padding: 15,
        paddingLeft: 50,
        backgroundColor: colors.light
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
    }
})

export default SearchTab