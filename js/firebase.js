import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5dOXiHhnaA70nouyFOk5i9K3nqxf8RaI",
  authDomain: "brilliant-heart-project.firebaseapp.com",
  projectId: "brilliant-heart-project",
  storageBucket: "brilliant-heart-project.firebasestorage.app",
  messagingSenderId: "334354598755",
  appId: "1:334354598755:web:e0c52b027eab127ebee156"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);