import bulma from "bulma/css/bulma.css";
import axios from "axios";

function entry() {
    
    const loginButton = document.querySelector("#loginButton")
    const registerButton = document.querySelector("#registerButton")

    if (loginButton) {
        loginButton.on('click',() => {
            axios({
                method: 'post',
                url: '/user/12345',
                data: {
                  firstName: 'Fred',
                  lastName: 'Flintstone'
                }
              });
        })
    }
    if (registerButton) {
        registerButton.on('click',() => {
            
        })
    }
}
entry()