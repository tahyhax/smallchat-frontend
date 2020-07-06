import firebase from "@/plugins/firebase";

const firebaseLogin = async (email, password) => {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return data;
  } catch (error) {

    return Promise.reject(error);
  }
};

const firebaseLogout = async () => {
  try {
    const data = await firebase.auth().signOut();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const firebaseSingUp = async (email, password) => {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const firebaseResetPassword = async () => {
  try {
    // const data = await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    return Promise.reject(error);
  }
};
const getUserIdToken = async () => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  firebaseLogin,
  firebaseLogout,
  firebaseSingUp,
  firebaseResetPassword,
  getUserIdToken,
};
