import compare_time from "./time.js"
import {create_feed,show_feed,show_user_feed,refresh_homepage,check_page} from './feed.js';

export function create_comments(post,v){

  let i;
  const j = v.parentNode.parentNode.id + "myComments";
  const m = document.createElement("div");
  m.setAttribute("class","modal");
  m.setAttribute("id",j);
  v.appendChild(m);

  const modal = document.createElement("div");
  modal.setAttribute("class","modal-content");
  m.appendChild(modal);

  const span = document.createElement("i");
  span.setAttribute("class","fa fa-close");
  span.setAttribute("id","close");
  modal.appendChild(span);

  for (i = 0; i < post.comments.length; i++) {

    let p = document.createElement("p");
    p.setAttribute("class","commenter");
    p.innerText += post.comments[i].author + " : ";
    modal.appendChild(p);

    let p1 = document.createElement("p");
    p1.setAttribute("class","comment-content");
    modal.appendChild(p1);

    p1.innerText += post.comments[i].comment + " ";

    let p2 = document.createElement("p");
    p2.setAttribute("class","comment-time");
    p1.appendChild(p2);

    const time = post.comments[i].published;
    const when = compare_time(time);
    p2.innerText += " (" + when + ") ";
  }
  let dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const newc = document.createElement("input");
  newc.setAttribute ("id","new-comment-" + v.parentNode.parentNode.id);
  newc.setAttribute ("placeholder","Enter Comment");
  newc.setAttribute ("class","form-input");
  modal.appendChild(newc);

  dv = document.createElement("div");
  dv.setAttribute("class","divider");
  modal.appendChild(dv);

  const postbtn = document.createElement("button");
  postbtn.setAttribute ("id","comment-button" );
  postbtn.setAttribute ("type","button");
  postbtn.setAttribute ("class","button button-secondary");
  postbtn.innerText = "Comment";
  modal.appendChild(postbtn);
}

export function make_comment(apiUrl,id,comment){

  console.log(comment);
  console.log("id" + id);
  const myToken = localStorage.getItem('user');
  const options = {
    method : 'PUT',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    },
    body: JSON.stringify({
        comment: `${comment}`
    })
  }
  fetch(`${apiUrl}/post/comment?id=${id}`,options)
     .then(res => res.json())
     .then(json => {
       console.log(json);
     })
}

export function check_comments(apiUrl,target){
  // show comments in a modal
  if (target.id == "comment"){
    if (! window.localStorage.getItem('user')) {
      alert("Please login or sign up to view comments");
    } else {
      const i = target.parentNode.parentNode.id;
      const n = i + "myComments";
      const v = document.getElementById(n);
      v.style.display = "block";
    }
  // make new comment
  } else if (target.id == "comment-button"){
    const postid = target.parentNode.parentNode.id.replace("myComments", "");
    const c = document.getElementById("new-comment-" + postid);
    make_comment(apiUrl,postid,c.value);
    refresh_homepage();
    if (localStorage.getItem("page")){
      show_user_feed(apiUrl,localStorage.getItem("page"));
    } else {
      show_feed(apiUrl);
    }
  }
}

export default {create_comments,make_comment,check_comments}
