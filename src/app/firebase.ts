export const FIRESEBASE_CONFIG = {
    apiKey: "AIzaSyCIVM9Ne5FPTI_3OG69Zwc1Rl805740Fso",
    authDomain: "loveakot-11975.firebaseapp.com",
    projectId: "loveakot-11975",
    storageBucket: "loveakot-11975.appspot.com",
    messagingSenderId: "1337526926",
    appId: "1:1337526926:web:b6815dc12c6b6cda9217df",
    measurementId: "G-WF6SE7RZB5"
  };

  export const snapshotToArray = snapshot =>{
    let returnArray = [];
    snapshot.forEach(element => {
      let item = element.val();
      item.key = element.key;
      returnArray.push(item);
    });
    return returnArray;
  }