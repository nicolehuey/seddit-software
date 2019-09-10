import {make_post,display_post_box} from "./post.js";
import {create_comments,make_comment,check_comments} from "./comment.js"
import compare_time from "./time.js"
import {upvote_post, downvote_post,find_upvoted_users,check_upvotes} from "./vote.js"

export function create_feed(apiUrl,data,publicfeed){
  const r = document.getElementById("root");
  if (! document.getElementById("main")){
    let m = document.createElement("main");
    m.setAttribute ("role",'main');
    m.setAttribute ("id",'main');
    r.appendChild(m);
  }

  const main = document.getElementById("main");
  // data-id-feed
  const ul = document.createElement("ul");
  ul.setAttribute("id","feed");
  ul.setAttribute("class","feed");
  ul.setAttribute("data-id-feed","");
  main.appendChild(ul);

  if (window.localStorage.getItem('user')) {
    const postbtn = document.createElement("button");
    postbtn.setAttribute("id","post");
    postbtn.setAttribute ("class","button button-primary");
    postbtn.innerText = "Post";
    ul.appendChild(postbtn);

    make_post();
  }

  let i;
  if (data.posts.length == 0){
    const h = document.createElement("h2");
    h.setAttribute("id","no-post-header");
    h.innerText= "Start following someone today on seddit!";
    ul.appendChild(h);
  }
  for (i = 0; i < data.posts.length; i++) {
    // create data-id-post
    const li = document.createElement("li");
    li.setAttribute("class","post");
    li.setAttribute("data-id-post","");
    li.setAttribute("id",data.posts[i].id);
    ul.appendChild(li);

    // data-id-upvotes
    const divvote = document.createElement("div");
    divvote.setAttribute("class","vote");
    divvote.setAttribute("id","vote");
    li.appendChild(divvote);

    // upvote
    const up = document.createElement("i");
    up.setAttribute("class","fa fa-hand-o-up");
    up.setAttribute("id","up-arrow");
    divvote.appendChild(up);

    // show upvotes numbers
    const p = document.createElement("p");
    p.setAttribute("data-id-upvotes","");
    p.setAttribute("id","upvotes");
    p.setAttribute("class","upvotes");
    p.innerText = data.posts[i].meta.upvotes.length;
    divvote.appendChild(p);

    // downvote
    const down = document.createElement("i");
    down.setAttribute("class","fa fa-hand-o-down");
    down.setAttribute("id","down-arrow");
    divvote.appendChild(down);

    // post content
    const divcontent = document.createElement("div");
    divcontent.setAttribute("class","content");
    li.appendChild(divcontent);

    if (publicfeed == 1){
        find_upvoted_users(apiUrl,data.posts[i],divvote);
    }

    // data-id-title
    const h4 = document.createElement("h4");
    h4.setAttribute("data-id-title","");
    h4.setAttribute("class","post-title alt-text");
    h4.innerText = data.posts[i].title;
    divcontent.appendChild(h4);

    // post description text
    const ptext = document.createElement("p");
    ptext.setAttribute("class","post-text");
    ptext.setAttribute("data-id-text",data.posts[i].id);
    ptext.innerText = data.posts[i].text;
    divcontent.appendChild(ptext);

    // post-subseddit
    const subseddit = document.createElement("p");
    subseddit.setAttribute("class","post-subseddit");
    subseddit.setAttribute("data-id-subseddit","");
    subseddit.innerText = "   /s/" + data.posts[i].meta.subseddit;

    h4.appendChild(subseddit);

    // post-author and time
    const author = document.createElement("p");
    author.setAttribute("class","post-author");
    author.setAttribute("data-id-author",data.posts[i].meta.author);

    // compare time it was posted with current time
    const time = data.posts[i].meta.published;
    const when = compare_time(time);
    author.innerText = "Posted by " + data.posts[i].meta.author + " " + when;
    h4.appendChild(author);

    // post-image
    if (data.posts[i].image !== null){
      const pic = document.createElement("img");
      const picname = "data:image/jpeg;base64," + data.posts[i].image;
      pic.setAttribute("src",picname);
      pic.setAttribute("class","pic");
      pic.setAttribute("width","500");
      divcontent.appendChild(pic);
    }

    // post-comments
    const commentnumber = document.createElement("p");
    commentnumber.setAttribute("class","post-commentnumber");
    commentnumber.setAttribute("id","comment");
    commentnumber.setAttribute("data-id-comment",data.posts[i].id);
    if (data.posts[i].comments.length > 1){
      commentnumber.innerText = data.posts[i].comments.length + " Comments";
    } else if (data.posts[i].comments.length == 1){
      commentnumber.innerText = data.posts[i].comments.length + " Comment";
    } else {
      commentnumber.innerText = "Comment";
    }
    divcontent.appendChild(commentnumber);

    create_comments(data.posts[i],commentnumber);

  }

  if (window.localStorage.getItem('user')){
    create_pagination(ul,apiUrl);
  }

}

