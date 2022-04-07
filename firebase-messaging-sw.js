// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCOcno9GzgxOBx8JteJCumgkukjq0IXWQI",
    authDomain: "tunelator-e7820.firebaseapp.com",
    projectId: "tunelator-e7820",
    storageBucket: "tunelator-e7820.appspot.com",
    messagingSenderId: "19814274732",
    appId: "1:19814274732:web:02a7bddbba142e991b3109",
    measurementId: "G-W5QDTRYNQ8"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Message received. ', payload);
});
