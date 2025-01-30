var newclass = "gray";

function selectPurple() {
    newclass = "purple";
    return newclass;
}
function selectPink() {
    newclass = "pink";
    return newclass;
}
function selectGreen() {
    newclass = "green";
    return newclass;
}
function selectBlue() {
    newclass = "blue";
    return newclass;
}
function selectGray() {
    newclass = "gray";
    return newclass;
}

function setClass(color) {
    var elementBody = document.body;
    elementBody.classList.add(color);
}

function getClass() {
    return newclass;
}