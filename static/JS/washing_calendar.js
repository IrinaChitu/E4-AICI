window.onload = function() {
    let calendar_days = document.getElementsByClassName("days")[0].children;
    for(let i=0; i<calendar_days.length; i++) {
        let day = calendar_days[i];

        day.onclick = function (event) {
            console.log(event);
            console.log(event.srcElement.innerText);
            let clicked = event.srcElement.innerText;

            let highlight = document.createElement("SPAN");
            highlight.setAttribute("class","active");
            highlight.innerText = clicked;
            calendar_days[clicked-1].innerText="";
            calendar_days[clicked-1].appendChild(highlight);
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