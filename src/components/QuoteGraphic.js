import React, { useRef } from "react"

import { TouchableWithoutFeedback, View, Text, TextInput, StyleSheet, Keyboard } from "react-native"

import LinearGradient from "react-native-linear-gradient"

import formatDate from "../scripts/formatDate"

import { colors, graphicFonts, graphicColorSchemes } from "../constants"

const StaticQuoteGraphic = ({ quote, quotee, timestamp, showDate = true, font, color, scale, renderHeight }) => {
    const styles = generateQuoteGraphicStyles({ font, scale, renderHeight })

    return (
        <LinearGradient style={styles.quoteGraphic} colors={graphicColorSchemes[color]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.quoteContainer}>
                <Text style={styles.quoteText} allowFontScaling={false}>
                    {
                        quote
                    }
                </Text>
            </View>
            <View style={styles.quoteeContainer}>
                <Text style={styles.quoteeText} numberOfLines={1} ellipsizeMode={"tail"} allowFontScaling={false}>
                    {
                        "- " + quotee
                    }
                </Text>
            </View>
            {
                showDate && (
                    <View style={styles.timestampContainer}>
                        <Text style={styles.timestampText}>
                            {
                                formatDate(timestamp)
                            }
                        </Text>
                    </View>
                )
            }
        </LinearGradient>
    )
}

const EditableQuoteGraphic = ({ quote, setQuote, quotee, setQuotee, timestamp, font, color, scale, renderHeight }) => {
    const quoteText = useRef(null)
    const quoteeText = useRef(null)

    const styles = generateQuoteGraphicStyles({ font, scale, renderHeight })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient style={styles.quoteGraphic} colors={graphicColorSchemes[color]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <TouchableWithoutFeedback onPress={() => { quoteText.current.focus() }}>
                    <View style={styles.quoteContainer}>
                        <TextInput ref={quoteText} style={styles.quoteText} multiline maxLength={150} value={quote} onChangeText={setQuote} placeholder={"Awesome Quote Here"} placeholderTextColor={colors.dark} allowFontScaling={false} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { quoteeText.current.focus() }}>
                <View style={styles.quoteeContainer}>
                    <Text style={styles.quoteeText}>- </Text>
                    <TextInput ref={quoteeText} style={styles.quoteeText} multiline={false} maxLength={50} value={quotee} onChangeText={setQuotee} placeholder={"Quotee Here"} placeholderTextColor={colors.dark} allowFontScaling={false} />
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.timestampContainer}>
                    <Text style={styles.timestampText}>
                        {
                            formatDate(timestamp)
                        }
                    </Text>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

const generateQuoteGraphicStyles = ({ font, scale, renderHeight }) => {
    return StyleSheet.create({
        quoteGraphic: {
            width: 0.75 * renderHeight,
            height: renderHeight,
            borderRadius: 0.035 * renderHeight,
            alignItems: "center",
            justifyContent: "center"
        },
        quoteContainer: {
            width: 0.75 * renderHeight,
            maxHeight: 0.5 * renderHeight * scale,
            marginBottom: 0.05 * renderHeight,
            paddingHorizontal: 0.05 * renderHeight * scale,
            justifyContent: "center",
            flexDirection: "row"
        },
        quoteText: {
            fontFamily: graphicFonts[font].fontFamily,
            fontWeight: "600",
            fontSize: 0.06 * renderHeight * scale,
            color: colors.extraDark,
            textAlign: "center"
        },
        quoteeContainer: {
            width: 0.7 * renderHeight,
            padding: 0.035 * renderHeight * scale,
            justifyContent: "center",
            flexDirection: "row"
        },
        quoteeText: {
            fontFamily: graphicFonts[font].fontFamily,
            fontWeight: "400",
            fontSize: 0.05 * renderHeight * scale,
            color: colors.extraDark
        },
        timestampContainer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.extraLight
        },
        timestampText: {
            padding: 0.02 * renderHeight,
            fontFamily: graphicFonts[font].fontFamily,
            fontWeight: "600",
            fontSize: 0.04 * renderHeight,
            color: colors.extraDark
        }
    })
}

export { StaticQuoteGraphic, EditableQuoteGraphic }