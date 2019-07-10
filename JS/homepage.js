nr_washing_machines = 8; // va fi extras din baza de date a spalatoriei curente

window.onload = function() {

    var content = document.createElement("DIV");
    content.setAttribute("id", "container");
    document.body.appendChild(content);
    for(let i=0; i<nr_washing_machines; i++) {
        var div_hover = document.createElement("DIV");
        div_hover.setAttribute("class", "hovereffect");

        var div_text_program = document.createElement("DIV");
        div_text_program.setAttribute("class", "overlay");
        var link_text = document.createElement("A");
        link_text.setAttribute("class", "info");
        link_text.setAttribute("href", "../HTML/washing_calendar.html")
        link_text.innerText = "yoyo";
        div_text_program.appendChild(link_text);

        var link_machine = document.createElement("A");
        link_machine.setAttribute("href", "../HTML/washing_calendar.html");

        var w_machine = document.createElement("IMG");
        w_machine.setAttribute("src", "../images/washing-machine.png");
        w_machine.setAttribute("alt", "washing_machine_nr_" + i);
        w_machine.setAttribute("width", "25%");
        w_machine.setAttribute("height", "50%");

        link_machine.appendChild(w_machine);
        div_hover.appendChild(link_machine);
        div_hover.appendChild(div_text_program);

        content.appendChild(div_hover);
    }
}
