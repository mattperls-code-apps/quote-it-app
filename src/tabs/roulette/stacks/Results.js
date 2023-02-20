import React from "react"

import { View, Text, StyleSheet } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import PieChart from "../../../components/PieChart"

import { screen, colors } from "../../../constants"

const ResultsStack = ({ navigation, route }) => {
    const radius = Math.min(screen.width - 40, screen.height - 340)

    return (
        <Page>
            <View style={styles.headerContainer}>
                {
                    // TODO: prevent slide back and prompt to make sure
                }
                <Button style={[styles.navigationButton, { width: 80 }]} onPress={navigation.goBack}>
                    <FontAwesomeIcon icon={faXmark} color={colors.extraLight} size={32} />
                </Button>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText} numberOfLines={2} ellipsizeMode={"tail"}>Your Score</Text>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <PieChart percent={route.params.correctCount / route.params.totalCount} width={radius} height={radius} />
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>You Got { route.params.correctCount } Out Of { route.params.totalCount } Correct</Text>
            </View>
            <View style={styles.continueButtonWrapper}>
                <Button style={styles.continueButtonContainer} onPress={() => {
                    navigation.goBack()
                }}>
                    <Text style={styles.continueButtonText}>Exit</Text>
                </Button>
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
        backgroundColor: colors.extraLight,
        borderBottomWidth: 4,
        borderBottomColor: colors.flair,
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
        fontSize: 28,
        fontWeight: "900",
        color: colors.flair
    },
    chartContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: screen.width,
        height: screen.height - 300
    },
    scoreContainer: {
        alignItems: "center",
        width: screen.width,
        height: 80
    },
    scoreText: {
        fontFamily: "Roboto",
        fontWeight: "400",
        fontSize: 20,
        color: colors.extraDark
    },
    continueButtonWrapper: {
        width: screen.width - 40,
        height: 100,
        marginHorizontal: 20
    },
    continueButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: screen.width - 40,
        height: 80,
        borderRadius: 20,
        backgroundColor: colors.flair
    },
    continueButtonText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 24,
        color: colors.extraLight
    }
})

export default ResultsStack