import React, { useEffect } from "react"

import { createStackNavigator } from "@react-navigation/stack"

import DefaultStack from "./stacks/Default"
import PrivacyStack from "./stacks/Privacy"
import AppsStack from "./stacks/Apps"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

const SettingsTab = ({ navigation }) => {
    const Stack = createStackNavigator()

    useEffect(() => {
        return navigation.addListener("tabPress", () => {
            ReactNativeHapticFeedback.trigger("impactLight")
        })
    }, [])

    return (
        <Stack.Navigator initialRouteName={"Default"} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Default"} component={DefaultStack} />
            <Stack.Screen name={"Privacy"} component={PrivacyStack} />
            <Stack.Screen name={"Apps"} component={AppsStack} />
        </Stack.Navigator>
    )
}

export default SettingsTab