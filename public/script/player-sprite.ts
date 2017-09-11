/// <reference path="firestore.ts" />
/// <reference path="config.ts" />

declare var phina: any;

phina.define('PlayerSprite', {
    superClass: 'Sprite',
    init: function () {
        this.superInit("player", 32, 48);

        this.setPosition((MetalTile.GameConfig.SCREEN_WIDTH / 2) - (32 / 2), (MetalTile.GameConfig.SCREEN_HEIGHT / 2) - (48 / 2));
        this.origin.set(0, 0); // 左上基準に変更
        this.frameIndex = 0;
    },

    update: function (app) {
        var keyboard = app.keyboard;  
        if (keyboard.getKey('w')) {  
            MetalTile.Player.moveUp(4);
        }
        if (keyboard.getKey('s')) {  
            MetalTile.Player.moveDown(4);
        }
        if (keyboard.getKey('a')) {  
            MetalTile.Player.moveLeft(4);
        }
        if (keyboard.getKey('d')) {  
            MetalTile.Player.moveRight(4);
        }

        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            this.frameIndex++;
            if (this.frameIndex > 12) {
                this.frameIndex = 0;
            }
        }
        if (app.frame % 4 === 0) {
            let playerPosition = MetalTile.Player.getPosition();
            MetalTile.Firestore.updatePlayerPosition(playerPosition.x, playerPosition.y);
        }
    }
});