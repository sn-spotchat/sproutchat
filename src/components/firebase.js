import firebase from 'firebase';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpwoGzL4fMhn-tAFL-QdAIdjhZQTYtD-A",
    authDomain: "sproutchat-621ee.firebaseapp.com",
    databaseURL: "https://sproutchat-621ee.firebaseio.com",
    projectId: "sproutchat-621ee",
    storageBucket: "sproutchat-621ee.appspot.com",
    messagingSenderId: "1021862560660",
    appId: "1:1021862560660:web:bf2299cec2f198d0cb0581",
    measurementId: "G-E4KZWMCGW7"
  };
  
  firebase.initializeApp(firebaseConfig); //firebase 초기화
  
  const firestore = firebase.firestore(); //store 사용
  
  export { firestore };