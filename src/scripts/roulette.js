import shuffleArray from "shuffle-array"

const roulette = (storage, quoteeList) => {
    const availableQuotes = []

    quoteeList.forEach(quotee => {
        const quotes = storage.getFromQuotee(quotee)
        quotes.forEach(quote => {
            availableQuotes.push(quote)
        })
    })

    const generateMultipleChoiceAnswers = (actual) => {
        const available = quoteeList.filter(name => name != actual)
        const options = [ actual ]

        const length = Math.min(4, quoteeList.length)

        for(let i = 0;i<length - 1;i++){
            const index = Math.floor(Math.random() * available.length)

            options.push(available.splice(index, 1)[0])
        }

        return shuffleArray(options)
    }

    const questions = []
    
    availableQuotes.forEach(quote => {
        questions.push({
            quote,
            options: generateMultipleChoiceAnswers(quote.info.quotee)
        })
    })

    return shuffleArray(questions).slice(0, 10)
}

export default roulette