import bulma from "bulma/css/bulma.css";
import axios from "axios";
import tabs from "./deps/tabs.js"
import fas from "font-awesome/css/font-awesome.css"

function entry() {
    
    const loginButton = document.querySelector("#loginButton")
    const registerButton = document.querySelector("#registerButton")
    const userNameBox = document.querySelector('#username')
    const pwBox = document.querySelector('#password')

    if (loginButton) {
        loginButton.addEventListener("click",() => {
            axios({
                method: 'post',
                url: '/auth/login',
                data: {
                  email: userNameBox.value,
                  password: pwBox.value
                }
              }).then(function (response) {
                console.log(response);
                window.location.href = '/';
              })
              .catch(function (error) {
                console.log(error);
              });
        })
    }
    if (registerButton) {
        registerButton.addEventListener("click",() => {
            axios({
                method: 'post',
                url: '/auth/register',
                data: {
                  email: userNameBox.value,
                  password: pwBox.value
                }
              });
        })
    }
}
entry()