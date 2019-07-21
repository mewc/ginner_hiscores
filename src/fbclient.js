import firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.FB_APIKEY,
    authDomain: "theginnersgame.firebaseapp.com",
    databaseURL: "https://theginnersgame.firebaseio.com",
    projectId: "theginnersgame",
    storageBucket: "",
    messagingSenderId: "958377680084",
    appId: "1:958377680084:web:adae3871e93b9ed7"
};



firebase.initializeApp(firebaseConfig);


export const fbdb = firebase.database();
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
export default firebase;