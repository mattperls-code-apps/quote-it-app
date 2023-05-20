import React, { useRef } from "react"

import { TouchableWithoutFeedback, View, Text, StyleSheet, Animated } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight, faCheck, faXmark, faStar } from "@fortawesome/free-solid-svg-icons"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

import { screen, colors } from "../constants"

const QuoteeLink = ({ navigation, formattedQuotee, quotesCount, favorite }) => {
    const shadowChildOffset = useRef(new Animated.Value(-4)).current

    const handlePressIn = () => {
        Animated.timing(shadowChildOffset, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const handlePressOut = () => {
        Animated.timing(shadowChildOffset, {
            toValue: -4,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => {
            ReactNativeHapticFeedback.trigger("impactLight", {
                enableVibrateFallback: false
            })
            if(favorite){
                navigation.push("Favorites")
            } else {
                navigation.push("Quotee", { formattedQuotee })
            }
        }}>
            <View style={{ ...styles.quoteeShadow, backgroundColor: favorite ? colors.gold : colors.flair }}>
                <Animated.View style={[styles.quoteeContainer, { transform: [{ translateY: shadowChildOffset }] }]}>
                    <View style={{ ...styles.quotesCountTextContainer, backgroundColor: favorite ? colors.gold : colors.flair }}>
                        <Text style={styles.quotesCountText}>
                            {
                                quotesCount
                            }
                        </Text>
                    </View>
                    <View style={styles.quoteeTextContainer}>
                        <Text style={styles.quoteeText} numberOfLines={1} ellipsizeMode={"tail"}>
                            {
                                favorite ? "Favorite Quotes" : formattedQuotee
                            }
                        </Text>
                    </View>
                    <View style={styles.quoteeNavigateButton}>
                        <FontAwesomeIcon icon={favorite ? faStar : faChevronRight} color={favorite ? colors.gold : colors.flair} size={24} />
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const QuoteeSelectable = ({ formattedQuotee, selected, toggleSelected }) => {
    const shadowChildOffset = useRef(new Animated.Value(-4)).current

    const handlePressIn = () => {
        Animated.timing(shadowChildOffset, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const handlePressOut = () => {
        Animated.timing(shadowChildOffset, {
            toValue: -4,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => {
            ReactNativeHapticFeedback.trigger("impactLight", {
                enableVibrateFallback: false
            })
            toggleSelected()
        }}>
            <View style={{ ...styles.quoteeShadow, backgroundColor: selected ? colors.green : colors.red }}>
                <Animated.View style={[styles.quoteeContainer, { transform: [{ translateY: shadowChildOffset }] }]}>
                    <View style={{ ...styles.quoteSelectedContainer, backgroundColor: selected ? colors.green : colors.red }}>
                        <FontAwesomeIcon icon={selected ? faCheck : faXmark} color={colors.extraDark} size={24} />
                    </View>
                    <View style={styles.quoteeTextContainer}>
                        <Text style={styles.quoteeText} numberOfLines={1} ellipsizeMode={"tail"}>
                            {
                                formattedQuotee
                            }
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    quoteeShadow: {
        marginTop: 12,
        width: screen.width,
        height: 80,
        borderRadius: 10
    },
    quoteeContainer: {
        width: screen.width,
        height: 80,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: colors.extraLight
    },
    quotesCountTextContainer: {
        marginTop: 20,
        marginLeft: 20,
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    },
    quotesCountText: {
        fontFamily: "Roboto",
        fontWeight: "700",
        fontSize: 18,
        color: colors.extraLight
    },
    quoteSelectedContainer: {
        marginTop: 20,
        marginLeft: 20,
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    quoteeTextContainer: {
        marginTop: 20,
        marginLeft: 20,
        width: screen.width - 160,
        height: 40,
        justifyContent: "center"
    },
    quoteeText: {
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "700",
        color: colors.dark
    },
    quoteeNavigateButton: {
        marginTop: 20,
        marginLeft: 20,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    }
})

export {
    QuoteeLink,
    QuoteeSelectable
}