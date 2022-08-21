import { graphicFontsV1, graphicColorSchemesV1 } from "../constants"

const needsUpdate = (info) => {
    return typeof info.font != "number"
}

const convert = (info) => {
    const fontIndex = Math.max(graphicFontsV1.findIndex(font => font.key == info.font.key), 0)
    let colorIndex = Math.max(graphicColorSchemesV1.findIndex(color => color[0] == info.color[0]), 0)

    return {
        quote: info.quote,
        quotee: info.quotee,
        font: fontIndex,
        color: colorIndex,
        scale: info.scale
    }
}

export {
    needsUpdate,
    convert
}