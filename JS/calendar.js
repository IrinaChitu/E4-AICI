window.onload = function() {
    // verificam din baza de date ce intervale orare sunt libere si coloram corespunzator liniile din program
    // for(let i=0; i<=21; i++) {  // 21 fiind numarul curent de jumatati de ora corespunzatoare => trebuie intr o variabila cand stabilim programul exact
    // }

    var input_name = document.getElementsByTagName("LI");
    for(let i=0; i<input_name.length; i++) {
        var line = input_name[i];
        if(i%2) {
            line.setAttribute("class", "available");
        }
        else {
            line.setAttribute("class", "occupied");
            line.childNodes[0].setAttribute("disabled", "disabled");

        }
        console.log(line);
    }
}