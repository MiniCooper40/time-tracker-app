const startPaddedWithZero =  (value: number): string => {
    if (value < 10) return `0${value}`
    else return value.toString()
}

const millisecondFactor = 1
const secondFactor = 1000
const minuteFactor = 1000 * 60
const hourFactor = 1000 * 60 * 60

export const millisecondsToTimestamp = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / hourFactor)
    milliseconds -= hours * hourFactor

    const minutes = Math.floor(milliseconds / minuteFactor)
    milliseconds -= minutes * minuteFactor

    const seconds = Math.floor(milliseconds / secondFactor)
    milliseconds -= seconds * secondFactor

    milliseconds = Math.floor(milliseconds/10)

    const milliStr = startPaddedWithZero(milliseconds)
    const secondStr = startPaddedWithZero(seconds)
    const minuteStr = startPaddedWithZero(minutes)
    const hourStr = startPaddedWithZero(hours)

    const timestamp = `${minuteStr}:${secondStr}.${milliStr}`
    return hours !== 0
        ? `${hourStr}:${timestamp}`
        : timestamp
}

export const asLocalDateTime = (milliseconds: number) => {
    return new Date(milliseconds).toISOString()
}

export const BLANK_TIMESTAMP = "00:00.00"