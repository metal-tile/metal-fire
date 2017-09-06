declare var firebase : any;

firebase.initializeApp({
    apiKey: 'AIzaSyBpU_0jiRRwU_cORczIBeMPmOiZtUhct4w',
    authDomain: 'metal-tile-dev1.firebaseapp.com',
    projectId: 'metal-tile-dev1',

    firestoreOptions: {
        // Enable offline support
        persistence: true
    },
});

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

// Add a new document in collection "cities" with ID "DC"
db.collection("cities").doc("TS").set({
    name: "Washington D.C.",
    weather: "politically stormy"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

// watchしている箇所を自分で書き換えた場合、2回onSnapshot()が呼ばれる
(function() {
    db.collection("cities").doc("SF")
        .onSnapshot(function(doc) {
            console.log("Current data: ", doc && doc.data());
        });

    // After 2 seconds, make an update so our listener will fire again.
    setTimeout(function() {
        db.collection("cities").doc("SF").update({ population: 999999 });
    }, 2000);

    // RESULT:
    // Current data: {name: "San Francisco", population: 864816, state: "CA"}
    //
    // Current data: {name: "San Francisco", population: 999999, state: "CA"}
    // Current data: {name: "San Francisco", population: 999999, state: "CA"}
})();

// 自分で更新した時は最初にPendingWrites = "Local"でイベントが飛んでくる。
// その後、Serverへの反映が完了したら、PendingWrites = "Server"のイベントが飛んでくる。
(function() {
    db.collection("cities").doc("NFC")
        .onSnapshot(function(doc) {
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ", doc && doc.data());
        });

    // After 2 seconds, make an update so our listener will fire again.
    setTimeout(function() {
        db.collection("cities").doc("SF").update({ population: 1000000 });
    }, 2000);

    // RESULT:
    // Server data: {name: "San Francisco", population: 999999, state: "CA"}
    //
    // Local data: {name: "San Francisco", population: 1000000, state: "CA"}
    // Server data: {name: "San Francisco", population: 1000000, state: "CA"}
});