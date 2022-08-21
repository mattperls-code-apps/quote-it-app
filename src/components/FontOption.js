import React from "react"

import { Text, StyleSheet } from "react-native"

import Button from "./Button"

import { colors, graphicFonts } from "../constants"

const FontOption = ({ fontIndex, setFont }) => {
    return (
        <Button onPress={() => { setFont(fontIndex) }}>
            <Text style={[styles.fontOption, { fontFamily: graphicFonts[fontIndex].fontFamily }]}>
                {
                    graphicFonts[fontIndex].key
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