import {create_banner,create_logo,create_buttons,create_login_signup_button,create_logout_button} from "./create.js"
import {create_feed,show_feed,show_user_feed,refresh_homepage,check_page} from './feed.js';

function logged_in(){
  document.getElementById("top-logout").style.display = "block";
}
function logout(){
  localStorage.removeItem('user');
  localStorage.removeItem('username');

  var element = document.getElementById("top-profile");
  element.parentNode.removeChild(element);

  var logout = document.getElementById("top-logout");
  logout.parentNode.removeChild(logout);

  create_login_signup_button();
  if (document.getElementById("profile-page")){
    const prof = document.getElementById("profile-page");
    while (prof.firstChild){
      prof.removeChild(prof.firstChild);
    }
  }
  // remove old feed
  if (document.getElementById("feed")){
    const output = document.getElementById("feed");
    while(output.firstChild){
      output.removeChild(output.firstChild);
    }
  }
}

export function check_logged_status(apiUrl){
  if (window.localStorage.getItem('user')) {
     logged_in();
     show_feed(apiUrl);
     // logout action
     // remove own feed and show public feed
     const out = document.getElementById("top-logout");
     out.addEventListener('click',(e) => {
       logout();
       refresh_homepage();
       show_feed(apiUrl);
     });
   } else {
     show_feed(apiUrl);
   }
}


export default check_logged_status;
