import bulma from "bulma/css/bulma.css";
import axios from "axios";
import tabs from "./deps/tabs.js";
import fas from "font-awesome/css/font-awesome.css";

function entry() {

  const loginButton = document.querySelector("#loginButton")
  const logoutButton = document.querySelector("#logoutButton")
  const registerButton = document.querySelector("#registerButton")
  const userNameBox = document.querySelector('#username')
  const pwBox = document.querySelector('#password')

  if (loginButton) {
    loginButton.addEventListener("click", () => {
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
    registerButton.addEventListener("click", () => {
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
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      axios({
        method: 'post',
        url: '/auth/logout',
      });
      setTimeout(function(){
        window.location.reload();
     }, 500);
    })
  }

  const doAddSearchBtn = document.querySelector("#searchAddBtn")
  const searchInput = document.querySelector("#searchTextInput")

  const userId = document.querySelector("#user-data").dataset.id
  doAddSearchBtn.addEventListener("click", () => {
    axios({
      method: 'post',
      url: `/api/user/${userId}/addfavorite`,
      data: {
        title: searchInput.value
      }
    }).then((response) => {
      console.log(response)
      window.location.href = '/';
    })
  })

  window.onSpotifyIframeApiReady = (IFrameAPI) => {

    axios({
      method: 'get',
      url: '/api/login',
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


    let element = document.getElementById('embed-iframe');
    let options = {
      uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
    };
    let callback = (EmbedController) => { };
    IFrameAPI.createController(element, options, callback);
  };
}
entry()