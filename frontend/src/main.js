/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with
// different datasets.
import {create_banner,create_logo,create_buttons,create_login_signup_button,create_logout_button} from './create.js';
import check_signup from './signup.js';
import check_login from './login.js';
import check_logged_status from './logout.js';
import {create_feed,show_feed,show_user_feed,refresh_homepage,check_page} from './feed.js';
import {upvote_post, downvote_post,find_upvoted_users,check_upvotes} from './vote.js';
import check_profile from "./profile.js";
import {make_post,display_post_box,submit_post,check_post} from "./post.js";
import {create_comments,make_comment,check_comments} from "./comment.js"

function initApp(apiUrl) {
  // set up the webpage
  create_banner();
  create_logo();
  create_buttons();
  // clear page ittem if exist
  if (localStorage.getItem("page")){
    localStorage.removeItem("page");
  }

  // show public feed if no user logged in
  // show user own feed if logged in
  check_logged_status(apiUrl);
  document.addEventListener('click',(e) => {
    // login and signup
    check_login(apiUrl,e.target.id);
    check_signup(apiUrl,e.target.id);

    // check for upvoting or viewing upvoted users
    check_upvotes(apiUrl,e.target);

    // profile related actions
    // view and edit profile/own post
    check_profile(apiUrl,e.target);

    // view comments or make comments
    check_comments(apiUrl,e.target);

    // uploading new post
    check_post(apiUrl,e.target);

    // pagination
    check_page(apiUrl,e.target);

    // go back to homepage by clicking logo
     if (e.target.id == "logo"){
      refresh_homepage();
      show_feed(apiUrl);
      if (localStorage.getItem("page")){
        localStorage.removeItem("page");
      }
    }
  });

}


export default initApp;
