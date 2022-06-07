import React, { useState, useEffect } from "react"

import { TouchableWithoutFeedback, View, Text, StyleSheet, Keyboard } from "react-native"

import Page from "../components/Page"
import Button from "../components/Button"
import { EditableQuoteGraphic } from "../components/QuoteGraphic"
import FontOption from "../components/FontOption"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faX, faFont, faPalette, faCropAlt } from "@fortawesome/free-solid-svg-icons"

import LinearGradient from "react-native-linear-gradient"
import Slider from "@react-native-community/slider"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

import Storage from "../scripts/storage"

import { screen, colors, graphicFonts, graphicColorSchemes } from "../constants"

const CreatePage = ({ navigation, route }) => {
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
            setQuotee(route.params.quotee ? route.params.quotee : info.quotee)
            setFont(info.font)
            setColor(info.color)
            setScale(info.scale)

            setInitialized(true)
        })
    }, [])

    const [tool, setTool] = useState("")

    let toolRender = null
    if(tool == "font"){
        const fontOptions = []
        graphicFonts.forEach((fontOption, index) => {
            fontOptions.push(
                <FontOption key={index} graphicsFont={fontOption} setFont={setFont} />
            )
        })
        toolRender = fontOptions
    } else if(tool == "color"){
        const colorOptions = []
        graphicColorSchemes.forEach((colorOption, index) => {
            colorOptions.push(
                <TouchableWithoutFeedback key={index} onPress={() => {
                    ReactNativeHapticFeedback.trigger("impactLight", {
                        enableVibrateFallback: false
                    })
                    setColor(graphicColorSchemes[index])
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
                    <FontAwesomeIcon icon={faX} color={colors.extraLight} size={24} />
                </Button>
                <Button style={styles.headerButton} onPress={() => {
                    const formatted = quotee.trim().replace(/\s\s+/g, " ").split(" ").map(s => s.slice(0, 1).toUpperCase() + s.slice(1)).join(" ")
                    const formattedQuotee = formatted.length == 0 ? "Unknown" : formatted

                    const storage = new Storage()
                    storage.initialize(() => {
                        storage.update(route.params.id, {
                            quote,
                            quotee,
                            formattedQuotee,
                            font,
                            color,
                            scale
                        }, () => {
                            navigation.goBack()
                            navigation.push("History", { formattedQuotee })
                        })
                    })
                }}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Button>
            </View>
            {
                initialized && (
                    <React.Fragment>
                        <View style={styles.quoteGraphicContainer}>
                            <EditableQuoteGraphic quote={quote} setQuote={setQuote} quotee={quotee} setQuotee={setQuotee} font={font} color={color} scale={scale} renderHeight={screen.height - 320} />
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
                                <View style={[styles.toolContainer, { backgroundColor: tool == "font" ? colors.extraLight : colors.light, borderWidth: tool == "font" ? 4 : 0 }]}>
                                    <FontAwesomeIcon icon={faFont} color={colors.flair} size={24} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {
                                ReactNativeHapticFeedback.trigger("impactLight", {
                                    enableVibrateFallback: false
                                })
                                setTool(tool == "color" ? "" : "color")
                            }}>
                                <View style={[styles.toolContainer, { backgroundColor: tool == "color" ? colors.extraLight : colors.light, borderWidth: tool == "color" ? 4 : 0 }]}>
                                    <FontAwesomeIcon icon={faPalette} color={colors.flair} size={24} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {
                                ReactNativeHapticFeedback.trigger("impactLight", {
                                    enableVibrateFallback: false
                                })
                                setTool(tool == "scale" ? "" : "scale")
                            }}>
                                <View style={[styles.toolContainer, { backgroundColor: tool == "scale" ? colors.extraLight : colors.light, borderWidth: tool == "scale" ? 4 : 0 }]}>
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
        backgroundColor: colors.extraLight
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
        backgroundColor: colors.extraLight,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    toolContainer: {
        width: 60,
        height: 60,
        borderColor: colors.light,
        marginHorizontal: 15,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default CreatePage