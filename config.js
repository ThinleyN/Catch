const masterSpeed = 20000;

function calculateLetterSpeed(text) {
    let totalCharacters = text.length;
    let interval = masterSpeed/totalCharacters;
    return interval;    
}