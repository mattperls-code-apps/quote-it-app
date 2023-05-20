import React from "react"

import { ScrollView, View, Text, StyleSheet, Linking } from "react-native"

import Page from "../../../components/Page"
import Button from "../../../components/Button"

import { restorePurchases } from "../../../scripts/iap"

import { screen, colors } from "../../../constants"

const DefaultStack = ({ navigation }) => {
    return (
        <Page>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Settings</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Button style={styles.button} onPress={() => {
                    navigation.push("Privacy")
                }}>
                    <Text style={styles.buttonText}>Privacy Policy</Text>
                </Button>
                <Button style={styles.button} onPress={() => {
                    navigation.push("Apps")
                }}>
                    <Text style={styles.buttonText}>Other Apps</Text>
                </Button>
                <Button style={styles.button} onPress={() => {
                    Linking.openURL("mailto:mattperls.code@gmail.com")
                }}>
                    <Text style={styles.buttonText}>Contact Me</Text>
                </Button>
            </ScrollView>
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
    button: {
        marginTop: 20,
        width: screen.width - 40,
        height: 80,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    },
    buttonText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 24,
        color: colors.extraLight
    }
})

export default DefaultStack