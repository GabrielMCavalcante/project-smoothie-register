import firebase from 'firebase';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyALYb35ky7u2aU1Vkpi30fLmsWDknZr-MM",
    authDomain: "vuejs-project-ninja-smoothies.firebaseapp.com",
    databaseURL: "https://vuejs-project-ninja-smoothies.firebaseio.com",
    projectId: "vuejs-project-ninja-smoothies",
    storageBucket: "vuejs-project-ninja-smoothies.appspot.com",
    messagingSenderId: "196942581121",
    appId: "1:196942581121:web:483db4ccaa6bdfe8c1ac80"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();