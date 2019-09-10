export function compare_time(time){
  let currdate = new Date();
  const curryear = currdate.getFullYear();
  const currmonth = currdate.getMonth();
  const currday = currdate.getDate();
  const currhours = currdate.getHours();
  const currminutes = currdate.getMinutes();
  const currseconds = currdate.getSeconds();

  //const curr
  let postdate = new Date(time*1000);
  const postyear = postdate.getFullYear();
  const postmonth = postdate.getMonth();
  const postday = postdate.getDate();
  const posthours = postdate.getHours();
  const postminutes = postdate.getMinutes();
  const postseconds = postdate.getSeconds();
  let when = "";
  if (curryear != postyear){
    when = curryear-postyear + " years ago"
  } else if (currmonth != postmonth){
    when = Math.abs(currmonth-postmonth) + " months ago";
    if (Math.abs(currmonth-postmonth) == 1){
      when = Math.abs(currmonth-postmonth) + " month ago";
    }
  } else if (currday != postday){
    when = Math.abs(currday-postday) + " days ago"
    if (Math.abs(currday-postday) == 1){
      when = Math.abs(currday-postday) + " day ago";
    }
  } else if (currhours != posthours){
    when = Math.abs(currhours-posthours) + " hours ago"
    if (Math.abs(currhours-posthours) == 1){
      when = Math.abs(currhours-posthours) + " hour ago";
    }
  } else if (currminutes != postminutes){
    when = Math.abs(currminutes-postminutes) + " minutes ago"
    if (Math.abs(currminutes-postminutes) == 1){
      when = Math.abs(currminutes-postminutes) + " minute ago";
    }
  } else if (currseconds != postseconds){
    when = Math.abs(currseconds-postseconds) + " seconds ago"
    if (Math.abs(currseconds-postseconds) == 1){
      when = Math.abs(currseconds-postseconds) + " second ago";
    }
  }
  return when;
}

export default compare_time
