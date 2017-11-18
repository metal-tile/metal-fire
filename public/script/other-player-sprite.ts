/// <reference path="config.ts" />
/// <reference path="debugger.ts" />

import GameConfig = MetalTile.GameConfig;
phina.define('OtherPlayerSprite', {
    superClass: 'Sprite',
    init: function (player : Player, asset : string) {
        this.superInit(asset, 32, 48);

        this.player = player;

        this.origin.set(0, 0); // 左上基準に変更
        this.frameIndex = 0;
    },

    update: function (app) {
        let diffX = this.player.x - PlayerController.myPlayer.x - GameConfig.CHRACTER_WIDTH / 2;
        let diffY = this.player.y - PlayerController.myPlayer.y - GameConfig.CHRACTER_HEIGHT / 2;

        this.setPosition(
            MetalTile.GameConfig.SCREEN_WIDTH / 2 + diffX,
            MetalTile.GameConfig.SCREEN_HEIGHT / 2 + diffY,
        );
        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            // 移動中のみアニメーションする
            if (this.player.isMove) {
                this.frameIndex = this.player.nextFrame();
            }
        }
    }
});