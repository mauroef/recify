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

  getRecitalData(document) {
    return this.db
      .collection(document)
      .where('userId', '==', this.auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        let records = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            date: doc.data().date,
            bandId: doc.data().bandId,
            bandName: this.getNameById('bands', doc.data().bandId),
            placeId: doc.data().placeId,
            placeName: this.getNameById('places', doc.data().placeId),
            ticket: doc.data().ticket,
          };
        });

        return records;
      });
  }

  canBeDeleted(document, id) {
    return this.db
      .collection('recitals')
      .where('userId', '==', this.auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log('doc', document);
        let hasError = false;

        snapshot.docs.map((doc) => {
          let idReference =
            document === 'bands' ? doc.data().bandId : doc.data().placeId;
          if (idReference === id) {
            hasError = true;
            return;
          }
        });

        return hasError;
      });
  }

  getNameById(document, id) {
    return this.db
      .collection(document)
      .doc(id)
      .get()
      .then((docRef) => docRef.data().name);
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

  add(document, name, userId) {
    return this.db.collection(document).add({ name, userId });
  }

  addRecital(document, date, bandId, placeId, ticket, userId) {
    const bandRef = this.db.doc('bands/' + bandId);
    const placeRef = this.db.doc('places/' + placeId);

    return this.db
      .collection(document)
      .add({ date, bandId, bandRef, placeId, placeRef, ticket, userId });
  }

  update(document, id, name) {
    return this.db.collection(document).doc(id).update({ name });
  }

  delete(document, id) {
    return this.canBeDeleted(document, id).then((hasError) => {
      return hasError
        ? false
        : this.db
            .collection(document)
            .doc(id)
            .delete()
            .then(() => true);
    });
  }

  static getFireDoc(tbodySel) {
    let document;

    switch (tbodySel) {
      case 'band-data':
        document = 'bands';
        break;
      case 'place-data':
        document = 'places';
        break;
      case 'recital-data':
        document = 'recitals';
        break;
      default:
        console.warn('unrecheable selector');
    }

    return document;
  }
}
