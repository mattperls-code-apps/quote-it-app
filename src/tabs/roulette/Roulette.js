import React, { useEffect } from "react"

import { createStackNavigator } from "@react-navigation/stack"

import DefaultStack from "./stacks/Default"
import SelectStack from "./stacks/Select"
import GameStack from "./stacks/Game"
import ResultsStack from "./stacks/Results"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

const RouletteTab = ({ navigation }) => {
    const Stack = createStackNavigator()

    useEffect(() => {
        const subscriber = navigation.addListener("tabPress", () => {
            ReactNativeHapticFeedback.trigger("impactLight")
        })

        return () => {
            subscriber()
        }
    }, [])

    return (
        <Stack.Navigator initialRouteName={"Default"} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Default"} component={DefaultStack} />
            <Stack.Screen name={"Select"} component={SelectStack} />
            <Stack.Screen name={"Game"} component={GameStack} />
            <Stack.Screen name={"Results"} component={ResultsStack} />
        </Stack.Navigator>
    )
}

export default RouletteTab