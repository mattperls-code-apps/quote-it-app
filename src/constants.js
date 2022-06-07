import { initialWindowMetrics } from "react-native-safe-area-context"

const screen = {
    width: initialWindowMetrics.frame.width - initialWindowMetrics.insets.left - initialWindowMetrics.insets.right,
    height: initialWindowMetrics.frame.height - initialWindowMetrics.insets.top - initialWindowMetrics.insets.bottom
}

const colors = {
    extraLight: "rgb(240, 240, 240)",
    light: "rgb(210, 210, 210)",
    dark: "rgb(70, 70, 70)",
    extraDark: "rgb(20, 20, 20)",
    flair: "rgb(100, 150, 250)"
}

const graphicFonts = [
    { key: "Default", fontFamily: "Roboto" },
    { key: "Funny", fontFamily: "Happy Monkey" },
    { key: "Fancy", fontFamily: "Courgette" },
    { key: "Serious", fontFamily: "Playfair Display" }
]

const graphicColorSchemes = [
    [ "rgb(255, 179, 102)", "rgb(255, 102, 102)" ],
    [ "rgb(255, 224, 102)", "rgb(255, 163, 102)" ],
    [ "rgb(255, 255, 102)", "rgb(163, 255, 102)" ],
    [ "rgb(102, 255, 224)", "rgb(117, 255, 102)" ],
    [ "rgb(102, 255, 255)", "rgb(102, 163, 255)" ],
    [ "rgb(255, 102, 255)", "rgb(148, 102, 255)" ],
    [ "rgb(255, 102, 224)", "rgb(255, 102, 133)" ]
]

export { screen, colors, graphicFonts, graphicColorSchemes }