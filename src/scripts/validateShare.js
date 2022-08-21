const isValid = (item) => {
    if(typeof item != "object"){
        return false
    }

    const id = item.id
    const info = item.info

    return (
        typeof id == "number" &&
        typeof info == "object" &&
        Object.keys(info).length == 5 &&
        typeof info.quote == "string" &&
        typeof info.quotee == "string" &&
        typeof info.font == "number" && (info.font == 0 || info.font == 1 || info.font == 2 || info.font == 3) &&
        typeof info.color == "number" && (info.color == 0 || info.color == 1 || info.color == 2 || info.color == 3 || info.color == 4 || info.color == 5 || info.color == 6) &&
        typeof info.scale == "number" && info.scale > 0.64 && info.scale < 1.36
    )
}

export default isValid