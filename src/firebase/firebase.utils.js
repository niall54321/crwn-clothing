import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBDzVJy2DXC0MQGBZJyREWl74GGb7_JS0s",
    authDomain: "crwn-clothing-db-7b4fc.firebaseapp.com",
    projectId: "crwn-clothing-db-7b4fc",
    storageBucket: "crwn-clothing-db-7b4fc.appspot.com",
    messagingSenderId: "263351715918",
    appId: "1:263351715918:web:0639cd8f772fcd70f1db1f",
    measurementId: "G-0DVZB4YRHZ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Auth

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

// Twitter Auth

const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const SignInWithTwitter = () => auth.signInWithPopup(providerTwitter);


export default firebase;
