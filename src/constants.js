import { initialWindowMetrics } from "react-native-safe-area-context"

const screen = {
    width: initialWindowMetrics.frame.width - initialWindowMetrics.insets.left - initialWindowMetrics.insets.right,
    height: initialWindowMetrics.frame.height - initialWindowMetrics.insets.top - initialWindowMetrics.insets.bottom - 80,
    bottom: initialWindowMetrics.insets.bottom
}

const colors = {
    extraLight: "rgb(250, 250, 250)",
    light: "rgb(220, 220, 220)",
    dark: "rgb(70, 70, 70)",
    extraDark: "rgb(0, 0, 0)",
    flair: "rgb(100, 150, 250)",
    red: "rgb(240, 110, 110)",
    green: "rgb(40, 250, 120)"
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
    [ "#ff8080", "#ffc2c2" ],
    [ "#ffbf80", "#ffdfbf" ],
    [ "#ffff80", "#fcfccf" ],
    [ "#80ff80", "#d7fcd7" ],


    [ "#9e9eff", "#d4d4ff" ],

    [ "#d28fff", "#e7c2ff" ],
    [ "#fc90d1", "#ffcfec" ]
]

const purchaseIds = {
    roulette: "com.mattperlscode.quoteit.roulette"
}

export { screen, colors, graphicFontsV1, graphicColorSchemesV1, graphicFonts, graphicColorSchemes, purchaseIds }