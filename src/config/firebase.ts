import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCOcno9GzgxOBx8JteJCumgkukjq0IXWQI",
    authDomain: "tunelator-e7820.firebaseapp.com",
    projectId: "tunelator-e7820",
    storageBucket: "tunelator-e7820.appspot.com",
    messagingSenderId: "19814274732",
    appId: "1:19814274732:web:02a7bddbba142e991b3109",
    measurementId: "G-W5QDTRYNQ8"
};

export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging();
