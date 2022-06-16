import "react-native-gesture-handler"

import { Text, AppRegistry } from "react-native"

import App from "./src/App"

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.maxFontSizeMultiplier = 1.3

AppRegistry.registerComponent("quoteit", () => App);