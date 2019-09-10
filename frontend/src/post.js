import {create_feed,show_feed,refresh_homepage,check_page} from './feed.js';

export function make_post(){
  const post = document.getElementById("feed");

  const m = document.createElement("div");
  m.setAttribute("id","make-post");
  m.style.display = "none";
  post.appendChild(m);

  const br = document.createElement("br");
  m.appendChild(br);

  const f = document.createElement("form");
  m.appendChild(f);

  const d1 = document.createElement("div");
  d1.setAttribute("class","divider1");
  f.appendChild(d1);

  const input = document.createElement("input");
  input.setAttribute ("id","new-post-title");
  input.setAttribute ("placeholder","Enter post title");
  input.setAttribute ("class","form-input");
  f.appendChild(input);

  const d2 = document.createElement("div");
  d2.setAttribute("class","divider1");
  f.appendChild(d2);

  const text = document.createElement("textarea");
  text.setAttribute("class","textarea");
  text.setAttribute ("placeholder","What's on your mind?");
  text.setAttribute("id","new-post-text");
  text.maxLength = "5000";
  text.cols = "80";
  text.rows = "10";
  f.appendChild(text);

  const d3 = document.createElement("div");
  d3.setAttribute("class","divider1");
  f.appendChild(d3);

  const sub = document.createElement("input");
  sub.setAttribute ("id","new-post-subseddit");
  sub.setAttribute ("placeholder","Enter subseddit");
  sub.setAttribute ("class","form-input");
  f.appendChild(sub);

  const d4 = document.createElement("div");
  d4.setAttribute("class","divider1");
  f.appendChild(d4);

  const image = document.createElement("input");
  image.setAttribute("type","file");
  image.setAttribute("id","image-button");
  f.appendChild(image);

  const dv = document.createElement("div");
  dv.setAttribute("class","divider1");
  f.appendChild(dv);

  const div1 = document.createElement("div");
  div1.setAttribute("id","new-post-buttons")
  div1.style.display = "none";
  post.appendChild(div1);


  const postbtn = document.createElement("button");
  postbtn.setAttribute ("id","submit-button");
  postbtn.setAttribute ("type","button");
  postbtn.setAttribute ("class","button button-post");
  postbtn.innerText = "Submit";
  div1.appendChild(postbtn);

  const d = document.createElement("div");
  d.setAttribute("class","divider");
  div1.appendChild(d);

  const cancelbtn = document.createElement("button");
  cancelbtn.setAttribute ("id","cancel-button");
  cancelbtn.setAttribute ("type","button");
  cancelbtn.setAttribute ("class","button button-post");
  cancelbtn.innerText = "Cancel";
  div1.appendChild(cancelbtn);

}

export function submit_post(apiUrl){
  let p = 0;
  if (localStorage.getItem("pic")){
    localStorage.removeItem("pic")
    p = 1;
  }

  const title = document.getElementById("new-post-title").value;
  const text = document.getElementById("new-post-text").value;
  const sub = document.getElementById("new-post-subseddit").value;

  // rmb add image
  const myToken = localStorage.getItem('user');
  // upload new post with image
  if (p == 1){
      let file    = document.querySelector('input[type=file]').files[0];
      //Function that returns a promise to read the file
      const reader = (file) => {
          return new Promise((resolve, reject) => {
              const fileReader = new FileReader();
              fileReader.onload = () => resolve(fileReader.result);
              fileReader.readAsDataURL(file);
          });
      }
      //const readFile = (file) => {
      reader(file).then(result => {
        const img = result.replace("data:image/png;base64,", "");
        const d = {
          method : 'POST',
          headers :{
            'Content-Type': 'application/json',
            'Authorization' : `Token ${myToken}`,
          },
          body: JSON.stringify({
            'title': title,
            'text': text,
            'subseddit' :sub,
            'image':img
          })
        };
        fetch(`${apiUrl}/post/`,d)
         .then(response => {
           if (response.status === 200){
              display_post_box("hide");
              alert ("Post uploaded successfully!");
              //window.localStorage.removeItem("imageUrl");
              refresh_homepage();
              show_feed(apiUrl);
            } else if(response.status === 400){
                alert("Please fill up title and text");
            }
          })
      });
  } else {
    const d = {
      method : 'POST',
      headers :{
        'Content-Type': 'application/json',
        'Authorization' : `Token ${myToken}`,
      },
      body: JSON.stringify({
        'title': title,
        'text': text,
        'subseddit' :sub
      })
    };
    fetch(`${apiUrl}/post/`,d)
     .then(response => {
       if (response.status === 200){
          display_post_box("hide");
          alert ("Post uploaded successfully!");
          refresh_homepage();
          show_feed(apiUrl);
        } else if(response.status === 400){
            alert("Please fill up title and text");
        }
      })
  }

}

export function display_post_box(bool){
  const div1 = document.getElementById("new-post-buttons");
  const m = document.getElementById("make-post");
  if (bool == "show"){
    div1.style.display = "block";
    m.style.display = "block";
  } else {
    div1.style.display = "none";
    m.style.display = "none";
  }

}

export function check_post(apiUrl,target){
  if (target.id == "post"){
    display_post_box("show");
  } else if (target.id == "cancel-button"){
    display_post_box("hide");
  } else if (target.id == "submit-button"){
     submit_post(apiUrl);
  } else if (target.id == "image-button"){
    window.localStorage.setItem("pic", "yes");
  }
}
export default {make_post,display_post_box,submit_post,check_post};
