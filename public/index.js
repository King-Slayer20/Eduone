var fireBase = fireBase || firebase;
var hasInit = false;
var firebaseConfig = {
    apiKey: "AIzaSyAt9sUiieYtG9jeneqDUbFH99EECcF-tyk",
    authDomain: "eduone-project.firebaseapp.com",
    projectId: "eduone-project",
    storageBucket: "eduone-project.appspot.com",
    messagingSenderId: "638627943900",
    appId: "1:638627943900:web:ded706ee5d9d298e232b19",
    measurementId: "G-E47C0X499X"
  };
  if(!hasInit){
    firebase.initializeApp(firebaseConfig);
    hasInit = true;
}

 
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // signup function
  function signUp () {
    // Get all our input fields
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var full_name = document.getElementById("full_name")
    //Validate input fields
    if (check_email(email) == false) {
      alert('Incorrect Email, try again!!')
      return
    }
    // Validate input fields
    if (check_password(password) == false) {
      alert('Password is too short!!')
      return
    }
    auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(function() {
      var user = auth.currentUser
      var database_ref = database.ref()
      var user_data = {
        email : email.value,
        full_name : full_name.value,
        last_login : Date.now()
      }
      database_ref.child('users/' + user.uid).set(user_data)
      auth.signInWithEmailAndPassword(email.value, password.value)
      alert("sign up successful")
      location.replace('/landing.html')
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
      alert(error_message)
    })
  }
  
  //login function
  function login () {
    // Get all our input fields
    var email = document.getElementById("email")
    var password = document.getElementById("password")
  
    //Validate input fields
    if (check_email(email) == false) {
      alert('Incorrect Email, try again!!')
      return
    }
    if (check_password(password) == false) {
      alert('Password is too short!!')
      return
    }
    auth.signInWithEmailAndPassword(email.value, password.value)
    .then(function() {
      var user = auth.currentUser
      var database_ref = database.ref()
      var user_data = {
        last_login : Date.now()
      }
      database_ref.child('users/' + user.uid).update(user_data)
      alert("login successful")
      location.replace('/landing.html')
  
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
      alert(error_message)
    })
  }

  function signOut(){
    auth.signOut();
    alert("You have Successfully signed out from the System");
    location.replace('/index.html')
  }
  
  
  // firebase.auth().onAuthStateChanged((user)=>{
  //   if(user){
  //     var email = user.email;
  //     alert("Active user "+email);

  //   }else{
  //     alert("No Active user Found")
  //   }
  // })
  
  //Validate Functions
  function check_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email.value) == true) {
      return true
    } else {
      return false
    }
  }
  
  function check_password(password) {
    if (password.value < 6) {
      return false
    } else {
      return true
    }
  }
  
  function check_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }