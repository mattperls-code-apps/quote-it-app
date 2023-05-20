import React, { useEffect } from "react"

import { StatusBar, StyleSheet } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import  { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHome, faPersonCircleQuestion, faCogs, faSearch } from "@fortawesome/free-solid-svg-icons"

import QuotesTab from "./tabs/quotes/Quotes"
import SearchTab from "./tabs/search/Search"
import RouletteTab from "./tabs/roulette/Roulette"
import SettingsTab from "./tabs/settings/Settings"

import { colors, screen } from "./constants"

const App = () => {
    const Tab = createBottomTabNavigator()

    useEffect(() => {
        StatusBar.setBarStyle("dark-content")
    }, [])

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={"Quotes"} screenOptions={({ route }) => {
                return {
                    headerShown: false,
                    tabBarStyle: styles.tabContainer,
                    tabBarIcon: ({ focused, color, size }) => {
                        let icon

                        switch(route.name){
                            case "Quotes":
                                icon = faHome
                                break
                            case "Search":
                                icon = faSearch
                                break
                            case "Roulette":
                                icon = faPersonCircleQuestion
                                break
                            case "Settings":
                                icon = faCogs
                                break
                        }

                        return (
                            <FontAwesomeIcon icon={icon} color={focused ? colors.extraDark : colors.flair} size={36} />
                        )
                    },
                    tabBarShowLabel: false,
                    lazy: false
                }
            }}>
                <Tab.Screen name={"Quotes"} component={QuotesTab} />
                <Tab.Screen name={"Search"} component={SearchTab} />
                <Tab.Screen name={"Roulette"} component={RouletteTab} />
                <Tab.Screen name={"Settings"} component={SettingsTab} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        height: 80 + screen.bottom,
        borderTopWidth: 4,
        borderTopColor: colors.flair,
        backgroundColor: colors.extraLight
    }
})

export default App