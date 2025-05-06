import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKtaIIPZ7W7G-Qb69L1MwtJBMxhvWHis8",
    authDomain: "myphone-ca16c.firebaseapp.com",
    projectId: "myphone-ca16c",
    storageBucket: "myphone-ca16c.firebasestorage.app",
    messagingSenderId: "334987201723",
    appId: "1:334987201723:web:41eea46392f5e69c0fad9e",
    measurementId: "G-RF4EV2FYK2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in function
document.getElementById('signInWithGoogleBtn').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result.user);
            window.location.href = "../html/index.html";
        })
        .catch((error) => {
            console.error(error);
        });
});

document.getElementById('signInBtn').addEventListener('click', () => {
    const userName = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "" || password === "" || userName === "") {
        alert("Please enter your details.");
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        console.log("Userrrr = "+userCredential);  
        window.location.href = "../html/index.html"; 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + "\n" + errorMessage);
    
    console.log(errorCode + "\n" + errorMessage);
  });
    }
    
});

// Sign out function
// document.getElementById('signOutBtn').addEventListener('click', () => {
//     signOut(auth).then(() => {
//         console.log('User signed out');
//     }).catch((error) => {
//         console.error(error);
//     });
// });

// Listen to authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('whenSignedIn').hidden = false;
        document.getElementById('whenSignedOut').hidden = true;
        document.getElementById('userDetails').textContent = `Hello, ${user.displayName}. Your UID is: ${user.uid}`;
    } else {
        document.getElementById('whenSignedIn').hidden = true;
        document.getElementById('whenSignedOut').hidden = false;
    }
});

function clearData() {
    localStorage.clear();
}

window.onload = clearData;