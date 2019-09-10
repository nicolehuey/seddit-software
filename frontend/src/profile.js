import compare_time from "./time.js"
import {create_comments,make_comment,check_comments} from "./comment.js"
import {upvote_post, downvote_post,find_upvoted_users,check_upvotes} from './vote.js';
function create_profile(apiUrl,data){

  const r = document.getElementById("main");

  const d1 = document.createElement("div");
  d1.setAttribute ("id","profile-page");
  r.appendChild(d1);

  const d = document.createElement("div");
  d.setAttribute ("class","profile");
  d1.appendChild(d);

  const ul = document.createElement("ul");
  ul.setAttribute("class","feed");
  ul.id = "profile-feed"
  r.appendChild(ul);

  const header = document.createElement("h1");
  header.setAttribute ("id","profile-name");
  header.innerText = data.name;
  d.appendChild(header);

  const header2 = document.createElement("p");
  header2.setAttribute ("id","profile-username");
  header2.innerText = "Username: " + data.username;
  d.appendChild(header2);


  const follower = document.createElement("p");
  follower.setAttribute ("id","profile-followers");
  follower.innerText = data.followed_num + " followers";
  d.appendChild(follower);

  // own posts and upvotes
  const p1 = document.createElement("p");
  p1.id = "show-total-upvotes";
  p1.innerText = "Posted " + data.posts.length + " posts";
  d.appendChild(p1);

  // count total upvotes
  count_upvotes(apiUrl,data);

  const edit = document.createElement("button");
  edit.setAttribute("id","edit-profile");
  edit.setAttribute ("class","button button-profile");
  edit.innerText = "Edit Profile";
  d.appendChild(edit);

  const m = document.createElement("div");
  m.setAttribute("class","modal");
  m.setAttribute("id","profile-modal");
  edit.appendChild(m);

  const modal = document.createElement("div");
  modal.setAttribute("class","modal-content");
  m.appendChild(modal);

  const span = document.createElement("i");
  span.setAttribute("class","fa fa-close");
  span.setAttribute("id","close");
  modal.appendChild(span);

  let dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const email = document.createElement("input");
  email.setAttribute ("id","new-email");
  email.setAttribute ("placeholder","Enter New Email");
  email.setAttribute ("type","email");
  email.setAttribute ("class","form-input");
  modal.appendChild(email);

  dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const username = document.createElement("input");
  username.setAttribute ("id","new-username");
  username.setAttribute ("placeholder","Enter New Name");
  username.setAttribute ("type","username");
  username.setAttribute ("class","form-input");
  modal.appendChild(username);

  dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const newpw = document.createElement("input");
  newpw.setAttribute ("id","new-password");
  newpw.setAttribute ("placeholder","Enter New Password");
  newpw.setAttribute ("class","form-input");
  modal.appendChild(newpw);

  dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const postbtn = document.createElement("button");
  postbtn.setAttribute ("id","edit-button");
  postbtn.setAttribute ("type","button");
  postbtn.setAttribute ("class","button button-post");
  postbtn.innerText = "Confirm changes";
  modal.appendChild(postbtn);


}

 function edit_profile(apiUrl){
  const newemail = document.getElementById("new-email");
  const newname = document.getElementById("new-username");
  const newpw = document.getElementById("new-password");

  if (newemail.value == "" && newname.value == "" && newpw.value == ""){
    alert("Please fill up at least one detail to make changes");
  }
  if (newemail.value != ""){
    edit_profile_email(apiUrl,newemail.value);
  }
  if (newname.value != ""){
    edit_profile_name(apiUrl,newname.value);
  }
  if (newpw.value != ""){
    edit_profile_pw(apiUrl,newpw.value);
  }
  alert("Changes made!")
}

function edit_profile_email(apiUrl,newemail){
  const myToken = localStorage.getItem('user');
  const d = {
    method : 'PUT',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    },
    body: JSON.stringify({
      email: newemail
    })
  };

  fetch(`${apiUrl}/user/`,d)
       .then(res => res.json())
       .then(json => {
         console.log(json);
       });
}

function edit_profile_name(apiUrl,newname){

  const myToken = localStorage.getItem('user');
  const d = {
    method : 'PUT',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    },
    body: JSON.stringify({
      name: newname
    })
  };

  fetch(`${apiUrl}/user/?Token${myToken}`,d)
}

function edit_profile_pw(apiUrl,newpw){

  const myToken = localStorage.getItem('user');
  console.log(myToken);
  const d = {
    method : 'PUT',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    },
    body: JSON.stringify({
      password: newpw
    })
  };

  fetch(`${apiUrl}/user/?Token${myToken}`,d)

}