function create_pagination(f,apiUrl){
  const myToken = localStorage.getItem('user');
  const sys = {
    method : 'GET',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`,
    }
  };
  fetch(`${apiUrl}/user/feed/?p=0&n=500`,sys)
     .then(response => response.json())
     .then (r => {
       const post = r['posts'];
       post.sort(function(a,b){
        if(a.meta.published == b.meta.published)
            return 0;
        if(a.meta.published > b.meta.published)
            return -1;
        if(a.meta.published< b.meta.published)
            return 1;
       });
       const value = Math.ceil(r.posts.length/10);
       if (post.length > 10){
         const div = document.createElement("div");
         div.setAttribute("class","pagination");
         div.setAttribute("id","pagination");
         f.appendChild(div);


         const a = document.createElement("button");
         a.setAttribute("class","page-buttons");
         div.appendChild(a);

         const left = document.createElement("i");
         left.setAttribute("class","fa fa-angle-double-left");
         left.setAttribute("id","left-page");
         a.appendChild(left);

         const d = document.createElement("div");
         d.setAttribute("class","divider2");
         div.appendChild(d);
         create_page_button(div,1,value);
       }

     })

}

function create_page_button(div,num1,num2){
  let i = num1;
  for (i = num1;i <= num2; i++){
    let a = document.createElement("button");
    a.setAttribute("class","page-buttons");
    a.setAttribute("id","page");
    a.innerText = i;
    div.appendChild(a);

    let d = document.createElement("div");
    d.setAttribute("class","divider2");
    div.appendChild(d);
  }
  const a1 = document.createElement("button");
  a1.setAttribute("class","page-buttons");
  div.appendChild(a1);

  const right = document.createElement("i");
  right.setAttribute("class","fa fa-angle-double-right");
  right.setAttribute("id","right-page");
  a1.appendChild(right);
}

export function show_feed(apiUrl){
  if (! window.localStorage.getItem('user')){
    show_public_feed(apiUrl);
  } else {
    let pg = 0;
    show_user_feed(apiUrl,pg);
  }
}

export function show_public_feed(apiUrl){
  fetch(apiUrl + "/post/public")
     .then(response => response.json())
     .then (r => {
       const post = r['posts'];
       post.sort(function(a,b){
        if (a.meta.published == b.meta.published)
            return 0;
        if (a.meta.published > b.meta.published)
            return -1;
        if (a.meta.published< b.meta.published)
            return 1;
       });
       create_feed(apiUrl,r,0);

     })
}

export function show_user_feed(apiUrl,pg){
  let page = 0;
  if (pg == 1){
    page = 0;
  } else if (pg != 0){
    page = ((parseInt (pg)-1) * 10)+ 1;
  }

  const myToken = localStorage.getItem('user');

  const d = {
    method : 'GET',
    headers :{
      'Content-Type': 'application/json',
      'Authorization' : `Token ${myToken}`
    }
  };

  fetch(`${apiUrl}/user/feed/?p=${page}&n=10`,d)
     .then(response => response.json())
     .then (r => {
       const post = r['posts'];
       post.sort(function(a,b){
        if(a.meta.published == b.meta.published)
            return 0;
        if(a.meta.published > b.meta.published)
            return -1;
        if(a.meta.published< b.meta.published)
            return 1;
       });
       //if (post.length > 0){
         create_feed(apiUrl,r,1);
       //}
     })
}

export function refresh_homepage(){
  const root = document.getElementById("main");
  while (root.firstChild){
    root.removeChild(root.firstChild);
  }
}

function check_page_exist(num,but){
  let gotpage = 0;
  for (let i = 0;i < but.length;i++){
    if (but[i].innerText == num){
      gotpage = 1;
    }
  }
  return gotpage;
}

export function check_page(apiUrl,target){
  // pagination
  if (target.id == "page"){
    let pagenum = target.innerText;
    localStorage.setItem("page",pagenum);
    refresh_homepage();
    show_user_feed(apiUrl,pagenum);
  // go to right page
  } else if (target.id == "right-page"){
    const but = document.getElementsByClassName("page-buttons");
    // a page was clicked before
    if (localStorage.getItem("page")){
      const num = parseInt(localStorage.getItem("page")) + 1;
      if (check_page_exist(num,but) == 1){
        refresh_homepage();
        show_user_feed(apiUrl,num);
        localStorage.setItem("page",num);
      } else {
        alert("No more posts on feed");
      }
    // no page selected before when click right
    } else {
      if (check_page_exist(2,but) == 1){
        refresh_homepage();
        show_user_feed(apiUrl,2);
        localStorage.setItem("page",2);
      } else {
        alert("No more posts on feed");
      }

    }

  // go to  left page
  } else if (target.id == "left-page"){
    const but = document.getElementsByClassName("page-buttons");
    // a page was clicked before
    if (localStorage.getItem("page")){
      const num = parseInt(localStorage.getItem("page")) - 1;
      let gotpage = 0;
      if (num != 0){
        gotpage = check_page_exist(num,but);
      }
      if (gotpage == 1){
        refresh_homepage();
        show_user_feed(apiUrl,num);
        localStorage.setItem("page",num);
      } else {
        alert("You're on first page");
      }
    // no page selected before when click left
    } else {
      alert("You're on first page");
    }
  }
}
export default {create_feed,show_feed,show_user_feed,refresh_homepage,check_page};
