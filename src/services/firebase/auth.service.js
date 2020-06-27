import firebase from "@/plugins/firebase";

const firebaseLogin = async (email, password) => {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return data;
  } catch (error) {
    console.log("444");

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

export { firebaseLogin, firebaseLogout };
