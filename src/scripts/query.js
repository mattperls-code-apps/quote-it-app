const cleanStr = (str) => str.trim().replace(/\s\s+/g, " ").toLowerCase()

const queryFilter = (arr, query, scorer) => {
    const formattedQuery = cleanStr(query)
    
    if(formattedQuery.length == 0){
        return arr
    } else {
        const queryParts = formattedQuery.split(" ") // .map(str => new RegExp(str + "\\b", "g"))

        const queried = []
        arr.forEach((item, index) => {
            let score = 0
            queryParts.forEach(queryPart => {
                score += scorer(item, queryPart)
            })
            if(score != 0){
                queried.push({ score, index })
            }
        })

        queried.sort((a, b) => {
            if(a.score < b.score){
                return 1
            } else if(a.score > b.score){
                return -1
            } else {
                return 0
            }
        })

        const results = []
        queried.forEach(queriedItem => {
            results.push(arr[queriedItem.index])
        })

        return results
    }
}

const queryQuotees = (quotees, query) => {
    return queryFilter(quotees, query, (quotee, keyword) => {
        return cleanStr(quotee.formattedQuotee).split(keyword).length - 1
    })
}

const queryQuotes = (quotes, query) => {
    return queryFilter(quotes, query, (quote, keyword) => {
        const quoteKeywordOccurrences = cleanStr(quote.info.quote).split(keyword).length - 1
        const quoteeKeywordOccurrences = cleanStr(quote.info.quotee).split(keyword).length - 1

        return quoteKeywordOccurrences + 5 * quoteeKeywordOccurrences
    })
}

export {
    queryQuotees,
    queryQuotes
}