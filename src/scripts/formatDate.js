const formatDate = (timestamp) => {
    const iso = new Date(timestamp).toISOString().slice(0, 10)

    const parts = iso.split("-")

    const month = parts[1]
    const day = parts[2]
    const year = parts[0]

    return month + " / " + day + " / " + year.slice(2)
}

export default formatDate