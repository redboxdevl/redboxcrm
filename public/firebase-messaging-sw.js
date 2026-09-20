// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDSZnEQH7g8vkfjCAAKUYQka-r6qpRJSVI",
    authDomain: "nextfactor-a9ba9.firebaseapp.com",
    projectId: "nextfactor-a9ba9",
    storageBucket: "nextfactor-a9ba9.appspot.com",
    messagingSenderId: "636773287179",
    appId: "1:636773287179:web:30fff1974f4a918b8fce0e",
    measurementId: "G-T6TCF1XJ0Q"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  // console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

return self.registration.showNotification(
    notificationTitle,
    notificationOptions);
});