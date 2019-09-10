import {create_feed,show_feed,show_user_feed,refresh_homepage,check_page} from './feed.js';

// upvote a post
export function upvote_post (apiUrl,id){
  const myToken = localStorage.getItem('user');
  const d = {
    method : 'PUT',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
      'id': id
    }
  };

  fetch(`${apiUrl}/post/vote?id=${id}`,d)
         .then(res => res.json())
         .then(json => {
           console.log(json);
         });
}
// downvote a post
export function downvote_post(apiUrl,id){
  const myToken = localStorage.getItem('user');
  const d = {
    method : 'DELETE',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
      'id': id
    }
  };

  fetch(`${apiUrl}/post/vote?id=${id}`,d)
         .then(res => res.json())
         .then(json => {
           console.log(json);
         });

}
// get voters
export function find_upvoted_users(apiUrl,r,v){
  let results = [];
  let j = 0;
  let voter = r.meta.upvotes;
  for (let i =0 ; i < voter.length ; i++){
    get_username(apiUrl,voter[i]).then(name => {
      // push the users to the array
      results.push(name);
      if (i == (voter.length -1)){
        create_upvotes_modal(results,v);
      }
    });

  }
}

function create_upvotes_modal(data,v){
  const i = v.parentNode.id + "myModal";
  const m = document.createElement("div");
  m.setAttribute("class","modal");
  m.setAttribute("id",i);
  v.appendChild(m);

  const modal = document.createElement("div");
  modal.setAttribute("class","modal-content");
  m.appendChild(modal);

  const span = document.createElement("i");
  span.setAttribute("class","fa fa-close");
  span.setAttribute("id","close");
  modal.appendChild(span);

  const p = document.createElement("p");
  p.setAttribute("class","upvoters-list");
  p.innerText = data;
  modal.appendChild(p);
}
// find username for ppl who voted
function get_username(apiUrl,id){
  const myToken = localStorage.getItem('user');
  const d = {
    method : 'GET',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
      'id': id,
      'p' : 0,
      'n' : 10
    }
  };

  return fetch(`${apiUrl}/user?id=${id}`,d)
         .then(res => res.json())
         .then(json => {
           return json.username;
         });
}

// check upvotes

export function check_upvotes(apiUrl,target){
  if (target.id == "up-arrow"){
    if (! window.localStorage.getItem('user')) {
      alert("Please login or sign up to vote");
    } else {
      upvote_post(apiUrl,target.parentNode.parentNode.id);
      refresh_homepage();
      show_feed(apiUrl);
    }
  } else if (target.id == "down-arrow"){
    if (! window.localStorage.getItem('user')) {
      alert("Please login or sign up to vote");
    } else {
      downvote_post(apiUrl,target.parentNode.parentNode.id);
      refresh_homepage();
      show_feed(apiUrl);
    }
  } else if (target.id == "upvotes"){
    if (! window.localStorage.getItem('user')) {
      alert("Please login or sign up to view");
    } else {
      const i = target.parentNode.parentNode.id;
      const n = i + "myModal";
      const v = document.getElementById(n);
      v.style.display = "block";
    }
  } else if (target.id == "close"){
      target.parentNode.parentNode.style.display = "none";
  }
}


export default {upvote_post, downvote_post,find_upvoted_users,check_upvotes};
