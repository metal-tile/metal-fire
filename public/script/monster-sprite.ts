/// <reference path="config.ts" />
/// <reference path="debugger.ts" />

phina.define("MonsterSprite", {
    superClass: 'Sprite',
    init: function (monster : any, asset : string, width : number, height : number) {
        this.superInit(asset, width, height);

        this.monster = monster;

        this.frameIndex = 0;
        this.collider.setSize(width - 4, height - 4); // 実際のサイズより当たり判定を小さめにする
        this.collider.show();
    },

    update: function (app) {
        let diffX = this.monster.x - PlayerController.myPlayer.x - GameConfig.CHRACTER_WIDTH / 2;
        let diffY = this.monster.y - PlayerController.myPlayer.y - GameConfig.CHRACTER_HEIGHT / 2;

        this.setPosition(
            MetalTile.GameConfig.SCREEN_WIDTH / 2 + diffX,
            MetalTile.GameConfig.SCREEN_HEIGHT / 2 + diffY,
        );
        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            // 移動中のみアニメーションする
            if (this.monster.isMove) {
                this.frameIndex = this.monster.nextFrame();
            }
        }
    }
});