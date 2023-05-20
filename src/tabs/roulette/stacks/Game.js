import React, { useState } from "react"

import { View, Text, StyleSheet, Alert } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import { StaticQuoteGraphic } from "../../../components/QuoteGraphic"

import { screen, colors } from "../../../constants"

const GameStack = ({ navigation, route }) => {
    const [questionIndex, setQuestionIndex] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    
    const [answer, setAnswer] = useState(null)
    const [debounce, setDebounce] = useState(false)

    const question = route.params.questions[questionIndex]

    const generateChoiceRender = (index) => {
        const correct = question.options[index] == question.quote.info.quotee

        let borderColor

        if(answer == null){
            borderColor = colors.extraLight
        } else if(index == answer && correct){
            borderColor = colors.green
        } else if(index == answer && !correct){
            borderColor = colors.red
        } else if(answer != null && correct){
            borderColor = colors.green
        } else {
            borderColor = colors.extraLight
        }

        return (
            question.options.length > index ? (
                <Button style={{ ...styles.choiceContainer, borderColor }} onPress={() => {
                    if (debounce) return

                    setDebounce(true)
                    
                    if (correct) setCorrectCount(correctCount + 1)

                    setAnswer(index)

                    if(questionIndex == route.params.questions.length - 1){
                        const actualCorrectCount = correctCount + (+correct)

                        setTimeout(() => {
                            navigation.goBack()
                            navigation.push("Results", { correctCount: actualCorrectCount, totalCount: route.params.questions.length })
                        }, 2000)
                    } else {
                        setTimeout(() => {
                            setQuestionIndex(questionIndex + 1)
                            setAnswer(null)
                            setDebounce(false)
                        }, 2000)
                    }
                }}>
                    <Text style={styles.choiceText} numberOfLines={1} ellipsizeMode={"tail"}>
                        {
                            question.options[index]
                        }
                    </Text>
                </Button>
            ) : null
        )
    }

    const choiceRender1 = generateChoiceRender(0)
    const choiceRender2 = generateChoiceRender(1)
    const choiceRender3 = generateChoiceRender(2)
    const choiceRender4 = generateChoiceRender(3)

    return (
        <Page>
            <View style={styles.headerContainer}>
                <Button style={[styles.navigationButton, { width: 80 }]} onPress={() => {
                    Alert.alert("Are You Sure?", "If you exit the page your progress for this round will be lost.", [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "Yes",
                            onPress: navigation.goBack,
                            style: "default"
                        }
                    ])
                }}>
                    <FontAwesomeIcon icon={faXmark} color={colors.extraLight} size={32} />
                </Button>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText} numberOfLines={2}>Question { (questionIndex + 1) }</Text>
                </View>
            </View>
            <View style={styles.quoteContainer}>
                <StaticQuoteGraphic quote={question.quote.info.quote} quotee={"???"} timestamp={question.quote.id} font={question.quote.info.font} color={question.quote.info.color} scale={1} renderHeight={screen.height - 320} />
            </View>
            <View style={styles.choicesWrapper}>
                <View style={styles.choicesContainer}>
                    {
                        choiceRender1
                    }
                    {
                        choiceRender2
                    }
                </View>
                <View style={styles.choicesContainer}>
                    {
                        choiceRender3
                    }
                    {
                        choiceRender4
                    }
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
    quoteContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: screen.width,
        height: screen.height - 320,
        marginTop: 20
    },
    choicesWrapper: {
        alignItems: "center",
        justifyContent: "space-evenly",
        width: screen.width,
        height: 180
    },
    choicesContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: screen.width,
        height: 60
    },
    choiceContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 0.5 * screen.width - 30,
        height: 60,
        marginLeft: 20,
        borderRadius: 10,
        backgroundColor: colors.extraLight,
        borderWidth: 4,
        borderColor: colors.flair
    },
    choiceText: {
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: "500",
        color: colors.extraDark,
        paddingHorizontal: 10
    }
})

export default GameStack