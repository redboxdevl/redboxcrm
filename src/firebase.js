import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDSZnEQH7g8vkfjCAAKUYQka-r6qpRJSVI",
    authDomain: "nextfactor-a9ba9.firebaseapp.com",
    projectId: "nextfactor-a9ba9",
    storageBucket: "nextfactor-a9ba9.appspot.com",
    messagingSenderId: "636773287179",
    appId: "1:636773287179:web:30fff1974f4a918b8fce0e",
    measurementId: "G-T6TCF1XJ0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
export const requestForToken = (setData) => {
    return getToken(messaging, { vapidKey: "BFXZ-lFEv_5NncQ6JnzUKanAGQwWNCj_Va7RsUhr-9XmOowYDZtmUoWr1rdzGZwIxZ11C-x9zThMPKtdG2SOBGQ" })
      .then((currentToken) => {
        if (currentToken) {
          // console.log('current token for client: ', currentToken);
          setData(currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };


  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });