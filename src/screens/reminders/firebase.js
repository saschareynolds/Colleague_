import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyCWNWp758fiwgbPZOfGAfTerYYTzjJ5yoc",
    authDomain: "silent-caster-209921.firebaseapp.com",
    databaseURL: "https://silent-caster-209921.firebaseio.com",
    projectId: "silent-caster-209921",
    storageBucket: "silent-caster-209921.appspot.com",
    messagingSenderId: "703880136834"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export default firebase;
