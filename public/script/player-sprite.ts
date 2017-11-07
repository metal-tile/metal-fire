/// <reference path="firestore.ts" />
/// <reference path="config.ts" />

import Player = MetalTile.Player;
import LandContoller = MetalTile.LandContoller;
import Firestore = MetalTile.Firestore;
declare let phina: any;

phina.define('PlayerSprite', {
    superClass: 'Sprite',
    init: function () {
        this.superInit("player", 32, 48);

        this.setPosition((MetalTile.GameConfig.SCREEN_WIDTH / 2) - (32 / 2), (MetalTile.GameConfig.SCREEN_HEIGHT / 2) - (48 / 2));
        this.origin.set(0, 0); // 左上基準に変更
        this.frameIndex = 0;
    },

    update: function (app) {
        let keyboard = app.keyboard;
        let isMove : boolean = false;
        if (keyboard.getKey('w')) {  
            MetalTile.Player.moveUp(4);
            isMove = true;
        }
        if (keyboard.getKey('s')) {  
            MetalTile.Player.moveDown(4);
            isMove = true;
        }
        if (keyboard.getKey('a')) {  
            MetalTile.Player.moveLeft(4);
            isMove = true;
        }
        if (keyboard.getKey('d')) {  
            MetalTile.Player.moveRight(4);
            isMove = true;
        }

        if (keyboard.getKey('1')) {
            let rowCol = LandContoller.getRowCol(Player.x, Player.y);
            MetalTile.Debugger.setValue("CenterRow", rowCol.row);
            MetalTile.Debugger.setValue("CenterCol", rowCol.col);
            // TODO 自分の前方のタイルを変えてあげる
            Firestore.updateLandTile(rowCol.row, rowCol.col, 1);
        }

        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            if (isMove) {
                // 移動中のみアニメーションする
                this.frameIndex = MetalTile.Player.nextFrame();
            }

            let playerPosition = MetalTile.Player.getPosition();
            MetalTile.Firestore.updatePlayerPosition(playerPosition.x, playerPosition.y);
        }

        if (MetalTile.Debugger.isShow) {
            let pp = MetalTile.Player.getPosition();
            MetalTile.Debugger.setValue("Player X", pp.x);
            MetalTile.Debugger.setValue("Player Y", pp.y);
        }
    }
});