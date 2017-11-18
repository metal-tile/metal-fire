/// <reference path="firestore.ts" />
/// <reference path="config.ts" />
/// <reference path="debugger.ts" />

import Player = MetalTile.Player;
import LandContoller = MetalTile.LandContoller;
import Firestore = MetalTile.Firestore;
import PlayerController = MetalTile.PlayerController;
import Debugger = MetalTile.Debugger;

phina.define('PlayerSprite', {
    superClass: 'Sprite',
    init: function (player : Player, asset : string) {
        this.superInit(asset, 32, 48);

        this.player = player;

        this.setPosition((MetalTile.GameConfig.SCREEN_WIDTH / 2) - (32 / 2), (MetalTile.GameConfig.SCREEN_HEIGHT / 2) - (48 / 2));
        this.origin.set(0, 0); // 左上基準に変更
        this.frameIndex = 0;
    },

    update: function (app) {
        let keyboard = app.keyboard;
        let isMove : boolean = false;

        if (keyboard.getKey('w')) {
            this.player.moveUp(4);
            isMove = true;
        }
        if (keyboard.getKey('s')) {
            this.player.moveDown(4);
            isMove = true;
        }
        if (keyboard.getKey('a')) {
            this.player.moveLeft(4);
            isMove = true;
        }
        if (keyboard.getKey('d')) {
            this.player.moveRight(4);
            isMove = true;
        }

        if (keyboard.getKey('1')) {
            let position = this.player.getAheadPosition();
            let aheadRowCol = LandContoller.getRowCol(position.x, position.y);

            // TODO ひたすらupdateし続けると遅いので、所持アイテムと対象のタイルを比べて変化がない場合は、updateしないようにする
            Firestore.updateLandTile(aheadRowCol.row, aheadRowCol.col, 1);
        }

        if (Debugger.isShow) {
            let pp = this.player.getPosition();
            Debugger.setValue("Player X", pp.x);
            Debugger.setValue("Player Y", pp.y);
        }

        // 4フレームごとにアニメーションを進める
        if (app.frame % 4 === 0) {
            if (isMove) {
                // 移動中のみアニメーションする
                this.frameIndex = this.player.nextFrame();
            }
            Firestore.updatePlayerPosition(this.player.x, this.player.y, this.player.angle, isMove);
        }
    }
});