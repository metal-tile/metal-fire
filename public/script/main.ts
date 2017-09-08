/// <reference path="config.ts" />

declare var firebase: any;
declare var phina: any;
declare var Label: any;
declare var GameApp: any;
declare var Sprite: any;
declare var MapSprite: any;
declare var Player: any;

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
        this.player = new Player().addChildTo(this);
    },

    update: function (app) {
        this.map.updatePlayerPosition(this.player.position.x, this.player.position.y);
    }
});

// メイン処理
phina.main(function () {
    MetalTile.Firestore.initialize("sinmetal");

    var app = GameApp({
        startLabel: 'main', // メインシーンから開始する
        width: MetalTile.GameConfig.SCREEN_WIDTH,
        height: MetalTile.GameConfig.SCREEN_HEIGHT,
        assets: MetalTile.GameConfig.ASSETS
    });

    app.enableStats();
    app.run();
});
