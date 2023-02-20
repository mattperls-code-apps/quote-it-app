import React, { useState, useEffect, useRef } from "react"

import { View, Text, StyleSheet, Animated, Alert } from "react-native"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import { StaticQuoteGraphic } from "../../../components/QuoteGraphic"

import { StackActions } from "@react-navigation/native"

import { initConnection, purchaseUpdatedListener, finishTransaction, getProducts, requestPurchase, endConnection } from "react-native-iap"

import { hasPurchase, addPurchase } from "../../../scripts/iap"

import { screen, colors, purchaseIds } from "../../../constants"

const DefaultStack = ({ navigation }) => {
    const [carouselIndex, setCarouselIndex] = useState(0)

    const carouselOffset = useRef(new Animated.Value(0)).current
    
    useEffect(() => {
        let mounted = true

        hasPurchase(purchaseIds.roulette, (hasAccess) => {
            if(mounted && hasAccess){
                navigation.dispatch(StackActions.replace("Select"))
            }
        })

        let purchaseSubscriber = null

        initConnection().then(() => {
            if(mounted){
                purchaseSubscriber = purchaseUpdatedListener((purchase) => {
                    addPurchase(purchaseIds.roulette, purchase.transactionReceipt, () => {
                        if(mounted){
                            finishTransaction({ purchase, isConsumable: false }).then(() => {
                                if(mounted){
                                    navigation.dispatch(StackActions.replace("Select"))
                                }
                            }).catch((error) => {
                                console.warn(error)
                                Alert.alert("Error Purchasing", "An error occurred while purchasing. Please try again.")
                            })
                        }
                    })
                })
            }
            
        }).catch((error) => {
            console.warn(error)
        })

        return () => {
            mounted = false

            endConnection()

            if (purchaseSubscriber) purchaseSubscriber.remove() 
        }
    }, [])

    useEffect(() => {
        let mounted = true

        setTimeout(() => {
            if(mounted){
                if(carouselIndex == 3){
                    setCarouselIndex(1)
                    carouselOffset.setValue(0)
                    Animated.timing(carouselOffset, {
                        toValue: -screen.width,
                        duration: 400,
                        useNativeDriver: true
                    }).start()
                } else {
                    setCarouselIndex(carouselIndex + 1)
                    Animated.timing(carouselOffset, {
                        toValue: -screen.width * (carouselIndex + 1),
                        duration: 400,
                        useNativeDriver: true
                    }).start()
                }
            }
        }, 3000)

        return () => mounted = false
    }, [carouselIndex])

    return (
        <Page>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Quote Roulette</Text>
                </View>
            </View>
            <View style={styles.carouselWrapper}>
                <Animated.View style={{ ...styles.carouselContainer, transform: [{ translateX: carouselOffset }] }}>
                    <View style={styles.carouselItem}>
                        <View style={styles.carouselItemHeaderContainer}>
                            <Text style={styles.carouselItemHeaderText}>See How Well You{ "\n" }Know Your Friends</Text>
                        </View>
                        <View style={styles.carouselItemBodyContainer}>
                            <StaticQuoteGraphic quote={"Ow my foot\n\nSomeone call the toe truck"} quotee={"???"} showDate={false} font={1} color={5} scale={1.2} renderHeight={screen.height - 400} />
                        </View>
                    </View>
                    <View style={styles.carouselItem}>
                        <View style={styles.carouselItemHeaderContainer}>
                            <Text style={styles.carouselItemHeaderText}>Guess Who Said{"\n"}Which Quote</Text>
                        </View>
                        <View style={styles.carouselItemBodyContainer}>
                            <View style={styles.quoteeOptionContainer1}>
                                <Text style={styles.quoteeOptionText}>Mo Lipkin</Text>
                            </View>
                            <Text style={styles.orText}>or</Text>
                            <View style={styles.quoteeOptionContainer2}>
                                <Text style={styles.quoteeOptionText}>Elite Lim</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.carouselItem}>
                        <View style={styles.carouselItemHeaderContainer}>
                            <Text style={styles.carouselItemHeaderText}>One Time Payment{"\n"}Play Forever</Text>
                        </View>
                        <View style={styles.carouselItemBodyContainer}>
                            <Text style={styles.dollarText}>$0.99</Text>
                        </View>
                    </View>
                    <View style={styles.carouselItem}>
                        <View style={styles.carouselItemHeaderContainer}>
                            <Text style={styles.carouselItemHeaderText}>See How Well You{ "\n" }Know Your Friends</Text>
                        </View>
                        <View style={styles.carouselItemBodyContainer}>
                            <StaticQuoteGraphic quote={"Ow my foot\n\nSomeone call the toe truck"} quotee={"???"} showDate={false} font={1} color={5} scale={1.2} renderHeight={screen.height - 400} />
                        </View>
                    </View>
                </Animated.View>
            </View>
            <Button style={styles.purchaseButton} onPress={() => {
                getProducts({ skus: [ purchaseIds.roulette ] }).then(() => {
                    requestPurchase({ sku: purchaseIds.roulette }).then(() => {}).catch((error) => {
                        console.warn(error)
                    })
                }).catch((error) => {
                    console.warn(error)
                    Alert.alert("Error Purchasing", "An error occurred while purchasing. Please try again.")
                })
            }}>
                <Text style={styles.purchaseButtonText}>Purchase Extension</Text>
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
        fontSize: 28,
        fontWeight: "900",
        color: colors.flair
    },
    carouselWrapper: {
        width: screen.width,
        height: screen.height - 260,
        marginTop: 20
    },
    carouselContainer: {
        flexDirection: "row",
        width: 4 * screen.width,
        height: screen.height - 260
    },
    carouselItem: {
        width: screen.width - 40,
        height: screen.height - 260,
        borderRadius: 20,
        marginHorizontal: 20,
        backgroundColor: colors.extraLight,
        borderWidth: 4,
        borderColor: colors.flair
    },
    carouselItemHeaderContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: screen.width - 40,
        height: 100
    },
    carouselItemHeaderText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 24,
        textAlign: "center",
        color: colors.extraDark
    },
    carouselItemBodyContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: screen.width - 40,
        height: screen.height - 390
    },
    quoteeOptionContainer1: {
        alignItems: "center",
        justifyContent: "center",
        width: 0.42 * screen.width - 30,
        height: 0.32 * (0.5 * screen.width - 30),
        borderRadius: 0.05 * (0.5 * screen.width - 30),
        transform: [
            {
                translateX: -0.12 * (0.5 * screen.width - 30)
            },
            {
                translateY: -0.06 * (0.5 * screen.width - 30)
            }
        ],
        backgroundColor: colors.flair
    },
    quoteeOptionContainer2: {
        alignItems: "center",
        justifyContent: "center",
        width: 0.42 * screen.width - 30,
        height: 0.32 * (0.5 * screen.width - 30),
        borderRadius: 0.05 * (0.5 * screen.width - 30),
        transform: [
            {
                translateX: 0.12 * (0.5 * screen.width - 30),
            },
            {
                translateY: 0.06 * (0.5 * screen.width - 30)
            }
        ],
        backgroundColor: colors.flair
    },
    quoteeOptionText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 16,
        color: colors.extraLight
    },
    orText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 20,
        color: colors.extraDark
    },
    dollarText: {
        fontFamily: "Roboto",
        fontWeight: "900",
        fontSize: 0.2 * (screen.width - 40),
        color: colors.green
    },
    purchaseButton: {
        marginTop: 20,
        width: screen.width - 40,
        height: 80,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    },
    purchaseButtonText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 24,
        color: colors.extraLight
    }
})

export default DefaultStack