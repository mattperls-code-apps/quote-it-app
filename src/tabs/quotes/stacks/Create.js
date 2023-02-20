import React, { useState, useEffect } from "react"

import { TouchableWithoutFeedback, View, Text, StyleSheet, Keyboard } from "react-native"

import Page from "../../../components/Page"
import Button from "../../../components/Button"
import { EditableQuoteGraphic } from "../../../components/QuoteGraphic"
import FontOption from "../../../components/FontOption"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faXmark, faFont, faPalette, faCropAlt } from "@fortawesome/free-solid-svg-icons"

import LinearGradient from "react-native-linear-gradient"
import Slider from "@react-native-community/slider"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

import formatQuotee from "../../../scripts/formatQuotee"
import Storage from "../../../scripts/storage"

import { screen, colors, graphicFonts, graphicColorSchemes } from "../../../constants"

const CreateStack = ({ navigation, route }) => {
    const [initialized, setInitialized] = useState(false)

    const [quote, setQuote] = useState()
    const [quotee, setQuotee] = useState()
    const [font, setFont] = useState()
    const [color, setColor] = useState()
    const [scale, setScale] = useState()

    useEffect(() => {
        const storage = new Storage()
        storage.initialize(() => {
            const info = storage.getInfo(route.params.id)

            setQuote(info.quote)
            setQuotee(route.params.quotee ?? info.quotee)
            setFont(info.font)
            setColor(info.color)
            setScale(info.scale)

            setInitialized(true)
        })
    }, [])

    const save = () => {
        const storage = new Storage()
        storage.initialize(() => {
            storage.update(route.params.id, {
                quote,
                quotee,
                font,
                color,
                scale
            }, () => {
                navigation.goBack()
                navigation.push("Quotee", { formattedQuotee: formatQuotee(quotee) })
            })
        })
    }

    const [tool, setTool] = useState("")

    let toolRender = null
    if(tool == "font"){
        const fontOptions = []
        for(let i = 0;i<graphicFonts.length;i++){
            fontOptions.push(
                <FontOption key={i} fontIndex={i} setFont={setFont} />
            )
        }
        toolRender = fontOptions
    } else if(tool == "color"){
        const colorOptions = []
        graphicColorSchemes.forEach((colorOption, index) => {
            colorOptions.push(
                <TouchableWithoutFeedback key={index} onPress={() => {
                    ReactNativeHapticFeedback.trigger("impactLight", {
                        enableVibrateFallback: false
                    })
                    setColor(index)
                }}>
                    <LinearGradient style={{ marginHorizontal: 7.5, width: 30, height: 30, borderRadius: 5 }} colors={colorOption} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
                </TouchableWithoutFeedback>
            )
        })
        toolRender = colorOptions
    } else if(tool == "scale"){
        toolRender = (
            <Slider style={{ width: screen.width - 160 }} value={scale} onValueChange={setScale} onSlidingComplete={() => {
                ReactNativeHapticFeedback.trigger("impactLight", {
                    enableVibrateFallback: false
                })
            }} minimumValue={0.65} maximumValue={1.35} step={0.01} thumbTintColor={colors.extraLight} minimumTrackTintColor={colors.flair} maximumTrackTintColor={colors.dark} />
        )
    }

    return (
        <Page onPress={Keyboard.dismiss}>
            <View style={styles.headerContainer}>
                <Button style={[styles.headerButton, { width: 80 }]} onPress={() => {
                    navigation.goBack()
                }}>
                    <FontAwesomeIcon icon={faXmark} color={colors.extraLight} size={32} />
                </Button>
                <Button style={styles.headerButton} onPress={save}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Button>
            </View>
            {
                initialized && (
                    <React.Fragment>
                        <View style={styles.quoteGraphicContainer}>
                            <EditableQuoteGraphic quote={quote} setQuote={setQuote} quotee={quotee} setQuotee={setQuotee} timestamp={Date.now()} font={font} color={color} scale={scale} renderHeight={screen.height - 320} />
                        </View>
                        <View style={styles.toolOptionsContainer}>
                            {
                                toolRender
                            }
                        </View>
                        <View style={styles.toolsContainer}>
                            <TouchableWithoutFeedback onPress={() => {
                                ReactNativeHapticFeedback.trigger("impactLight", {
                                    enableVibrateFallback: false
                                })
                                setTool(tool == "font" ? "" : "font")
                            }}>
                                <View style={[styles.toolContainer, { borderColor: tool == "font" ? colors.flair : colors.extraLight }]}>
                                    <FontAwesomeIcon icon={faFont} color={colors.flair} size={24} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {
                                ReactNativeHapticFeedback.trigger("impactLight", {
                                    enableVibrateFallback: false
                                })
                                setTool(tool == "color" ? "" : "color")
                            }}>
                                <View style={[styles.toolContainer, { borderColor: tool == "color" ? colors.flair : colors.extraLight }]}>
                                    <FontAwesomeIcon icon={faPalette} color={colors.flair} size={24} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {
                                ReactNativeHapticFeedback.trigger("impactLight", {
                                    enableVibrateFallback: false
                                })
                                setTool(tool == "scale" ? "" : "scale")
                            }}>
                                <View style={[styles.toolContainer, { borderColor: tool == "scale" ? colors.flair : colors.extraLight }]}>
                                    <FontAwesomeIcon icon={faCropAlt} color={colors.flair} size={24} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </React.Fragment>
                )
            }
        </Page>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: screen.width,
        height: 120,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: colors.extraLight,
        borderBottomWidth: 4,
        borderBottomColor: colors.flair,
    },
    headerButton: {
        height: 80,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.flair
    },
    saveButtonText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 24,
        color: colors.extraLight,
        paddingHorizontal: 40
    },
    quoteGraphicContainer: {
        width: screen.width,
        height: screen.height - 280,
        alignItems: "center",
        justifyContent: "center"
    },
    toolOptionsContainer: {
        width: screen.width,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    toolsContainer: {
        width: screen.width,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    toolContainer: {
        width: 60,
        height: 60,
        borderWidth: 4,
        backgroundColor: colors.extraLight,
        marginHorizontal: 15,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default CreateStack