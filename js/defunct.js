var vocab = ""

function toggle_card() {
    document.getElementById("cards").classList.toggle("back");
}

function startup(){
    if (get_vocab() == false) {
        alert("Please enter the set you want to use in the dictionary, or select one to use from the library.");
    }
    else {
        document.getElementById("cardsbutton").style.display = "none";
    }
}

function setvocab(setname) {
    switch(setname){
        case(spanis-nums):
            vocab = {
                cero : zero,
                uno : one,
                dos : two,
                tres : three,
                cuatro : four,
                cinco : five,
                seis : six,
                siete : seven,
                ocho : eight,
                nueve : nine,
                diez : ten 
            }
    }
}

function get_vocab() {
    return vocab;
}

function display_next_vocab_term() {
    // var cnvs = document.getElementById("cards");
    // var write = cnvs.getContext("2d");
    // write.font = "30px";
    // write.fillText("Hello World", 10, 50);
}