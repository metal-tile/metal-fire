/// <reference path="config.ts" />
/// <reference path="player.ts" />

declare var firebase: any;
declare var phina: any;
declare var Label: any;
declare var GameApp: any;
declare var Sprite: any;
declare var MapSprite: any;
declare var PlayerSprite: any;

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

        // FIXME とりあえず適当に初期ポジションを入れておく
        MetalTile.Player.updatePosition(1000, 1000);
    },
});

// メイン処理
phina.main(function () {
    MetalTile.Firestore.initialize("sinmetal");
    MetalTile.Firestore.watchMap();

    var app = GameApp({
        startLabel: 'main', // メインシーンから開始する
        width: MetalTile.GameConfig.SCREEN_WIDTH,
        height: MetalTile.GameConfig.SCREEN_HEIGHT,
        assets: MetalTile.GameConfig.ASSETS
    });

    app.enableStats();
    app.run();
});
