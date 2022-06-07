import React from "react"

import { Text, StyleSheet } from "react-native"

import Button from "./Button"

import { colors } from "../constants"

const FontOption = ({ graphicsFont, setFont }) => {
    return (
        <Button onPress={() => { setFont(graphicsFont) }}>
            <Text style={[styles.fontOption, { fontFamily: graphicsFont.fontFamily }]}>
                {
                    graphicsFont.key
                }
            </Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    fontOption: {
        marginHorizontal: 5,
        fontSize: 16,
        color: colors.extraLight,
        backgroundColor: colors.flair,
        padding: 10,
        borderRadius: 10,
        overflow: "hidden"
    }
})

export default FontOption