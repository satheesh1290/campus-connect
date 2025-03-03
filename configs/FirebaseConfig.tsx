// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwRffHKQPsmkQhW55e85e2gt9HcY7oIeA",
  authDomain: "college-campus-48388.firebaseapp.com",
  projectId: "college-campus-48388",
  storageBucket: "college-campus-48388.firebasestorage.app",
  messagingSenderId: "161997114748",
  appId: "1:161997114748:web:574d0b8872ec1783d1e8f9",
  measurementId: "G-RDB8CLXGKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// const analytics = getAnalytics(app);
