var index;
let setUpForm = document.getElementById("setUpForm");

// sets a color scheme once the page loads, default is gray but it will retain the one you chose last! :)
document.getElementById("change-color").className = getClass();

// not sure why these are necessary but it doesn't work without them. just returns a color name
function selectPurple() {
    return 'purple';
}
function selectPink() {
    return 'pink';
}
function selectGreen() {
    return 'green';
}
function selectBlue() {
    return 'blue';
}
function selectGray() {
    return 'gray';
}

// sets the 'color' class to the color passed in, which interacts with css to select color palette
function setClass(color) {
    window.localStorage.removeItem('color');
    window.localStorage.setItem('color', color);
    document.getElementById("change-color").className = localStorage.getItem('color');
}

// returns the 'color' class so it can be reset
function getClass() {
    if (localStorage.getItem('color') == null) {
        return localStorage.setItem('color', 'gray');
    }
    return localStorage.getItem('color');
}


// handle dropdown hamburger menu
function dropTheBurg() {
    var drop = document.getElementById("dropdown");
    if (drop.style.maxHeight === "0px") {
      drop.style.maxHeight = "100px";
      drop.style.overflow = "visible";
    } else {
      drop.style.maxHeight = "0px";
      drop.style.overflow = "hidden";
    }
  }

// dictionary

// submit form and populate cards
setUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let setName = document.getElementById("setName");
  let numTerms = document.getElementById("numTerms");

  if (setName.value == "" || numTerms.value == "") {
    alert("Please fill in both fields");
  } else {
    // perform operation with form input
    alert("This form has been successfully submitted!");

    populateCards(numTerms.value);
  }
});

function populateCards(numTerms){
    vocablist = [];
    for (let index = 0; index < numTerms; index++) {
        term = prompt("Enter a term");
        def = prompt("Enter its definition/translation");
        vocablist.push(term, def);
    }
    // adds any vocab already in the list so they don't get overwritten
    if (localStorage.getItem('vocab') != null){
        vocablist.push(localStorage.getItem('vocab'));
    }
    localStorage.setItem('vocab', vocablist);
}

// flashcards page
function toggle_card() {
    document.getElementById("cards").classList.toggle("back");
}

function startup(){
    if (localStorage.getItem('vocab') == null) {
        alert("Please enter the set you want to use in the dictionary, or select one to use from the library.");
    }
    else {
        document.getElementById("cardsbutton").style.display = "none";
        index = -2;
        display_next();
    }
}

function setvocab(setname) {
    vocablist = []; // empty array and then things from each selected set get added in!
    switch(setname){
        case('spanish-nums'):
            vocablist.push("cero", "zero", "uno", "one", "dos", "two", "tres", "three", "cuatro", "four",
                "cinco", "five", "seis", "six", "siete", "seven", "ocho", "eight", "nueve", "nine", "diez", "ten");
            break;

        case('css-html-terms'):
            vocablist.push("selector", "which items you want to style", "declaration", "the property and value you are using to style", 
                "property", "the thing you want to change about an element", "value", "what you change the property to", "CSS", 
                "Cascading Style Sheets", "HTML", "HyperText Markup Language"
            );
            break;
            
        case('irish-colors'):
            vocablist.push("dearg", "red", "oraiste", "orange", "buí", "yellow", "glas", "green", "gorm", "blue", "corcra", "purple", 
                "bándearg", "pink", "bán", "white", "dunn", "brown"
            );
            break;
            
        case('spanish-colors'):
            vocablist.push("rojo", "red", "naranja", "orange", "amarillo", "yellow", "verde", "green", "azul", "blue", "morado/púrpura", 
                "purple", "rosado/rosa", "pink", "blanco", "white", "marrón/café", "brown"
            );
            break;

        case('swahili-prefixes'):
            vocablist.push("ni-", "subject agreement: 1SG", "tu-", "subject agreement: 1PL", "u-", "subject agreement: 2SG", "m-", 
                "subject agreement: 2SG", "a-", "subject agreement: 3SG", "wa-", "subject agreement: 3PL", "ku-", "tense: INF", "na-", 
                "tense: PRES", "li-", "tense: PST"
            );
            break;

        case('spanish-conj'):
            vocablist.push("verb in present tense", "replace infinitive suffix with subject agreement suffix", "(yo) ___-o", 
                "subject agreement: 1SG", "(nos) ___-amos/-emos/-imos", "subject agreement: 1PL", "(tu) ___-as/-es", 
                "subject agreement: 2SG", "(él/la/usted) ___-a/-e", "subject agreement: 3SG or 2SG formal", 
                "(ellos/ellas/ustedes) ___-an/-en", "subject agreement: 3PL or 2PL"
            );
            break;
    }
    if (localStorage.getItem('vocab') != null){
        vocablist.push(localStorage.getItem('vocab'));
    }
    localStorage.setItem('vocab', vocablist);
    document.getElementById(setname + "-b").style.backgroundColor = "gray";
}

function get_vocab() {
    return localStorage.getItem('vocab');
}

function display_front_vocab(index) {
    var vocablist = localStorage.getItem('vocab').split(",");
    var cfront = document.getElementById("front");
    var writef = cfront.getContext("2d");
    writef.clearRect(0, 0, cfront.width, cfront.height);
    writef.font = "20px Verdana";
    writef.textBaseline = "center";
    writef.textAlign = "center";
    writef.fillText(vocablist[index], calculate_coords(cfront.width, vocablist[index]), (cfront.height / 2));
    index += 1;
}
function display_back_vocab(index) {
    var vocablist = localStorage.getItem('vocab').split(",");
    var cback = document.getElementById("back");
    var writeb = cback.getContext('2d');
    writeb.clearRect(0, 0, cback.width, cback.height);
    writeb.font = "20px Verdana";
    writeb.textBaseline = "center";
    writeb.textAlign = "center";
    writeb.fillText(vocablist[index + 1], calculate_coords(cback.width, vocablist[index + 1]), (cback.height / 2));
    index += 1;
}

function display_next() {
    var vocablist = localStorage.getItem('vocab').split(",");
    index += 2;
    if (vocablist[index] == undefined){
        alert("You've reached the end of the set! Good job!")
        localStorage.removeItem('vocab');
    }
    else if (index % 2 == 0) {
        // front
        display_front_vocab(index);
        display_back_vocab(index);
    }
}

function calculate_coords(canvasSize, towrite) {
    const calc = (towrite.toString().length / 2);
    const midpoint = canvasSize / 2;

    return midpoint - calc;
}