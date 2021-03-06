import React, { useEffect } from "react"

import { StatusBar } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import HomePage from "./pages/Home"
import CreatePage from "./pages/Create"
import HistoryPage from "./pages/History"
import PrivacyPolicyPage from "./pages/PrivacyPolicy"

import SplashScreen from "react-native-splash-screen"

const App = () => {
    const Stack = createStackNavigator()

    useEffect(() => {
        StatusBar.setBarStyle("dark-content")
    })

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"} screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={"Home"}>
                    {
                        ({ navigation }) => <HomePage navigation={navigation} onInitialized={SplashScreen.hide} />
                    }
                </Stack.Screen>
                <Stack.Screen name={"Create"} component={CreatePage} />
                <Stack.Screen name={"History"} component={HistoryPage} />
                <Stack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App