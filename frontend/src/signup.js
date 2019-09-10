import {create_feed,show_feed,show_user_feed,refresh_homepage,check_page} from './feed.js';

export function create_signup_form(){
  const r = document.getElementById("main");

  const div= document.createElement("div");
  div.setAttribute ("class","form");
  r.appendChild(div);

  const signupform = document.createElement("form");
  signupform.setAttribute ("class","form-signup");
  signupform.setAttribute ("id","signup");
  div.appendChild(signupform)

  const log = document.createElement("nav");
  signupform.appendChild(log);

  const title = document.createElement("h1");
  title.setAttribute ("class","title");
  title.innerText = "Sign Up"
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

  const ul4 = document.createElement("ul");
  ul4.setAttribute ("class","nav");
  log.appendChild(ul4);

  const ul5 = document.createElement("ul");
  ul5.setAttribute ("class","nav");
  log.appendChild(ul5);

  const signupitem = document.createElement("li");
  signupitem.setAttribute ("class","nav-item");
  ul.appendChild(signupitem);

  const username = document.createElement("input");
  username.setAttribute ("id","username");
  username.setAttribute ("data-username","");
  username.setAttribute ("class","form-input");
  username.setAttribute ("placeholder","Enter Username");
  username.setAttribute ("type","username");
  username.setAttribute ("required","");
  signupitem.appendChild(username);

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

  const emailitem = document.createElement("li");
  emailitem.setAttribute ("class","nav-item");
  ul3.appendChild(emailitem);

  const email = document.createElement("input");
  email.setAttribute ("id","email");
  email.setAttribute ("data-email","");
  email.setAttribute ("class","form-input");
  email.setAttribute ("placeholder","Enter Email");
  email.setAttribute ("type","email");
  email.setAttribute ("required","");
  emailitem.appendChild(email);

  const nameitem = document.createElement("li");
  nameitem.setAttribute ("class","nav-item");
  ul4.appendChild(nameitem);

  const name = document.createElement("input");
  name.setAttribute ("id","name");
  name.setAttribute ("data-name","");
  name.setAttribute ("class","form-input");
  name.setAttribute ("placeholder","Enter Name");
  name.setAttribute ("type","name");
  name.setAttribute ("required","");
  nameitem.appendChild(name);

  const signupbtn = document.createElement("button");
  signupbtn.setAttribute ("data-id-signup","");
  signupbtn.setAttribute ("id","signup-button");
  signupbtn.setAttribute ("class","button button-secondary");
  signupbtn.setAttribute("type","button")
  signupbtn.innerText = "Sign Up";
  ul5.appendChild(signupbtn);
}

export function check_signup(apiUrl,id){
  if (id == "signup-btn"){
    refresh_homepage();
    if (localStorage.getItem("page")){
      localStorage.removeItem("page");
    }
    const signup = document.getElementById("top-signup");
    create_signup_form();
    const signupbutton = document.getElementById("signup-button");

    signupbutton.addEventListener('click',(e) =>{
      validate_signup(apiUrl);
    })
  }
}

export function validate_signup(apiUrl){
  const username = document.getElementById("username").value;
  const password = document.getElementById("pw").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;

  if (username == "" || password == "" || email == "" || name == ""){
    alert("Please enter all details");
  } else if (! (email.includes('@') && email.includes('.'))) {
    alert("Please enter valid email");
  } else {
    const details = {
      method : 'POST',
      headers :{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        name: name
      })
    }

     fetch(apiUrl + "/auth/signup",details)
       .then(response => {
       if(response.status === 200){
            alert ("Sign up successfully")
            return response.json()
        } else if(response.status === 409){
            alert("Sorry username taken");
            throw "ERROR"
        }
      })
      .then  (j => {
        console.log(j.token);
        window.localStorage.setItem('user', j.token);
        window.localStorage.getItem('user');
        location.reload();
      })
    }

}
export default check_signup;
