/// <reference path="firestore.ts" />
/// <reference path="config.ts" />

import Player = MetalTile.Player;
import LandContoller = MetalTile.LandContoller;
import Firestore = MetalTile.Firestore;
import PlayerController = MetalTile.PlayerController;
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
        let myPlayer = PlayerController.getMyPlayer();
        let isMove : boolean = false;
        if (keyboard.getKey('w')) {
            myPlayer.moveUp(4);
            isMove = true;
        }
        if (keyboard.getKey('s')) {
            myPlayer.moveDown(4);
            isMove = true;
        }
        if (keyboard.getKey('a')) {
            myPlayer.moveLeft(4);
            isMove = true;
        }
        if (keyboard.getKey('d')) {
            myPlayer.moveRight(4);
            isMove = true;
        }

        if (keyboard.getKey('1')) {
            let position = myPlayer.getAheadPosition();
            let aheadRowCol = LandContoller.getRowCol(position.x, position.y);

            // TODO ひたすらupdateし続けると遅いので、所持アイテムと対象のタイルを比べて変化がない場合は、updateしないようにする
            Firestore.updateLandTile(aheadRowCol.row, aheadRowCol.col, 1);
        }

        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            if (isMove) {
                // 移動中のみアニメーションする
                this.frameIndex = myPlayer.nextFrame();
            }

            let playerPosition = myPlayer.getPosition();
            MetalTile.Firestore.updatePlayerPosition(playerPosition.x, playerPosition.y);
        }

        if (MetalTile.Debugger.isShow) {
            let pp = myPlayer.getPosition();
            MetalTile.Debugger.setValue("Player X", pp.x);
            MetalTile.Debugger.setValue("Player Y", pp.y);
        }
    }
});