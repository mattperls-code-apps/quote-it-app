import React from "react"

import { TouchableWithoutFeedback, ScrollView, View, Text, Image, StyleSheet, Linking } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import Page from "../../../components/Page"
import Button from "../../../components/Button"

import QuickDodgeLogoImage from "../../../assets/images/quick-dodge.png"
import ShouldIDoItLogoImage from "../../../assets/images/should-i-do-it.png"

import { screen, colors } from "../../../constants"

const AppsStack = ({ navigation }) => {
    return (
        <Page>
            <View style={styles.headerContainer}>
                <Button style={styles.navigationButton} onPress={navigation.goBack}>
                        <FontAwesomeIcon icon={faXmark} color={colors.extraLight} size={32} />
                </Button>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Other Apps</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <TouchableWithoutFeedback>
                    <View>
                        <View style={styles.appNameContainer}>
                            <Text style={styles.appNameText}>Quick Dodge</Text>
                        </View>
                        <Button style={styles.appLogoContainer} onPress={() => {
                            Linking.openURL("https://apps.apple.com/us/app/quick-dodge/id1517218313")
                        }}>
                            <Image style={styles.appLogoImage} source={QuickDodgeLogoImage} />
                        </Button>
                        <View style={styles.appNameContainer}>
                            <Text style={styles.appNameText}>Should I Do It?</Text>
                        </View>
                        <Button style={styles.appLogoContainer} onPress={() => {
                            Linking.openURL("https://apps.apple.com/us/app/should-i-do-it/id1628436486")
                        }}>
                            <Image style={styles.appLogoImage} source={ShouldIDoItLogoImage} />
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
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
        backgroundColor: colors.extraLight,
        borderBottomWidth: 4,
        borderBottomColor: colors.flair,
    },
    navigationButton: {
        width: 80,
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
        fontSize: 28,
        fontWeight: "900",
        color: colors.flair
    },
    appNameContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: screen.width,
        marginVertical: 30
    },
    appNameText: {
        fontFamily: "Roboto",
        fontWeight: "400",
        fontSize: 24,
        color: colors.extraDark
    },
    appLogoContainer: {
        alignItems: "center",
        width: screen.width - 160,
        height: screen.width - 160,
        marginHorizontal: 80
    },
    appLogoImage: {
        width: screen.width - 160,
        height: screen.width - 160,
        borderRadius: 0.08 * (screen.width - 160)
    }
})

export default AppsStack