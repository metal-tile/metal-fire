/// <reference path="config.ts" />
/// <reference path="player.ts" />
/// <reference path="player-controller.ts" />

declare var firebase: any;
declare let phina: any;
declare var Label: any;
declare var GameApp: any;
declare var Sprite: any;
declare var MapSprite: any;
declare var PlayerSprite: any;
declare var DebuggerLabel: any;

// phina.js をグローバル領域に展開
phina.globalize();

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

        this.map = new MapSprite().addChildTo(this);
        this.player = new PlayerSprite().addChildTo(this);
        this.debuggerLabel = new DebuggerLabel().addChildTo(this);

        // FIXME とりあえず適当に初期ポジションを入れておく
        PlayerController.getMyPlayer().updatePosition(1000, 1000);
    },
});

// メイン処理
phina.main(function () {
    // TODO Firebase Authでユーザ名を置き換える
    let dt = new Date();
    let userName = "user" + dt.getMinutes();
    MetalTile.Debugger.setValue("userName", userName);
    MetalTile.Firestore.initialize(userName);
    MetalTile.Firestore.watchMap();
    MetalTile.Firestore.watchPlayer();

    let app = GameApp({
        startLabel: 'main', // メインシーンから開始する
        width: MetalTile.GameConfig.SCREEN_WIDTH,
        height: MetalTile.GameConfig.SCREEN_HEIGHT,
        assets: MetalTile.GameConfig.ASSETS
    });

    app.enableStats();
    app.run();
});
