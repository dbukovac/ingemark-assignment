export function isLetter (letter) {
    return letter.match(/[A-Za-z]/);
}

const variableMinMax = {
    errors: {
        min: 0,
        max: 25
    },
    uChars: {
        min: 1,
        max: 26
    },
    length: {
        min: 1,
        max: 300
    },
    duration: {
        min: 1,
        max: 3600000
    }
}

function normaliseLowerIsBetter (variable, value) {
    const varMin = variableMinMax[variable].min;
    const varMax = variableMinMax[variable].max;

    return (varMin + (varMax - value) - varMin) / (varMax - varMin);
}

function normaliseHigherIsBetter (variable, value) {
    const varMin = variableMinMax[variable].min;
    const varMax = variableMinMax[variable].max;

    return (value - varMin) / (varMax - varMin);
}

export function calculateScore (errors, uniqueChars, length, duration) {
    return (normaliseLowerIsBetter("errors", errors) * 812500 + 1000) + (normaliseHigherIsBetter("uChars", uniqueChars) * 31250 + 100) + (normaliseHigherIsBetter("length", length) * 1200 + 10) + (normaliseLowerIsBetter("duration", duration) * 3.6);
}