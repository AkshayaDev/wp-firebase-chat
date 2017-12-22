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

	var userchathead = {
	  username: wp_user_object.username,
	  userimage: wp_user_object.userimage
	};

	console.log(wp_user_object.postid);

	firebase.database().ref("posts/" + wp_user_object.postid + "/chatheads/" + wp_user_object.user_id).set(userchathead);

	var samplechat = {
		to: wp_user_object.authorid,
		from: wp_user_object.user_id,
		message: 'hey'
	};

	firebase.database().ref("posts/" + wp_user_object.postid + "/userchats/" + wp_user_object.user_id + "/messages/").push(samplechat);	

});