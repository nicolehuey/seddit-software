import {create_feed,show_feed,show_user_feed,refresh_homepage,check_page} from './feed.js';

export function create_login_form(){
  const r = document.getElementById("main");

  const div= document.createElement("div");
  div.setAttribute ("class","form");
  r.appendChild(div);

  const loginform = document.createElement("form");
  loginform.setAttribute ("class","form-login");
  loginform.setAttribute ("id","login");
  div.appendChild(loginform)

  const log = document.createElement("nav");
  loginform.appendChild(log);

  const title = document.createElement("h1");
  title.setAttribute ("class","title");
  title.innerText = "Login"
  log.appendChild(title);

  const ul = document.createElement("ul");
  ul.setAttribute ("class","nav");
  log.appendChild(ul);

  const ul2 = document.createElement("ul");
  ul2.setAttribute ("class","nav");
  log.appendChild(ul2);

  const ul3 = document.createElement("ul");
  ul3.setAttribute ("class","nav");
  log.appendChild(ul3);

  const loginitem = document.createElement("li");
  loginitem.setAttribute ("class","nav-item");
  ul.appendChild(loginitem);

  const username = document.createElement("input");
  username.setAttribute ("id","username");
  username.setAttribute ("data-username","");
  username.setAttribute ("placeholder","Enter Username");
  username.setAttribute ("type","username");
  username.setAttribute ("class","form-input");
  username.setAttribute ("required","");
  loginitem.appendChild(username);

  const pwitem = document.createElement("li");
  pwitem.setAttribute ("class","nav-item");
  ul2.appendChild(pwitem);

  const pw = document.createElement("input");
  pw.setAttribute ("id","pw");
  pw.setAttribute ("data-password","");
  pw.setAttribute ("class","form-input");
  pw.setAttribute ("placeholder","Enter Password");
  pw.setAttribute ("type","password");
  pw.setAttribute ("required","");
  pwitem.appendChild(pw);

  const loginbtn = document.createElement("button");
  loginbtn.setAttribute ("data-id-login","");
  loginbtn.setAttribute ("id","login-button");
  loginbtn.setAttribute ("type","button");
  loginbtn.setAttribute ("class","button button-primary");
  loginbtn.innerText = "Log In";
  ul3.appendChild(loginbtn);
}

export function check_login(apiUrl,btn){
  if (btn == "login-btn"){
      refresh_homepage();
      create_login_form();
      const loginbutton = document.getElementById("login-button");

      loginbutton.addEventListener('click',(e) =>{
        validate_login(apiUrl);
      })
      if (localStorage.getItem("page")){
        localStorage.removeItem("page");
      }
  }
}

export function validate_login(apiUrl){
  const username = document.getElementById("username").value;
  const password = document.getElementById("pw").value;
  if (username == "" || password == ""){
    alert("Please enter both username and password");
  } else {
    const details = {
      method : 'POST',
      headers :{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }

     fetch(apiUrl + "/auth/login",details)
       .then(response => {
       if(response.status === 200){
            alert ("Login successfully");
            return response.json();
        } else if(response.status === 400){
            alert("Please enter both username and password");
            throw "ERROR"
        } else if(response.status === 403){
            alert("Invalid username/password");
            throw "ERROR";
        }
        console.log(response.json());
      })

      .then(j => {
        console.log("Token is "+ j.token);
        window.localStorage.setItem('user', j.token);
        window.localStorage.setItem('username', username);
        document.getElementById("login").style.display = "none";
        location.reload();
      })
  }


}


export default check_login;
