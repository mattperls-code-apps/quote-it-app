import React, { useState, useEffect } from "react"

import { View, Text, FlatList, StyleSheet } from "react-native"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import { QuoteeLink } from "../../../components/Quotee"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import SplashScreen from "react-native-splash-screen"

import Storage from "../../../scripts/storage"

import { screen, colors } from "../../../constants"

const DefaultStack = ({ navigation }) => {
    const [quotees, setQuotees] = useState([])

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
                SplashScreen.hide()
            }
        })

        const stackNavigationSubscriber = navigation.addListener("state", () => {
            storage.initialize(() => {
                if(mounted){
                    setQuotees(storage.getQuotees())
                }
            })
        })

        const tabNavigationSubscriber = navigation.getParent().addListener("state", () => {
            storage.initialize(() => {
                if(mounted){
                    setQuotees(storage.getQuotees())
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

    return (
        <Page>
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
            {
                quotees.length == 0 ? (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No quotes yet</Text>
                    </View>
                ) : (
                    <React.Fragment>
                        <View style={[styles.quotesCountContainer, { transform: [{ translateY: Math.min(-scrollOffset, 80) }] }]}>
                            <Text style={styles.quotesCountText}>{ sum } quotes</Text>
                        </View>
                        <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }} data={quotees} renderItem={({ item, index }) => {
                            return (
                                <QuoteeLink key={index} navigation={navigation} formattedQuotee={item.formattedQuotee} quotesCount={item.quotesCount} />
                            )
                        }} scrollEventThrottle={2} onScroll={(event) => {
                            setScrollOffset(event.nativeEvent.contentOffset.y)
                        }} />
                    </React.Fragment>
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