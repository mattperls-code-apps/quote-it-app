import React from "react"

import { View, Text, StyleSheet } from "react-native"

import Page from "../components/Page"
import Button from "../components/Button"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

import { screen, colors } from "../constants"

const PrivacyPolicyPage = ({ navigation }) => {
    return (
        <Page>
            <View style={styles.headerContainer}>
                <Button style={[styles.navigationButton, { width: 80 }]} onPress={() => {
                        navigation.goBack()
                    }}>
                        <FontAwesomeIcon icon={faX} color={colors.extraLight} size={24} />
                    </Button>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText} ellipsizeMode={"tail"}>Privacy Policy</Text>
                </View>
            </View>
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
    }
})

export default PrivacyPolicyPage