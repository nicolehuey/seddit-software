
export function create_banner(){
  const r = document.getElementById("root");
  const header = document.createElement("header");
  header.setAttribute ("class","banner");
  header.setAttribute ("id","nav");
  r.appendChild(header);

}

export function create_logo(){
  const nav = document.getElementById("nav");
  const logo = document.createElement("h1");
  logo.setAttribute ("id","logo");
  logo.setAttribute ("class","flex-center");
  logo.innerText = "Seddit";
  nav.appendChild(logo);


}

export function create_buttons(){
  const nav = document.getElementById("nav");
  const ul = document.createElement("ul");
  ul.setAttribute ("class","nav");
  ul.setAttribute ("id","buttons");
  nav.appendChild(ul);

  // create search bar
  const search = document.createElement("li");
  search.setAttribute ("class","nav-item-search");
  ul.appendChild(search);

  const input = document.createElement("input");
  input.setAttribute ("id","search");
  input.setAttribute ("data-id-search","");
  input.setAttribute ("placeholder","Search Seddit");
  input.setAttribute ("type","search");
  search.appendChild(input);

  // create profile icon
  if (window.localStorage.getItem('user')) {
    const profile = document.createElement("li");
    profile.setAttribute ("class","nav-item");
    profile.setAttribute ("id","top-profile");
    ul.appendChild(profile);

    const profileicon = document.createElement("i");
    profileicon.setAttribute("class","far fa-user");
    profileicon.setAttribute("id","profile");
    profile.appendChild(profileicon);


    create_logout_button();
  } else {
    // show login or sign up button
    create_login_signup_button();
  }

}

export function create_login_signup_button(){
  const ul = document.getElementById("buttons");
  const login = document.createElement("li");
  login.setAttribute ("class","nav-item");
  login.setAttribute ("id","top-login");
  ul.appendChild(login);

  const loginbtn = document.createElement("button");
  loginbtn.setAttribute ("data-id-login","");
  loginbtn.setAttribute ("id","login-btn");
  loginbtn.setAttribute ("class","button button-primary");
  loginbtn.innerText = "Log In";
  login.appendChild(loginbtn);

  // create signup button
  const signup = document.createElement("li");
  signup.setAttribute ("class","nav-item");
  signup.setAttribute ("id","top-signup");
  ul.appendChild(signup);

  const signupbtn = document.createElement("button");
  signupbtn.setAttribute ("data-id-signup","");
  signupbtn.setAttribute ("id","signup-btn");
  signupbtn.setAttribute ("class","button button-secondary");
  signupbtn.innerText = "Sign Up";
  signup.appendChild(signupbtn);
}

export function create_logout_button(){
  const ul = document.getElementById("buttons");
  const logout = document.createElement("li");
  logout.setAttribute ("class","nav-item");
  logout.setAttribute ("id","top-logout");
  logout.style.display = "none";
  ul.appendChild(logout);

  const logoutbtn = document.createElement("button");
  logoutbtn.setAttribute ("data-id-logout","");
  logoutbtn.setAttribute ("class","button button-primary");
  logoutbtn.innerText = "Log Out";
  logout.appendChild(logoutbtn);
}



export default {create_banner,create_logo,create_buttons,create_login_signup_button,create_logout_button};
