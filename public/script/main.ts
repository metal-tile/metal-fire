/// <reference path="config.ts" />

declare var firebase: any;
declare var phina: any;
declare var Label: any;
declare var GameApp: any;
declare var Sprite: any;

// phina.js をグローバル領域に展開
phina.globalize();

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function () {
        this.superInit();

        // マップ
        this.bg = Sprite("ground").addChildTo(this);
        this.bg.setPosition(0, 0);
        this.bg.origin.set(0, 0); // 左上基準に変更

        this.bg1 = Sprite("ground").addChildTo(this);
        this.bg1.setPosition(MetalTile.GameConfig.CHIP_SIZE * 1, 0);
        this.bg1.origin.set(0, 0); // 左上基準に変更

        this.player = Sprite("player", 32, 48).addChildTo(this);
        this.player.setPosition(MetalTile.GameConfig.SCREEN_WIDTH / 2, MetalTile.GameConfig.SCREEN_HEIGHT / 2);
        this.player.origin.set(0, 0); // 左上基準に変更
        this.player.frameIndex = 0;
    },

    update: function (app) {
        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            this.player.frameIndex++;
            if (this.player.frameIndex > 12) {
                this.player.frameIndex = 0;
            }
        }
    }
});

// メイン処理
phina.main(function () {
    var app = GameApp({
        startLabel: 'main', // メインシーンから開始する
        width: MetalTile.GameConfig.SCREEN_WIDTH,
        height: MetalTile.GameConfig.SCREEN_HEIGHT,
        assets: MetalTile.GameConfig.ASSETS
    });

    app.enableStats();
    app.run();
});

function startFirestore() {
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
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

    // watchしている箇所を自分で書き換えた場合、2回onSnapshot()が呼ばれる
    (function () {
        db.collection("cities").doc("SF")
            .onSnapshot(function (doc) {
                console.log("Current data: ", doc && doc.data());
            });

        // After 2 seconds, make an update so our listener will fire again.
        setTimeout(function () {
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
    (function () {
        db.collection("cities").doc("NFC")
            .onSnapshot(function (doc) {
                var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                console.log(source, " data: ", doc && doc.data());
            });

        // After 2 seconds, make an update so our listener will fire again.
        setTimeout(function () {
            db.collection("cities").doc("SF").update({ population: 1000000 });
        }, 2000);

        // RESULT:
        // Server data: {name: "San Francisco", population: 999999, state: "CA"}
        //
        // Local data: {name: "San Francisco", population: 1000000, state: "CA"}
        // Server data: {name: "San Francisco", population: 1000000, state: "CA"}
    });
}
