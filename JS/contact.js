window.onload = function() {
    //==================== Log IN Section =================================

    // Get the modal
    var modalLogin = document.getElementById('id01');
    var modalSignUp = document.getElementById('id02');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modalLogin) {
            modalLogin.style.display = "none";
        }
        if (event.target == modalSignUp) {
            modalSignUp.style.display = "none";
        }
    }

    document.getElementById("loginButton").onclick = function(event) {
        var userName = document.getElementsByName("uname")[0];
        var password = document.getElementsByName("psw")[0];
        console.log("Aici sunt");

        if(userName.value === "nic_irina" && password.value === "micro")
        {
            userName.parentNode.parentNode.action = "http://localhost:3000/selectMode.html";
        }
        else {
            alert("Incorrect username or password!");
        }
        console.log("sadfsdf");
    }


}
