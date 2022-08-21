import React, { useState, useEffect } from "react"

import { View, Text, FlatList, StyleSheet, Linking } from "react-native"

import Page from "../components/Page"
import Button from "../components/Button"
import Quotee from "../components/Quotee"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus, faInfo } from "@fortawesome/free-solid-svg-icons"

import SplashScreen from "react-native-splash-screen"
import { CommonActions } from "@react-navigation/native"

import isValid from "../scripts/validateShare"
import formatQuotee from "../scripts/formatQuotee"
import Storage from "../scripts/storage"

import { screen, colors } from "../constants"

const HomePage = ({ navigation }) => {
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

        const deepLinkSubscriber = Linking.addEventListener("url", ({ url }) => {
            const expectedPrefix = "quoteit://share/"

            if(url.slice(0, expectedPrefix.length) == expectedPrefix){
                const rawData = decodeURI(url.slice(expectedPrefix.length))

                try {
                    const data = JSON.parse(rawData)

                    if(Array.isArray(data) && data.every(isValid)){
                        storage.updateMultiple(data, () => {
                            navigation.dispatch(CommonActions.navigate({
                                name: "Home"
                            }))

                            setTimeout(() => {
                                if(mounted){
                                    navigation.push("History", { formattedQuotee: formatQuotee(data[0].info.quotee) })
                                }
                            }, 300)
                        })
                    }
                } catch(e){
                    console.warn(e)
                }
            }
        })

        const navigationSubscriber = navigation.addListener("state", () => {
            storage.initialize(() => {
                if(mounted){
                    setQuotees(storage.getQuotees())
                }
            })
        })

        return () => {
            mounted = false

            deepLinkSubscriber.remove()

            return navigationSubscriber
        }
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
                    <React.Fragment>
                        <View style={[styles.quotesCountContainer, { transform: [{ translateY: Math.min(-scrollOffset, 80) }] }]}>
                            <Text style={styles.quotesCountText}>{ sum } quotes</Text>
                        </View>
                        <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} data={quotees} renderItem={({ item, index }) => {
                            return (
                                <Quotee key={index} navigation={navigation} formattedQuotee={item.formattedQuotee} quotesCount={item.quotesCount} />
                            )
                        }} scrollEventThrottle={2} onScroll={(event) => {
                            setScrollOffset(event.nativeEvent.contentOffset.y)
                        }} />
                    </React.Fragment>
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