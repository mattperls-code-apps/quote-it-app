import React, { useEffect, useRef } from "react"

import { TouchableWithoutFeedback, View, Text, StyleSheet, Alert } from "react-native"

import Button from "./Button"
import { StaticQuoteGraphic } from "./QuoteGraphic"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faShare, faPenToSquare, faStar, faTrash } from "@fortawesome/free-solid-svg-icons"

import ViewShot, { captureRef } from "react-native-view-shot"
import Share from "react-native-share"

import Storage from "../scripts/storage"

import Canvas from "react-native-canvas"

import { colors, screen } from "../constants"
import { embedImage } from "../scripts/embedImage"

const InteractiveQuote = ({ navigation, quote, quotee, timestamp, font, color, scale, favorite, renderHeight, last, onMutate }) => {
    const [canvas1, setCanvas1] = useState(null)
    const [canvas2, setCanvas2] = useState(null)
    const sharableImageRef = useRef()
    const handleEmbed1 = cnvs => {
        if (!cnvs) return
        setCanvas1(cnvs)
    }

    const handleEmbed2 = cnvs => {
        if (!cnvs) return
        setCanvas2(cnvs)
    }


    const handleShare = () => {
        captureRef(sharableImageRef, {
            format: "jpg"
        }).then(url => {

            embedImage(url, quote, quotee, canvas1, canvas2).then(imgUrl => {
                try {
                    Share.open({ imgUrl, failOnCancel: false })
                } catch (error) {
                    console.warn(error)
                }
            })


        })
    }

    const handleEdit = () => {
        navigation.navigate("Quotes", {
            screen: "Create",
            params: {
                id: timestamp
            }
        })
    }

    const handleFavorite = () => {
        const storage = new Storage()

        storage.initialize(() => {
            storage.update(timestamp, {
                quote,
                quotee,
                font,
                color,
                scale,
                favorite: !favorite
            }, onMutate)
        })
    }

    const handleDelete = () => {
        Alert.alert("Are You Sure?", "You will not be able to recover this quote.", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                    const storage = new Storage()

                    storage.initialize(() => {
                        storage.delete(timestamp, onMutate)
                    })
                }
            }
        ])
    }

    return (
        <TouchableWithoutFeedback>
            <Canvas ref={handleEmbed1} style={{ backfaceVisibility: "hidden" }} />
            <Canvas ref={handleEmbed2} style={{ backfaceVisibility: "hidden" }} />
            <View style={{ ...styles.container, borderBottomWidth: last ? 0 : 4 }}>
                <View ref={sharableImageRef} style={{ ...styles.graphicContainer, height: renderHeight + 40 }}>
                    <StaticQuoteGraphic quote={quote} quotee={quotee} timestamp={timestamp} font={font} color={color} scale={scale} renderHeight={renderHeight} />
                </View>
                <View style={styles.interactionBarContainer}>
                    <Button onPress={handleShare} style={styles.interactionOptionContainer}>
                        <FontAwesomeIcon style={styles.interactionIcon} icon={faShare} size={18} />
                        <Text style={styles.interactionLabel}>Share</Text>
                    </Button>
                    <Button onPress={handleEdit} style={styles.interactionOptionContainer}>
                        <FontAwesomeIcon style={styles.interactionIcon} icon={faPenToSquare} size={18} />
                        <Text style={styles.interactionLabel}>Edit</Text>
                    </Button>
                    <Button onPress={handleFavorite} style={styles.interactionOptionContainer}>
                        <FontAwesomeIcon style={styles.interactionIcon} icon={faStar} size={18} color={favorite ? colors.gold : colors.extraLight} />
                        <Text style={styles.interactionLabel}>Favorite</Text>
                    </Button>
                    <Button onPress={handleDelete} style={styles.interactionOptionContainer}>
                        <FontAwesomeIcon style={styles.interactionIcon} icon={faTrash} size={18} />
                        <Text style={styles.interactionLabel}>Delete</Text>
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.flair
    },
    graphicContainer: {
        alignSelf: "center",
        padding: 20
    },
    interactionBarContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: 20,
        marginTop: 0,
        width: screen.width - 40,
        height: 60
    },
    interactionOptionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.flair,
        borderRadius: 8,
        marginHorizontal: 10,
        paddingVertical: 10
    },
    interactionIcon: {
        color: colors.extraLight
    },
    interactionLabel: {
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: "700",
        color: colors.extraLight
    },

})

export default InteractiveQuote