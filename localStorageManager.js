let popTheBubbleHighScore = 0;
let connectTheDotsHighScore = "00:00:00";
let jigsawPuzzleHighScore = "00:00:00";

export function setPopBubbleHS(num) {
    popTheBubbleHighScore = num;
    saveInfo();
}

export function setConnectDotsHS(time) {
    connectTheDotsHighScore = time;
    saveInfo();
}

export function setJigsawPuzzleHS(time) {
    jigsawPuzzleHighScore = time;
    saveInfo();
}

function saveInfo() {
    let scoreInfo = `{"scores":[{"bubbleHS":"${popTheBubbleHighScore}"},{"dotsHS":"${connectTheDotsHighScore}"},{"jigsawHS":"${jigsawPuzzleHighScore}"}]}`;
    localStorage.setItem('score-list', scoreInfo);
}

export function getInfo() {
    let retrievedScoreInfo = localStorage.getItem('score-list');

    let parsedObject = JSON.parse(retrievedScoreInfo);
    // Access data by using ex. parsedObject.items[0].bubbleHS
    return parsedObject;
}