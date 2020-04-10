import firebase from 'firebase';

import config from '../config/firebase.config';

export default class Firebase {
  constructor() {
    this.instace = firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.db = firebase.firestore();
    this.func = firebase.functions();
  }

  isAuthenticated(user) {
    return user !== null ? true : false;
  }

  logIn() {
    return this.auth
      .signInWithPopup(this.provider)
      .then(function (result) {
        console.log('logged successfully.');
      })
      .catch(function (error) {
        console.log(`error on login. code: ${error.code}. ${error.message}`);
      });
  }

  logout() {
    return this.auth
      .signOut()
      .then(() => {
        console.log('deslogueado.');
      })
      .catch((ex) => {
        console.log('error al desloguear: ', ex);
      });
  }

  getData(document) {
    return this.db
      .collection(document)
      .orderBy('name')
      .get()
      .then((snapshot) => {
        let records = snapshot.docs.map((doc) => {
          return { id: doc.id, name: doc.data().name };
        });
        return records;
      });
  }

  getRealtimeData(document) {
    let records = [];

    this.db.collection(document).onSnapshot((snapshot) => {
      //clear table...
      snapshot.docChanges().forEach((change) => {
        records.push({ id: change.doc.id, name: change.doc.data().name });
      });
    });

    return records;
  }

  add(document, name, owner) {
    return this.db.collection(document).add({ name, owner });
  }

  update(document, id, name) {
    return this.db.collection(document).doc(id).update({ name });
  }

  delete(document, id) {
    return this.db.collection(document).doc(id).delete();
  }
}
