/// <reference path="firestore.ts" />
/// <reference path="config.ts" />
/// <reference path="debugger.ts" />
/// <reference path="player-logic.ts" />

import Player = MetalTile.Player;
import Firestore = MetalTile.Firestore;
import PlayerController = MetalTile.PlayerController;
import PlayerLogic = MetalTile.PlayerLogic;

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

        if (keyboard.getKey("w")) {
            this.movePosition("w");
            isMove = true;
        }
        if (keyboard.getKey('s')) {
            this.movePosition("s");
            isMove = true;
        }
        if (keyboard.getKey('a')) {
            this.movePosition("a");
            isMove = true;
        }
        if (keyboard.getKey('d')) {
            this.movePosition("d");
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
    },
    movePosition: function(moveAngle : string) {
        let speed = 4;
        let position = this.player.getPosition();

        let aheadX = 0;
        let aheadY = 0;
        const foot = 10; // 足元を見る調整値 MetalTile.Player.getAheadPosition() と同じ調整値
        if (moveAngle == "w") {
            aheadY -= speed;
        } else if (moveAngle == "s") {
            aheadY += speed;
            aheadY += 20;
        } else if (moveAngle == "a") {
            aheadX -= speed;
            aheadX -= 16;
            aheadY += foot;
        } else if (moveAngle == "d") {
            aheadX += speed;
            aheadX += 8;
            aheadY += foot;
        }

        let aheadRowCol = LandContoller.getRowCol(position.x + aheadX, position.y + aheadY);
        Debugger.setValue("AheadRowCol", aheadRowCol.row + ":" + aheadRowCol.col);
        Debugger.setValue("AheadChip", LandContoller.getChip("world-default20170908-land-home", aheadRowCol.row, aheadRowCol.col).chip)
        if (aheadRowCol.col > 60) {
            return;
        }

        let chip = GameConfig.getChip(LandContoller.getChip("world-default20170908-land-home", aheadRowCol.row, aheadRowCol.col).chip);
        if (chip.isWalk == false) {
            // TODO 切りの良い位置まで移動する感じにする
            // 32の倍数の位置まで移動すればいい・・・？もしくは、最後に半分に割るのか？
            let movePosition = PlayerLogic.movePosition(moveAngle, position, chip);
            if (moveAngle == "w") {
                speed = movePosition - position.y;
            } else if (moveAngle == "s") {
                speed = position.y - movePosition;
            } else if (moveAngle == "a") {
                speed = movePosition - position.x;
            } else if (moveAngle == "d") {
                speed = position.x - movePosition;
            }
        }

        if (moveAngle == "w") {
            this.player.moveUp(speed);
        } else if (moveAngle == "s") {
            this.player.moveDown(speed);
        } else if (moveAngle == "a") {
            this.player.moveLeft(speed);
        } else if (moveAngle == "d") {
            this.player.moveRight(speed);
        }
    }
});