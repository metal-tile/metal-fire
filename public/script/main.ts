/// <reference path="config.ts" />
/// <reference path="player.ts" />
/// <reference path="game-controller.ts" />
/// <reference path="player-controller.ts" />
/// <reference path="other-player-sprite.ts" />
/// <reference path="firestore.ts" />
/// <reference path="debugger.ts" />
/// <reference path="debugger-move-point.ts" />

import GameController = MetalTile.GameController;

declare let firebase: any;
declare let phina: any;
declare let Label: any;
declare let GameApp: any;
declare let Sprite: any;
declare let MapSprite: any;
declare let PlayerSprite: any;
declare let PickelSprite: any;
declare let OtherPlayerSprite: any;
declare let MonsterSprite: any;
declare let OtherPlayerNameLabelSprite: any;
declare let DebuggerLabel: any;
declare let DebuggerMovePointRectangle: any;

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function () {
        this.superInit(
            {
                width: MetalTile.GameConfig.SCREEN_WIDTH,
                height : MetalTile.GameConfig.SCREEN_HEIGHT
            }
        );

        MapSprite().addChildTo(this);

        PlayerSprite(PlayerController.getMyPlayer(), "player").addChildTo(this);
        DebuggerLabel().addChildTo(this);
        MetalTile.DebuggerMovePoint.initialize();
        DebuggerMovePointRectangle().addChildTo(this);

        // FIXME とりあえず適当に初期ポジションを入れておく
        PlayerController.getMyPlayer().updatePosition(1000, 1000);

        GameController.currentScene = this;
    }
});

// メイン処理
phina.main(function () {
    Firestore.initialize();

    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        Firestore.user = result.user;

        let app = GameApp({
            startLabel: 'main', // メインシーンから開始する
            width: MetalTile.GameConfig.SCREEN_WIDTH,
            height: MetalTile.GameConfig.SCREEN_HEIGHT,
            assets: MetalTile.GameConfig.ASSETS
        });
        GameController.app = app;

        if (!Firestore.user) {
            console.log("not login");
            return;
        }

        let ref = Firestore.getUserRef();
        ref.then(function(doc) {
            if (doc.exists) {
                Firestore.userName = doc.data().name;
                Debugger.setValue("userName", Firestore.userName);
                let myPlayer = PlayerController.getMyPlayer();
                myPlayer.id = Firestore.user.id;

                Firestore.watchMap();
                Firestore.watchPlayer();
                Firestore.watchMonster();

                app.enableStats();
                app.run();
            } else {
                location.href = "/auth.html";
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        console.log(error);
    });
});
