/// <reference path="config.ts" />
/// <reference path="player.ts" />
/// <reference path="game-controller.ts" />
/// <reference path="player-controller.ts" />
/// <reference path="other-player-sprite.ts" />
/// <reference path="firestore.ts" />
/// <reference path="debugger.ts" />

import GameController = MetalTile.GameController;

declare let firebase: any;
declare let phina: any;
declare let Label: any;
declare let GameApp: any;
declare let Sprite: any;
declare let MapSprite: any;
declare let PlayerSprite: any;
declare let OtherPlayerSprite: any;
declare let OtherPlayerNameLabelSprite: any;
declare let DebuggerLabel: any;

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
        // FIXME とりあえず適当に初期ポジションを入れておく
        PlayerController.getMyPlayer().updatePosition(1000, 1000);

        GameController.currentScene = this;
    }
});

// メイン処理
phina.main(function () {
    let app = GameApp({
        startLabel: 'main', // メインシーンから開始する
        width: MetalTile.GameConfig.SCREEN_WIDTH,
        height: MetalTile.GameConfig.SCREEN_HEIGHT,
        assets: MetalTile.GameConfig.ASSETS
    });
    GameController.app = app;

    // TODO Firebase Authでユーザ名を置き換える
    let dt = new Date();
    let userName = "user" + dt.getMinutes();
    Debugger.setValue("userName", userName);
    let myPlayer = PlayerController.getMyPlayer();
    myPlayer.id = userName;
    Firestore.initialize(userName);
    Firestore.watchMap();
    Firestore.watchPlayer();

    app.enableStats();
    app.run();
});
