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
                projectId: 'metal-tile-dev1'
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

        public static watchMap() {
            let landName = "world-default20170908-land-home";
            this.db.collection(landName)
                .onSnapshot(function(snapshot) {
                    snapshot.docChanges.forEach(function(change) {
                        //["projects","metal-tile-dev1","databases","(default)","documents","world-default20170908-land-home","row-049-col-024"] が入っている
                        let sl = change.doc.et.key.path.segments[6].split("-");
                        let row = parseInt(sl[1]);
                        let col = parseInt(sl[3]);
                        MetalTile.LandContoller.setMapChip(landName, row, col, change.doc.data());

                        if (change.type === "added") {
                            console.log("New : ", change.doc.data());
                        }
                        if (change.type === "modified") {
                            console.log("Modified : ", change.doc.data());
                        }
                        if (change.type === "removed") {
                            console.log("Removed : ", change.doc.data());
                        }
                    });
                });
        }
    }
}

