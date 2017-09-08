/// <reference path="firestore.ts" />

phina.define('Player', {
    superClass: 'Sprite',
    init: function () {
        this.superInit("player", 32, 48);

        this.setPosition((MetalTile.GameConfig.SCREEN_WIDTH / 2) - (32 / 2), (MetalTile.GameConfig.SCREEN_HEIGHT / 2) - (48 / 2));
        this.origin.set(0, 0); // 左上基準に変更
        this.frameIndex = 0;
    },

    update: function (app) {
        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            this.frameIndex++;
            if (this.frameIndex > 12) {
                this.frameIndex = 0;
            }
        }
        if (app.frame % 4 === 0) {
            MetalTile.Firestore.updatePlayerPosition(1000, 1000);
        }
    }
});