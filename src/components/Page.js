import React from "react"

import { TouchableWithoutFeedback, View, StyleSheet } from "react-native"

import { initialWindowMetrics } from "react-native-safe-area-context"

import { colors } from "../constants"

const Page = ({ children, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={() => {
            if(typeof onPress == "function"){
                onPress()
            }
        }}>
            <View style={styles.page}>
                <View style={{ flex: 1, backgroundColor: colors.light, overflow: "hidden" }}>
                    {
                        children
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: initialWindowMetrics.insets.top,
        paddingLeft: initialWindowMetrics.insets.left,
        paddingRight: initialWindowMetrics.insets.right,
        backgroundColor: colors.extraLight
    }
})

export default Page