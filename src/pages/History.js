import React, { useRef, useState, useEffect } from "react"

import { TouchableWithoutFeedback, View, ScrollView, Text, StyleSheet, Animated } from "react-native"

import Page from "../components/Page"
import Button from "../components/Button"
import { StaticQuoteGraphic } from "../components/QuoteGraphic"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faX, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import ViewShot, { captureRef } from "react-native-view-shot"
import Share from "react-native-share"

import Storage from "../scripts/storage"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

import { screen, colors } from "../constants"

const renderHeight = (0.5 * screen.width - 30) / 0.7

const HistoryPage = ({ navigation, route }) => {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        const storage = new Storage()
        storage.initialize(() => {
            setQuotes(storage.getFromQuotee(route.params.formattedQuotee))
        })
    }, [])

    const [showOverlay, setShowOverlay] = useState(false)
    const [showGraphic, setShowGraphic] = useState(false)
    const overlayOpacity = useRef(new Animated.Value(0)).current
    const interactionBarOffset = useRef(new Animated.Value(0)).current

    const [focusIndex, setFocusIndex] = useState(0)

    const closeOverlay = (callback) => {
        setShowGraphic(false)
        Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start()
        Animated.timing(interactionBarOffset, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            setShowOverlay(false)
            if(typeof callback == "function"){
                callback()
            }
        })
    }

    const openOverlay = () => {
        ReactNativeHapticFeedback.trigger("impactLight", {
            enableVibrateFallback: false
        })
        setShowOverlay(true)
        setShowGraphic(true)
        Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
        }).start()
        Animated.timing(interactionBarOffset, {
            toValue: -180,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const sharableImageRef = useRef()

    const share = () => {
        captureRef(sharableImageRef, {
            format: "png"
        }).then(uri => {
            try {
                Share.open({
                    title: "Shared from Quote It",
                    url: uri,
                    showAppsToView: true
                })
            } catch(error){
                console.warn(error)
            }
        })
    }

    const deleteQuote = () => {
        const storage = new Storage()
        storage.initialize(() => {
            storage.delete(quotes[focusIndex].id, () => {
                const updatedQuotes = quotes.filter((item) => item.id != quotes[focusIndex].id)
                if(updatedQuotes.length == 0){
                    navigation.goBack()
                } else {
                    setFocusIndex(0)
                    setQuotes(updatedQuotes)
                    closeOverlay()
                }
            })
        })
    }

    const instagramStory = () => {
        captureRef(sharableImageRef, {
            format: "png"
        }).then(uri => {
            try {
                Share.shareSingle({
                    backgroundImage: uri,
                    social: Share.Social.INSTAGRAM_STORIES
                })
            } catch(error){
                console.warn(error)
            }
        })
    }

    const quoteRenders = []
    for(let i = 0;i<Math.floor(quotes.length / 2);i++){
        const quoteInfo1 = quotes[i * 2].info
        const quoteInfo2 = quotes[i * 2 + 1].info
        quoteRenders.push(
            <View key={i} style={styles.doubleItemGroup}>
                <TouchableWithoutFeedback onPress={() => {
                    setFocusIndex(i * 2)
                    openOverlay()
                }}>
                    <View>
                        <StaticQuoteGraphic quote={quoteInfo1.quote} quotee={quoteInfo1.quotee} font={quoteInfo1.font} color={quoteInfo1.color} scale={quoteInfo1.scale} renderHeight={renderHeight} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    setFocusIndex(i * 2 + 1)
                    openOverlay()
                }}>
                    <View>
                        <StaticQuoteGraphic quote={quoteInfo2.quote} quotee={quoteInfo2.quotee} font={quoteInfo2.font} color={quoteInfo2.color} scale={quoteInfo2.scale} renderHeight={renderHeight} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    if(quotes.length % 2 == 1){
        const quoteInfo = quotes[quotes.length - 1].info
        quoteRenders.push(
            <View key={Math.floor(quotes.length / 2)} style={styles.singleItemGroup}>
                <TouchableWithoutFeedback onPress={() => {
                    setFocusIndex(quotes.length - 1)
                    openOverlay()
                }}>
                    <View ref={sharableImageRef}>
                        <StaticQuoteGraphic quote={quoteInfo.quote} quotee={quoteInfo.quotee} font={quoteInfo.font} color={quoteInfo.color} scale={quoteInfo.scale} renderHeight={renderHeight} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    
    return (
        <Page>
            <View style={styles.headerContainer}>
                <Button style={[styles.navigationButton, { width: 80 }]} onPress={() => {
                        if(showGraphic){
                            closeOverlay(navigation.goBack)
                        } else {
                            navigation.goBack()
                        }
                    }}>
                        <FontAwesomeIcon icon={faX} color={colors.extraLight} size={24} />
                    </Button>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText} numberOfLines={2} ellipsizeMode="tail">
                        {
                            route.params.formattedQuotee
                        }
                    </Text>
                </View>
            </View>
            <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback>
                    <View>
                        {
                            quoteRenders
                        }
                        <Button style={styles.createButton} onPress={() => {
                            navigation.goBack()
                            navigation.push("Create", { id: Date.now(), quotee: route.params.formattedQuotee })
                        }}>
                            <Text style={styles.createButtonText}>Create New Quote</Text>
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            {
                showOverlay && (
                    <View style={styles.overlayContainer}>
                        <Animated.View style={{ flex: 1, backgroundColor: overlayOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]
                        }) }}>
                            <TouchableWithoutFeedback onPress={closeOverlay}>
                                <View style={styles.overlayQuoteGraphicContainer}>
                                    {
                                        showGraphic && (
                                            <StaticQuoteGraphic
                                                quote={quotes[focusIndex].info.quote}
                                                quotee={quotes[focusIndex].info.quotee}
                                                font={quotes[focusIndex].info.font}
                                                color={quotes[focusIndex].info.color}
                                                scale={quotes[focusIndex].info.scale}
                                                renderHeight={screen.height - 380}
                                            />
                                        )
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                            <Animated.View style={[styles.overlayInteractionBarContainer, { transform: [{ translateY: interactionBarOffset }] }]}>
                                <View style={styles.interactionButtonsContainer}>
                                    <Button style={[styles.interactionButton, { width: (screen.width - 80) / 3 }]} onPress={share}>
                                        <Text style={styles.interactionButtonText}>Share</Text>
                                    </Button>
                                    <Button style={[styles.interactionButton, { width: (screen.width - 80) / 3 }]} onPress={() => {
                                        navigation.goBack()
                                        navigation.push("Create", { id: quotes[focusIndex].id })
                                    }}>
                                        <Text style={styles.interactionButtonText}>Edit</Text>
                                    </Button>
                                    <Button style={[styles.interactionButton, { width: (screen.width - 80) / 3 }]} onPress={deleteQuote}>
                                        <Text style={styles.interactionButtonText}>Delete</Text>
                                    </Button>
                                </View>
                                <View style={styles.interactionButtonsContainer}>
                                    <Button style={[styles.interactionButton, { width: 60 }]} onPress={() => {
                                        setFocusIndex((focusIndex - 1 + quotes.length) % quotes.length)
                                    }}>
                                        <FontAwesomeIcon icon={faChevronLeft} color={colors.extraLight} size={22} />
                                    </Button>
                                    <Button style={[styles.interactionButton, { width: screen.width - 200 }]} onPress={instagramStory}>
                                        <Text style={styles.interactionButtonText}>Instagram Story</Text>
                                    </Button>
                                    <Button style={[styles.interactionButton, { width: 60 }]} onPress={() => {
                                        setFocusIndex((focusIndex + 1) % quotes.length)
                                    }}>
                                        <FontAwesomeIcon icon={faChevronRight} color={colors.extraLight} size={22} />
                                    </Button>
                                </View>
                            </Animated.View>
                        </Animated.View>
                    </View>
                )
            }
            {
                focusIndex < quotes.length && (
                    <View style={{ position: "absolute", top: screen.height }}>
                        <ViewShot ref={sharableImageRef} style={{ paddingHorizontal: 0.15 * renderHeight, paddingVertical: 0.05 * renderHeight, backgroundColor: colors.extraLight }} >
                            <StaticQuoteGraphic
                                quote={quotes[focusIndex].info.quote}
                                quotee={quotes[focusIndex].info.quotee}
                                font={quotes[focusIndex].info.font}
                                color={quotes[focusIndex].info.color}
                                scale={quotes[focusIndex].info.scale}
                                renderHeight={screen.height - 380}
                            />
                        </ViewShot>
                    </View>
                )
            }
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
        backgroundColor: colors.extraLight
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
        fontSize: 32,
        fontWeight: "900",
        color: colors.flair
    },
    itemsContainer: {
        width: screen.width,
        height: screen.height - 120
    },
    singleItemGroup: {
        width: screen.width,
        height: renderHeight,
        marginTop: 20,
        alignItems: "center"
    },
    doubleItemGroup: {
        width: screen.width,
        height: renderHeight,
        marginTop: 20,
        justifyContent: "space-evenly",
        flexDirection: "row"
    },
    createButton: {
        marginTop: 20,
        width: screen.width - 40,
        height: 80,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    },
    createButtonText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 24,
        color: colors.extraLight
    },
    overlayContainer: {
        position: "absolute",
        bottom: 0,
        width: screen.width,
        height: screen.height - 120
    },
    overlayQuoteGraphicContainer: {
        width: screen.width,
        height: screen.height - 300,
        alignItems: "center",
        justifyContent: "center"
    },
    overlayInteractionBarContainer: {
        position: "absolute",
        bottom: -180,
        width: screen.width,
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.extraLight
    },
    interactionButtonsContainer: {
        width: screen.width,
        height: 60,
        marginTop: 20,
        justifyContent: "space-evenly",
        flexDirection: "row"
    },
    interactionButton: {
        height: 60,
        borderRadius: 20,
        backgroundColor: colors.flair,
        alignItems: "center",
        justifyContent: "center"
    },
    interactionButtonText: {
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "700",
        color: colors.extraLight
    }
})

export default HistoryPage