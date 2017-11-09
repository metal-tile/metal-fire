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

        public static updateLandTile(row : number, col : number, chip : number) {
            let landName = "world-default20170908-land-home";
            let docID = "row-" + ("000" + row).substr(-3) + "-col-" + ("000" + col).substr(-3);
            console.log(docID);
            this.db.collection(landName).doc(docID).update({
                chip: chip,
                hitPoint: 1000
            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }

        public static watchMap() {
            let landName = "world-default20170908-land-home";
            this.db.collection(landName)
                .onSnapshot(function(snapshot) {
                    snapshot.docChanges.forEach(function(change) {
                        let keyNamePosition;
                        if (change.doc.metadata.hasPendingWrites) {
                            // Local
                            //["world-default20170908-land-home","row-049-col-024"] が入っている
                            keyNamePosition = 1;
                        } else {
                            // Server
                            //["projects","metal-tile-dev1","databases","(default)","documents","world-default20170908-land-home","row-049-col-024"] が入っている
                            keyNamePosition = 6;
                        }
                        let sl = change.doc.et.key.path.segments[keyNamePosition].split("-");
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

