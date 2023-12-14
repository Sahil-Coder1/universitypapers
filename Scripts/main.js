 
    // Initialize Firebase
    var config = {
     apiKey: "AIzaSyDvcAuBZR-3AVaH4hdJlU_p_L8cWgIbA0o",
  authDomain: "universitypapersfree.firebaseapp.com",
  databaseURL: "https://universitypapersfree-default-rtdb.firebaseio.com",
  projectId: "universitypapersfree",
  storageBucket: "universitypapersfree.appspot.com",
  messagingSenderId: "56567360102",
  appId: "1:56567360102:web:e156e30fe0b21dcd7e1ba7",
  measurementId: "G-2F82CY0YH7"
        
    };
    firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	  
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("lg-in").style.display = "none";
	document.getElementById("lg-out").style.display = "block";
    document.getElementById("up").style.display = "block";
    document.getElementById("up").style.background="#2196f3";
	document.getElementById("up").style.color  ="#ffffff";
    document.getElementById("show-fl").style.display = "block";
     document.getElementById("listData").style.display = "none";	
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }
                                                               
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("lg-in").style.display = "block"; 
	document.getElementById("lg-in").style.background="#2196f3";
		document.getElementById("lg-in").style.color  ="#ffffff";
	document.getElementById("lg-out").style.display = "none";
    document.getElementById("up").style.display = "none";
       document.getElementById("show-fl").style.display = "none";
 document.getElementById("listData").style.display = "none";

  }
});

function log(){
firebase.auth().signOut();
}
function up(){

document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
     document.getElementById("listData").style.display = "none";
    document.getElementById("listData").style.display = "none";
    document.getElementById("show-fl").style.background="#e5e5e5";
document.getElementById("show-fl").style.color  ="silver";
    document.getElementById("up").style.background="#2196f3";
document.getElementById("up").style.color  ="#ffffff";	

}

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
    // ...
  });

}

function signUp(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

 firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
       // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
     window.alert("Error : " + errorMessage);
    // ..
  });
}

function logout(){
  firebase.auth().signOut();
}
    var files = [];
document.getElementById("files").addEventListener("change", function(e) {
  files = e.target.files;
   
  for (var i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

document.getElementById("send").addEventListener("click", function() {
  //checks if files are selected
  if (files.length != 0) {
    //Loops through all the selected files
    for (var i = 0; i < files.length; i++) {
      //create a storage reference
      var storage = firebase.storage().ref("Files/"+files[i].name);

      //upload file
      var upload = storage.put(files[i]);

      //update progress bar
      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("progress").value = percentage;
        },

        function error() {
          alert(error.log);
        },

        function complete() {
          document.getElementById(
            "uploading"
          ).innerHTML += `${files[i].name} upoaded <br />`;
			    var downloadURL = upload.snapshot.downloadURL;
			SendMessage(downloadURL);
			 console.log(downloadURL);
	  
        }
      );
    }
  } else {
    alert("No file chosen");
  }
});

 
function SendMessage(url) {
	
	
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	      var uid = user.uid;
  }else{
  }
  
	var chatKey = uid;
    var chatMessage = {
       
        msg: document.getElementById('txtFile').value,
        msgType: 'normal',
        URL:url
    };

    firebase.database().ref('Server').push(chatMessage, function (error) {
        if (error) 
			alert(error);
        else {
			alert("success");
		}
	});
});						
  }
////DATA LISTING HERE 

	var commentsRef = firebase.database().ref('Server');
commentsRef.on('child_added', (data) => {
	document.getElementById('lstChat').innerHTML += `<li class="list">
<div class="data">
               <img src="${data.val().URL}" class="circle"/>
          <div class="name">${data.val().msg}</div></div>
                        </li>`;
	
});
 
///////bvdjD////

function show(){
   document.getElementById("listData").style.display = "block"; 
document.getElementById("login_div").style.display = "none";
document.getElementById("user_div").style.display = "none";
document.getElementById("show-fl").style.background="#2196f3";
document.getElementById("show-fl").style.color  ="#ffffff";	
document.getElementById("up").style.background="#e5e5e5";
document.getElementById("up").style.color  ="silver";	
    

}
