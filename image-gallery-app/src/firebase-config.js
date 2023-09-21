import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDckPoHWO0mF3OjktifIxLjPwTyFXu_9QU",
    authDomain: "image-gallery-b9e16.firebaseapp.com",
    projectId: "image-gallery-b9e16",
    storageBucket: "image-gallery-b9e16.appspot.com",
    messagingSenderId: "16082611096",
    appId: "1:16082611096:web:924942e40e023ba85b19ed"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
