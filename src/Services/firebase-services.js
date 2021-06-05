import firebase from 'firebase';

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

const messaging = firebase.messaging();

export function configureNotification() {
  Notification.requestPermission().then((permission) => {
    console.log(permission);
    if( permission === 'granted' ) {
      messaging.getToken().then((currentToken) => {
        if (currentToken) {
          console.log('token : ', currentToken);
        }
        else {
          console.log('No registration token available. Request permission to generate one.');
        }
    })
  }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  })
}
