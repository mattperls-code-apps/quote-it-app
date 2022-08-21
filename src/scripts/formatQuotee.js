const formatQuotee = (quotee) => {
    const formatted = quotee.trim().replace(/\s\s+/g, " ").split(" ").map(s => s.slice(0, 1).toUpperCase() + s.slice(1)).join(" ")
    const formattedQuotee = formatted.length == 0 ? "Unknown" : formatted

    return formattedQuotee
}

export default formatQuotee