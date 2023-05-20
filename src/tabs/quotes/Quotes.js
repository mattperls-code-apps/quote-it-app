import React, { useEffect } from "react"

import { createStackNavigator } from "@react-navigation/stack"

import DefaultStack from "./stacks/Default"
import CreateStack from "./stacks/Create"
import QuoteeStack from "./stacks/Quotee"
import FavoritesStack from "./stacks/Favorites"

import ReactNativeHapticFeedback from "react-native-haptic-feedback"

const QuotesTab = ({ navigation }) => {
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
            <Stack.Screen name={"Create"} component={CreateStack} />
            <Stack.Screen name={"Quotee"} component={QuoteeStack} />
            <Stack.Screen name={"Favorites"} component={FavoritesStack} />
        </Stack.Navigator>
    )
}

export default QuotesTab