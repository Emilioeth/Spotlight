import bulma from "bulma/css/bulma.css";
import axios from "axios";

function entry() {
    
    const loginButton = document.querySelector("#loginButton")
    const registerButton = document.querySelector("#registerButton")
    const userNameBox = document.querySelector('#username')
    const pwBox = document.querySelector('#password')

    if (loginButton) {
        loginButton.addEventListener("click",() => {
            axios({
                method: 'post',
                url: '/login',
                data: {
                  email: userNameBox.value,
                  password: pwBox.value
                }
              });
        })
    }
    if (registerButton) {
        registerButton.addEventListener("click",() => {
            axios({
                method: 'post',
                url: '/register',
                data: {
                  email: userNameBox.value,
                  password: pwBox.value
                }
              });
        })
    }
}
entry()