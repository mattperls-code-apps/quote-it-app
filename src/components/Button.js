import React, { useRef } from "react"

import { TouchableWithoutFeedback, Animated } from "react-native"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

const Button = ({ children, style, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current

    const handlePressIn = () => {
        Animated.timing(scale, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const handlePressOut = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => {
            ReactNativeHapticFeedback.trigger("impactLight", {
                enableVibrateFallback: false
            })
            onPress()
        }}>
            <Animated.View style={[style, { transform: [{ scale }] }]}>
                {
                    children
                }
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default Button