// Import the functions you need from the SDKs you need
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB4LV9NGbf0Oag6q15NQDQErRMRfj7gVQ",
  authDomain: "waldo-224bf.firebaseapp.com",
  databaseURL: "https://waldo-224bf-default-rtdb.firebaseio.com",
  projectId: "waldo-224bf",
  storageBucket: "waldo-224bf.appspot.com",
  messagingSenderId: "1094859936525",
  appId: "1:1094859936525:web:2d800ee239f6a845671644",
  measurementId: "G-Y1S77EB5B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
