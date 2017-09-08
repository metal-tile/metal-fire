namespace MetalTile {
    export class Firestore {

        static initializeApp : boolean;
        static db : any;
        static id : string;

        public static initialize(id : string) {
            if (this.initializeApp) {
                return;
            }

            firebase.initializeApp({
                apiKey: 'AIzaSyBpU_0jiRRwU_cORczIBeMPmOiZtUhct4w',
                authDomain: 'metal-tile-dev1.firebaseapp.com',
                projectId: 'metal-tile-dev1',
        
                firestoreOptions: {
                    // Enable offline support
                    persistence: false
                },
            });

            // Initialize Cloud Firestore through firebase
            this.db = firebase.firestore();
            this.id = id;
            this.initializeApp = true;
        }

        public static updatePlayerPosition(x : number, y : number) {
            this.db.collection("world-default-player-position").doc(this.id).set({
                x : x,
                y : y,
            })
                .then(function () {
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
    }
}

