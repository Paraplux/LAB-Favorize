import * as firebase from 'firebase'


//* Fix for firestore
import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }


//* Initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyDVQBrlJU9fX7tep44YVsw6QIjtQJ_FMaE",
    authDomain: "favorize-ce75f.firebaseapp.com",
    databaseURL: "https://favorize-ce75f.firebaseio.com",
    projectId: "favorize-ce75f",
    storageBucket: "favorize-ce75f.appspot.com",
    messagingSenderId: "55498240072",
    appId: "1:55498240072:web:3c0f9e70e5d239f97ca87d",
    measurementId: "G-FYJ14ENW7D"
}

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()