function get_upvote_numbers(apiUrl,id){
  const myToken = localStorage.getItem('user');
  const d = {
    method : 'GET',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`
    }
  };

  return fetch(`${apiUrl}/post?id=${id}`,d)
         .then(res => res.json())
         .then(json => {
           //console.log(json);
           return json.meta.upvotes.length;
         });
}

function count_upvotes(apiUrl,data){
  let i ;
  let results = [];
  const add = (a,b) => a+b;
  console.log(data.posts)
  const r = data.posts;

  const myToken = localStorage.getItem('user');
  const d = {
    method : 'GET',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`
    }
  };
  const promises = r.map(id => get_upvote_numbers(apiUrl,id))
  Promise.all(promises).then(responses => {
        console.log(responses);
        if (responses.length > 0){
          const total = responses.reduce(add)
          console.log(total)
          return total
        } else {
          return 0;
        }
    }).then(r => {
        update_upvotes(r);
    })
}

function update_upvotes(sum){
  const p = document.getElementById("show-total-upvotes");
  const t = p.innerText;
  const text = " with " + sum + " upvotes"
  p.innerText += text;

}
function show_profile (apiUrl){
  const myToken = localStorage.getItem('user');
  const d = {
    method : 'GET',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`
    }
  };
  console.log(myToken);
  fetch(apiUrl + "/user/",d)
     .then(response => response.json())
     .then (r => {
       create_profile(apiUrl,r);
       fetch_own_posts(apiUrl,r.posts);
       //console.log(r.posts);
     })
}

function fetch_own_posts(apiUrl,post){
  if (post.length > 0){
    console.log("got postedbefore" + post);
    //foreach
    const myToken = localStorage.getItem('user');
    const sys = {
      method : 'GET',
      headers :{
        'Content-Type': 'application/json',
        'Authorization' : `Token ${myToken}`,
      }
    };
    for (let i = post.length;i >= 0;i--){
      if (post[i] != undefined){
        fetch(`${apiUrl}/post/?id=${post[i]}`,sys)
        .then(response => response.json())
        .then (r => {
          show_own_posts(r,apiUrl);
        })
      }
    }
  }
}

function show_own_posts(post,apiUrl){
  const ul = document.getElementById("profile-feed");
  const li = document.createElement("li");
  li.setAttribute("class","post");
  li.setAttribute("id",post.id);
  ul.appendChild(li);

  // data-id-upvotes
  const divvote = document.createElement("div");
  divvote.setAttribute("class","vote");
  divvote.setAttribute("id","vote");
  li.appendChild(divvote);

  // show upvotes numbers
  const p = document.createElement("p");
  p.setAttribute("data-id-upvotes","");
  p.setAttribute("id","upvotes");
  p.setAttribute("class","upvotes");
  p.innerText = post.meta.upvotes.length;
  divvote.appendChild(p);
  find_upvoted_users(apiUrl,post,divvote);

  const divcontent = document.createElement("div");
  divcontent.setAttribute("class","content");
  li.appendChild(divcontent);

  //find_upvoted_users(apiUrl,post,divvote);
  // data-id-title
  const h4 = document.createElement("h4");
  h4.setAttribute("data-id-title","");
  h4.setAttribute("class","post-title alt-text");
  h4.innerText = post.title;
  divcontent.appendChild(h4);

  // post description text
  const ptext = document.createElement("p");
  ptext.setAttribute("class","post-text");
  ptext.setAttribute("data-id-text",post.id);
  ptext.innerText = post.text;
  divcontent.appendChild(ptext);

  // post-subseddit
  const subseddit = document.createElement("p");
  subseddit.setAttribute("class","post-subseddit");
  subseddit.setAttribute("data-id-subseddit","");
  subseddit.innerText = "   /s/" + post.meta.subseddit;

  h4.appendChild(subseddit);

  // post-author and time
  const author = document.createElement("p");
  author.setAttribute("class","post-author");
  author.setAttribute("data-id-author",post.meta.author);

  // compare time it was posted with current time
  const time = post.meta.published;
  const when = compare_time(time);
  author.innerText = "Posted by " + post.meta.author + " " + when;
  h4.appendChild(author);

  // post-image
  if (post.image !== null){
    const pic = document.createElement("img");
    const picname = "data:image/jpeg;base64," + post.image;
    pic.setAttribute("src",picname);
    pic.setAttribute("class","pic");
    pic.setAttribute("width","500");
    divcontent.appendChild(pic);
  }

  // post-comments
  const commentnumber = document.createElement("p");
  commentnumber.setAttribute("class","post-commentnumber");
  commentnumber.setAttribute("id","comment");
  commentnumber.setAttribute("data-id-comment",post.id);
  if (post.comments.length > 1){
    commentnumber.innerText = post.comments.length + " Comments";
  } else if (post.comments.length == 1){
    commentnumber.innerText = post.comments.length + " Comment";
  } else {
    commentnumber.innerText = "Comment";
  }
  divcontent.appendChild(commentnumber);

  const editpostbtn = document.createElement("button");
  editpostbtn.setAttribute ("id","edit-post-button");
  editpostbtn.setAttribute ("type","button");
  editpostbtn.setAttribute ("class","button button-post");
  editpostbtn.innerText = "Edit Post";
  divcontent.appendChild(editpostbtn);
  create_comments(post,commentnumber);


  const m = document.createElement("div");
  m.setAttribute("class","modal");
  m.setAttribute("id","edit-post-modal");
  editpostbtn.appendChild(m);

  const modal = document.createElement("div");
  modal.setAttribute("class","modal-content");
  m.appendChild(modal);

  const span = document.createElement("i");
  span.setAttribute("class","fa fa-close");
  span.setAttribute("id","close");
  modal.appendChild(span);

  let dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const username = document.createElement("input");
  username.setAttribute ("id","new-title");
  username.setAttribute ("placeholder","Enter New Post Title");
  username.setAttribute ("type","username");
  username.setAttribute ("class","form-input");
  modal.appendChild(username);

  dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const newpw = document.createElement("input");
  newpw.setAttribute ("id","new-content");
  newpw.setAttribute ("placeholder","Enter New Post Content");
  newpw.setAttribute ("class","form-input");
  modal.appendChild(newpw);

  dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  modal.appendChild(dv);

  const postbtn = document.createElement("button");
  postbtn.setAttribute ("id","confirm-edit-post-button");
  postbtn.setAttribute ("type","button");
  postbtn.setAttribute ("class","button button-post");
  postbtn.innerText = "Confirm changes";
  modal.appendChild(postbtn);

  const divider = document.createElement("div");
  divider.setAttribute("class","divider");
  divcontent.appendChild(divider);

  const deletepostbtn = document.createElement("button");
  deletepostbtn.setAttribute ("id","delete-post-button");
  deletepostbtn.setAttribute ("type","button");
  deletepostbtn.setAttribute ("class","button button-post");
  deletepostbtn.innerText = "Delete Post";
  divcontent.appendChild(deletepostbtn);

}


// delete own post
function delete_post(id,apiUrl){
  const myToken = localStorage.getItem('user');
  const sys = {
    method : 'DELETE',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    }
  };
  fetch(`${apiUrl}/post/?id=${id}`,sys)
}

// edit own post
function edit_post(id,apiUrl){
  const newtitle = document.getElementById("new-title");
  const newtext = document.getElementById("new-content");

  if (newtitle.value == "" && newtext.value == ""){
    alert("Please fill up at least one detail to make changes");
    return 1;
  }
  if (newtitle.value != ""){
    edit_post_title(id,apiUrl,newtitle.value);
  }
  if (newtext.value != ""){
    edit_post_content(id,apiUrl,newtext.value);
  }
  return 0;
}

function edit_post_title(id,apiUrl,title){
  const myToken = localStorage.getItem('user');
  const sys = {
    method : 'PUT',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    },
    body: JSON.stringify({
        title : title
      })

  };
  fetch(`${apiUrl}/post/?id=${id}`,sys)
}

function edit_post_content(id,apiUrl,text){
  const myToken = localStorage.getItem('user');
  const sys = {
    method : 'PUT',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    },
    body: JSON.stringify({
        text : text
      })

  };
  fetch(`${apiUrl}/post/?id=${id}`,sys)

}


export function check_profile(apiUrl,target){
  if (target.id == "profile"){
    refresh_homepage();
    show_profile(apiUrl);
  } else if (target.id == "edit-profile"){
    const v = document.getElementById("profile-modal");
    v.style.display = "block";
  } else if (target.id == "edit-button"){
    edit_profile(apiUrl);
    refresh_homepage();
    show_profile(apiUrl);

  // delete or edit own post
  } else if (target.id == "delete-post-button"){
    console.log("delete_post" + target.parentNode.parentNode.id);
    delete_post(target.parentNode.parentNode.id,apiUrl);
    refresh_homepage();
    show_profile(apiUrl);
  } else if (target.id == "edit-post-button"){
    const v = document.getElementById("edit-post-modal");
    v.style.display = "block";
  } else if (target.id == "confirm-edit-post-button"){
    const id = target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    if (edit_post(id,apiUrl) == 0){
      refresh_homepage();
      show_profile(apiUrl);
    }
  }
}

function refresh_homepage(){
  const root = document.getElementById("main");
  while (root.firstChild){
    root.removeChild(root.firstChild);
  }
}
export default check_profile;
