var selected_ids = [];
var max_font_size = 140;
var keys = [];

window.onload = function() {
    setInputLineHeight();
    loadDefaultSelection();
}

//Track all keys that are currently pressed
//-----------------------------------
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        console.log(e.keyCode);
    },
false);

window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);
//-----------------------------------

function loadDefaultSelection() {
    if(localStorage.defaultSelection) {
        mouseover(localStorage.defaultSelection);
        select(localStorage.defaultSelection);
    }
}

function setDefaultSelection(id) {
    //remove old default underline
    if(localStorage.defaultSelection) {
        document.getElementById(localStorage.defaultSelection).style.textDecoration = "";
    }
    

    localStorage.defaultSelection = id;
    //text-decoration: underline;
    document.getElementById(id).style.textDecoration = "underline";
}

function underlineIfDefaultSelection(id) {
    if(localStorage.defaultSelection == id) {
        document.getElementById(id).style.textDecoration = "underline";
    }
}

function dispatch(event) {
    x = event.which || event.keyCode;
    search = document.getElementById("search").value;
    if (x != 13) {
        return;
    }

    if (selected_ids[0] == "choice-0") {
        //Google
        window.location.href = "https://www.google.com/search?&q=" + search;
    } else if (selected_ids[0] == "choice-1") {
        //DuckDuckGo
        window.location.href = "https://duckduckgo.com/?q=" + search;
    } else if (selected_ids[0] == "choice-2") {
        //Wikipedia
        window.location.href = "https://en.wikipedia.org/wiki/Special:Search?search=" + search;
    }

}

function select(id) {

    //if already selected, return
    if(selected_ids.indexOf(id) != -1) {
        return;
    }

    //check if ctrl is pressed to make it the default selection
    if(keys[17]) {
        setDefaultSelection(id);
    }

    deselect();
    document.getElementById(id).style.border = "3px solid #bfbfbf";
    document.getElementById(id).style.borderRadius = "25px";
    selected_ids.push(id);

    
}

function deselect() {
    selected_ids.forEach(function (v) {
        document.getElementById(v).setAttribute('style', '');
        underlineIfDefaultSelection(v);
        removeFromArray(v);
    });
}

function mouseover(id) {
    if (selected_ids.indexOf(id) != -1) {

    } else {
        document.getElementById(id).setAttribute('style', 'color: #bfbfbf !important; cursor: pointer; font-size: 50px; transition: font-size 0.5s, color 0.5s');
        underlineIfDefaultSelection(id);
    }
}

function mouseout(id) {
    if (selected_ids.indexOf(id) != -1) {
        document.getElementById(id).setAttribute('style', 'border: 3px solid #bfbfbf; border-radius: 25px; color: #bfbfbf !important; font-size: 50px;');
    } else {
        document.getElementById(id).setAttribute('style', '');
    }
    underlineIfDefaultSelection(id);

}

function removeFromArray(val) {
    var index = selected_ids.indexOf(val);
    if (index > -1) {
        selected_ids.splice(index, 1);
    }
}

function measure() {
    //window.getComputedStyle(el, null).getPropertyValue('font-size');
    var search = document.getElementById("search");
    var measure = document.getElementById("width_measure");

    measure.innerText = search.value;

    console.log(measure.offsetWidth + "px");

    ratio = measure.offsetWidth / search.offsetWidth;

    original_size = window.getComputedStyle(search, null).getPropertyValue('font-size');

    var new_size;

    //Wenn zu gross
    if (ratio > 1) {
        new_size = parseInt(original_size) / (ratio * 1.2);
    } else if (ratio < 0.8) { //wenn zu klein
        new_size = parseInt(original_size) / ratio;
    }

    //check size
    if (new_size > max_font_size) {
        new_size = max_font_size;
    }

    search.style.fontSize = new_size + "px";
    measure.style.fontSize = new_size + "px";
}

function setInputLineHeight() {
    search = document.getElementById("search");
    h = window.getComputedStyle(search, null).getPropertyValue('line-height');
    search.style.lineHeight = h;
}