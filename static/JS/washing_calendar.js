let last_active = 12; //today

window.onload = function() {
    let calendar_days = document.getElementsByClassName("days")[0].children;
    for(let i=0; i<calendar_days.length; i++) {
        let day = calendar_days[i];

        day.onclick = function (event) {
            // console.log(event);
            // console.log(event.srcElement.innerText);
            let clicked = event.srcElement.innerText;

            calendar_days[last_active-1].removeChild(calendar_days[last_active-1].childNodes[0]);
            calendar_days[last_active-1].innerText=last_active;

            last_active = clicked;


            let highlight = document.createElement("SPAN");
            highlight.setAttribute("class","active");
            highlight.innerText = clicked;
            calendar_days[clicked-1].innerText="";
            calendar_days[clicked-1].appendChild(highlight);

            fetch('../todayschedule')
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    // link_text.innerText = text_received;
                    console.log(myJson);
                });

            let today_progr = document.getElementById("today_program");
            today_progr.setAttribute("style", "display=block");
            console.log(today_progr);
            let hours = today_progr.children;
            for(let i=0; i<hours.length; i++) {
                let line = hours[i];
                if(i%2) {
                    line.setAttribute("class", "available");
                }
                else {
                    line.setAttribute("class", "occupied");
                    line.childNodes[0].setAttribute("disabled", "disabled");        }
                if(i%3==0) {
                    line.setAttribute("class", "available");

                }
            }

        }
    }




    // Get the modal
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
    var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }




}