import { initialWindowMetrics } from "react-native-safe-area-context"

const screen = {
    width: initialWindowMetrics.frame.width - initialWindowMetrics.insets.left - initialWindowMetrics.insets.right,
    height: initialWindowMetrics.frame.height - initialWindowMetrics.insets.top - initialWindowMetrics.insets.bottom
}

const colors = {
    extraLight: "rgb(240, 240, 240)",
    light: "rgb(210, 210, 210)",
    dark: "rgb(70, 70, 70)",
    extraDark: "rgb(0, 0, 0)",
    flair: "rgb(100, 150, 250)",
    red: "rgb(240, 110, 110)"
}

const graphicFontsV1 = [
    { key: "Default", fontFamily: "Roboto" },
    { key: "Funny", fontFamily: "Happy Monkey" },
    { key: "Fancy", fontFamily: "Courgette" },
    { key: "Serious", fontFamily: "Playfair Display" }
]

const graphicColorSchemesV1 = [
    [ "rgb(255, 179, 102)", "rgb(255, 102, 102)" ],
    [ "rgb(255, 224, 102)", "rgb(255, 163, 102)" ],
    [ "rgb(255, 255, 102)", "rgb(163, 255, 102)" ],
    [ "rgb(102, 255, 224)", "rgb(117, 255, 102)" ],
    [ "rgb(102, 255, 255)", "rgb(102, 163, 255)" ],
    [ "rgb(255, 102, 255)", "rgb(148, 102, 255)" ],
    [ "rgb(255, 102, 224)", "rgb(255, 102, 133)" ]
]

const graphicFonts = [
    { key: "Default", fontFamily: "Roboto" },
    { key: "Funny", fontFamily: "Happy Monkey" },
    { key: "Fancy", fontFamily: "Courgette" },
    { key: "Serious", fontFamily: "Playfair Display" }
]

const graphicColorSchemes = [
    [ "#ff8080", "#ffa6a6" ],
    [ "#ffbf80", "#ffd2a6" ],
    [ "#ffff80", "#ffffa6" ],
    [ "#80ff80", "#a6ffa6" ],
    [ "#8080ff", "#a6a6ff" ],
    [ "#cc80ff", "#dba6ff" ],
    [ "#ff80cc", "#ffa6db" ]
]

export { screen, colors, graphicFontsV1, graphicColorSchemesV1, graphicFonts, graphicColorSchemes }