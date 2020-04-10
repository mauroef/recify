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
      .get()
      .then((snapshot) => {
        let records = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            date: doc.data().date,
            band: this.getNameById('bands', doc.data().bandId.id),
            place: this.getNameById('places', doc.data().placeId.id),
            ticket: doc.data().ticket,
          };
        });

        return records;
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

  addRecital(document, date, bandIdRef, placeIdRef, ticket, userId) {
    const bandId = this.db.doc('bands/' + bandIdRef);
    const placeId = this.db.doc('places/' + placeIdRef);

    return this.db
      .collection(document)
      .add({ date, bandId, placeId, ticket, userId });
  }

  update(document, id, name) {
    return this.db.collection(document).doc(id).update({ name });
  }

  delete(document, id) {
    return this.db.collection(document).doc(id).delete();
  }

  // checkReferenceOnRecitalDoc(id) {
  //   return this.db
  //     .collection('recitals')
  //     .doc(id)
  //     .get()
  //     .then((docRef) => {
  //       if (docRef.exists) {
  //         console.log('existe');
  //       } else {
  //         console.log('hice cagada');
  //       }
  //     });
  // }

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
