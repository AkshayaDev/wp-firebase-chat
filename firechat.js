jQuery(document).ready(function(){

var appconfig = {
  apiKey: "AIzaSyAkmGmwxZ7m4Hcy7AaxG8keWkOtkKStDLg",
  authDomain: "classifiedfire-65c90.firebaseapp.com",
  databaseURL: "https://classifiedfire-65c90.firebaseio.com",
  projectId: "classifiedfire-65c90",
  storageBucket: "classifiedfire-65c90.appspot.com",
  messagingSenderId: "10449445233"
};

if(!firebase.apps.length) {
    firebase.initializeApp(appconfig);
}

var messages = firebase.database().ref('posts');

if(wp_object.user_posts) {
jQuery.each(wp_object.user_posts, function( i, val ) {
  var newpost = {
    postname: val,
    authorid: wp_object.user_id,
    authorname: wp_object.fullname,
    authorimage: wp_object.userimage
  };

firebase.database().ref('posts/' + i).set(newpost);

var authorchathead = {
      username: wp_object.username,
      userimage: wp_object.userimage
};

//firebase.database().ref("posts/" + i + "/chatheads/" + wp_object.user_id).set(authorchathead);

  });
}

var samplechat = {
    to: "1",
    from: wp_object.user_id,
    message: 'how can i help you?'
  };

//firebase.database().ref("posts/1178/userchats/1/messages/").push(samplechat);

// pulling data from firedb posts
messages.once("value", function(data) {
  data.forEach(function(childdata) {
    var userpost = childdata.val();
    console.log(childdata.val());
    jQuery('<li><a href="#" data-identifier="'+childdata.key+'" class="list-group-item list-group-item-success">'+userpost.postname+'</a></li>').appendTo('#authorposts');
  });
});

/* Rules Backup
{
  "rules" : {
    ".read": true,
      "posts": {
      "$postid": {
        ".read": true,
        ".write": "!data.exists()",
          "chatheads": {
            ".read": true,
            ".write": true,
          },
          "userchats": {
            ".read": true,
            ".write": true,
          }
      }
    }
  }
}
*/

});