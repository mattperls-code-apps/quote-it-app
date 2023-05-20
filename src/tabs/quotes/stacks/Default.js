import React, { useState, useEffect, useRef } from "react"

import { TouchableWithoutFeedback, View, Text, TextInput, FlatList, StyleSheet } from "react-native"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import { QuoteeLink } from "../../../components/Quotee"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons"

import SplashScreen from "react-native-splash-screen"

import Storage from "../../../scripts/storage"
import { queryQuotees } from "../../../scripts/query"

import { screen, colors } from "../../../constants"

const DefaultStack = ({ navigation }) => {
    const [quotees, setQuotees] = useState([])
    const [favoritesCount, setFavoritesCount] = useState(0)

    let sum = 0
    quotees.forEach(quotee => {
        sum += quotee.quotesCount
    })

    const [scrollOffset, setScrollOffset] = useState(0)

    useEffect(() => {
        let mounted = true

        const storage = new Storage()
        storage.initialize(() => {
            if(mounted){
                setQuotees(storage.getQuotees())
                setFavoritesCount(storage.getFavorites().length)

                SplashScreen.hide()
            }
        })

        const stackNavigationSubscriber = navigation.addListener("state", () => {
            storage.initialize(() => {
                if(mounted){
                    setQuotees(storage.getQuotees())
                    setFavoritesCount(storage.getFavorites().length)
                }
            })
        })

        const tabNavigationSubscriber = navigation.getParent().addListener("state", () => {
            storage.initialize(() => {
                if(mounted){
                    setQuotees(storage.getQuotees())
                    setFavoritesCount(storage.getFavorites().length)
                }
            })
        })

        return () => {
            mounted = false

            return () => {
                stackNavigationSubscriber()
                tabNavigationSubscriber()
            }
        }
    }, [])

    const inputRef = useRef()
    const focusInput = () => inputRef.current.focus()
    const blurInput = () => inputRef.current.blur()

    const [queryText, setQueryText] = useState("")

    const queriedQuotees = queryQuotees(quotees, queryText)

    const queryIncludesFavorites = queryQuotees([{ formattedQuotee: "Favorite Quotes" }], queryText).length > 0

    return (
        <Page onPress={blurInput}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Your Quotes</Text>
                </View>
                <Button style={styles.createButton} onPress={() => {
                    navigation.push("Create", { id: Date.now() })
                }}>
                    <FontAwesomeIcon icon={faPlus} color={colors.extraLight} size={32} />
                </Button>
            </View>
            <TouchableWithoutFeedback onPress={focusInput}>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <TextInput ref={inputRef} value={queryText} onChangeText={setQueryText} style={styles.searchInput} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={styles.searchIcon} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {
                quotees.length == 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No Quotes Yet</Text>
                    </View>
                ) : queriedQuotees.length == 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No Matches Found</Text>
                    </View>
                ) : (
                    <React.Fragment>
                        <View style={[styles.quotesCountContainer, { transform: [{ translateY: 60 + Math.min(-scrollOffset, 80) }] }]}>
                            <Text style={styles.quotesCountText}>{ sum } Total Quotes</Text>
                        </View>
                        <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }} data={queriedQuotees} renderItem={({ item, index }) => {
                            return (
                                <QuoteeLink key={index} navigation={navigation} formattedQuotee={item.formattedQuotee} quotesCount={item.quotesCount} />
                            )
                        }} scrollEventThrottle={2} onScroll={(event) => {
                            setScrollOffset(event.nativeEvent.contentOffset.y)
                        }} ListHeaderComponent={(
                            (favoritesCount > 0 && queryIncludesFavorites) && (
                                <QuoteeLink navigation={navigation} quotesCount={favoritesCount} favorite />
                            )
                        )} />
                    </React.Fragment>
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
    searchWrapper: {
        backgroundColor: colors.extraLight,
        zIndex: 1000
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
    },
    quotesCountContainer: {
        position: "absolute",
        top: 40,
        left: 0,
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    quotesCountText: {
        fontFamily: "Roboto",
        fontWeight: "300",
        fontSize: 24,
        color: colors.dark
    }
})

export default DefaultStack