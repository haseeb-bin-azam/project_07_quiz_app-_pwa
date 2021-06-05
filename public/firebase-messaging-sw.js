// Your web app's Firebase configuration
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js');

  const firebaseConfig = {
    apiKey: "AIzaSyBENORa-4PVBvWfS7tIyoUmSkd2tSJnxcg",
    authDomain: "pushnotification-55472.firebaseapp.com",
    projectId: "pushnotification-55472",
    storageBucket: "pushnotification-55472.appspot.com",
    messagingSenderId: "620122700727",
    appId: "1:620122700727:web:618077241043466053c632"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.messaging();
//
