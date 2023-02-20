import React from "react"

import { View, Text, StyleSheet } from "react-native"

import Svg, { Circle, Path } from "react-native-svg"

import { colors } from "../constants"

const PieChart = ({ width, height, percent }) => {
    const x = 50 + 50 * Math.cos(2 * Math.PI * percent)
    const y = 50 - 50 * Math.sin(2 * Math.PI * percent)

    // this is gonna be scuffed, I'm not going to properly handle arc flags

    let correctRender

    if(percent > 0.5){
        correctRender = [
            <Path key={0} d={"M 100 50 A 50 50 1 0 0 0 50"} fill={colors.green} />,
            <Path key={1} d={"M 50 50 L 0 50 A 50 50 1 0 0 " + x + " " + y} fill={colors.green} />
        ]
    } else {
        correctRender = (
            <Path d={"M 50 50 L 100 50 A 50 50 1 0 0 " + x + " " + y} fill={colors.green} />
        )
    }

    return (
        <View style={{ width, height }}>
            <Svg width={width} height={height} viewBox={"0 0 100 100"}>
                <Circle cx={"50"} cy="50" r={"50"} fill={colors.red} />
                {
                    correctRender
                }
            </Svg>
            {
                (percent == 0 || percent == 1) && (
                    <View style={styles.fullCircleContainer}>
                        <Text style={{ ...styles.fullCircleText, fontSize: 0.2 * width }}>
                            {
                                percent == 0 ? "0%" : "100%"
                            }
                        </Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    fullCircleContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    fullCircleText: {
        fontFamily: "Roboto",
        fontWeight: "600",
        color: colors.extraDark
    }
})

export default PieChart