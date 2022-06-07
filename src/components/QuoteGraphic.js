import React, { useRef } from "react"

import { TouchableWithoutFeedback, View, Text, TextInput, StyleSheet, Keyboard } from "react-native"

import LinearGradient from "react-native-linear-gradient"

import { colors } from "../constants"

const StaticQuoteGraphic = ({ quote, quotee, font, color, scale, renderHeight }) => {
    const styles = generateQuoteGraphicStyles({ font, scale, renderHeight })

    return (
        <LinearGradient style={styles.quoteGraphic} colors={color} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.quoteTextContainer}>
                <Text style={styles.quoteText}>
                    {
                        quote
                    }
                </Text>
            </View>
            <View style={styles.quoteeTextContainer}>
                <Text style={styles.quoteeText} numberOfLines={1} ellipsizeMode={"tail"}>
                    {
                        "- " + quotee
                    }
                </Text>
            </View>
        </LinearGradient>
    )
}

const EditableQuoteGraphic = ({ quote, setQuote, quotee, setQuotee, font, color, scale, renderHeight }) => {
    const quoteText = useRef(null)
    const quoteeText = useRef(null)

    const styles = generateQuoteGraphicStyles({ font, scale, renderHeight })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient style={styles.quoteGraphic} colors={color} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <TouchableWithoutFeedback onPress={() => { quoteText.current.focus() }}>
                    <View style={styles.quoteTextContainer}>
                        <TextInput ref={quoteText} style={styles.quoteText} multiline value={quote} onChangeText={setQuote} placeholder={"Awesome Quote Here"} placeholderTextColor={colors.dark} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { quoteeText.current.focus() }}>
                <View style={styles.quoteeTextContainer}>
                    <Text style={styles.quoteeText}>- </Text>
                    <TextInput ref={quoteeText} style={styles.quoteeText} multiline={false} value={quotee} onChangeText={setQuotee} placeholder={"Quotee Here"} placeholderTextColor={colors.dark} />
                </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

const generateQuoteGraphicStyles = ({ font, scale, renderHeight }) => {
    return StyleSheet.create({
        quoteGraphic: {
            width: 0.7 * renderHeight,
            height: renderHeight,
            borderRadius: 0.05 * renderHeight,
            alignItems: "center",
            justifyContent: "center"
        },
        quoteTextContainer: {
            width: 0.7 * renderHeight,
            maxHeight: 0.5 * renderHeight * scale,
            marginBottom: 0.05 * renderHeight,
            paddingHorizontal: 0.05 * renderHeight * scale,
            justifyContent: "center",
            flexDirection: "row"
        },
        quoteText: {
            fontFamily: font.fontFamily,
            fontSize: 0.06 * renderHeight * scale,
            color: colors.extraDark,
            textAlign: "center"
        },
        quoteeTextContainer: {
            width: 0.7 * renderHeight,
            padding: 0.035 * renderHeight * scale,
            justifyContent: "center",
            flexDirection: "row"
        },
        quoteeText: {
            fontFamily: font.fontFamily,
            fontSize: 0.05 * renderHeight * scale,
            color: colors.extraDark
        }
    })
}

export { StaticQuoteGraphic, EditableQuoteGraphic }