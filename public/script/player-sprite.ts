/// <reference path="firestore.ts" />
/// <reference path="config.ts" />
/// <reference path="debugger.ts" />
/// <reference path="debugger-move-point.ts" />
/// <reference path="player-logic.ts" />
/// <reference path="monster-controller.ts" />

import Player = MetalTile.Player;
import Firestore = MetalTile.Firestore;
import PlayerController = MetalTile.PlayerController;
import PlayerLogic = MetalTile.PlayerLogic;
import MonsterController = MetalTile.MonsterController;
import Monster = MetalTile.Monster;

phina.define('PlayerSprite', {
    superClass: 'Sprite',
    init: function (player : Player, asset : string) {
        this.superInit(asset, 32, 48);

        this.player = player;

        this.setPosition((MetalTile.GameConfig.SCREEN_WIDTH / 2) - (32 / 2), (MetalTile.GameConfig.SCREEN_HEIGHT / 2) - (48 / 2));
        this.frameIndex = 0;
        this.collider.setSize(GameConfig.CHRACTER_WIDTH - 4, GameConfig.CHRACTER_HEIGHT - 4); // 実際のサイズより当たり判定を小さめにする
        this.collider.show();
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

        // Monsterとの当たり判定
        MonsterController.monsterMap.forEach((value: Monster, key: String, map:Map<String, Monster>) => {
            if (this.collider.hitTest(value.sprite.collider)) {
                console.log("hit!!!")
            }
        });

    },
    movePosition: function(moveAngle : string) {
        let speed = 4;
        let position = this.player.getPosition();

        let checkPositions: Array<any> = [];
        let aheadX = 0;
        let aheadY = 0;
        const targetX = 8; // 進もうとする場所をチェックする点の調整値
        const targetY = 14; // 進もうとする場所をチェックする点の調整値
        const foot = 6; // 足元を見る調整値 MetalTile.Player.getAheadPosition()よりは短い位置を確認する
        if (moveAngle == "w") {
            aheadY -= speed;
            aheadY -= 6;
            checkPositions.push({x:position.x + aheadX + targetX, y: position.y + aheadY});
            checkPositions.push({x:position.x + aheadX - targetX, y: position.y + aheadY});
        } else if (moveAngle == "s") {
            aheadY += speed;
            aheadY += 20;
            checkPositions.push({x:position.x + aheadX + targetX, y: position.y + aheadY});
            checkPositions.push({x:position.x + aheadX - targetX, y: position.y + aheadY});
        } else if (moveAngle == "a") {
            aheadX -= speed;
            aheadX -= 15;
            aheadY += foot;
            checkPositions.push({x:position.x + aheadX, y: position.y + aheadY + targetY});
            checkPositions.push({x:position.x + aheadX, y: position.y + aheadY});
        } else if (moveAngle == "d") {
            aheadX += speed;
            aheadX += 15;
            aheadY += foot;
            checkPositions.push({x:position.x + aheadX, y: position.y + aheadY + targetY});
            checkPositions.push({x:position.x + aheadX, y: position.y + aheadY});
        }

        { // Debugのためのロジック
            let aheadRowCol = LandContoller.getRowCol(position.x + aheadX, position.y + aheadY);
            Debugger.setValue("AheadPosition", (position.y + aheadY) + ":" + (position.x + aheadX));
            Debugger.setValue("AheadRowCol", aheadRowCol.row + ":" + aheadRowCol.col);
            Debugger.setValue("AheadChip", LandContoller.getChip("world-default20170908-land-home", aheadRowCol.row, aheadRowCol.col).chip);
            DebuggerMovePoint.setPoint(aheadX, aheadY);
            DebuggerMovePoint.setIsWalk(true);
        }

        checkPositions.forEach(function(value) {
            let rowCol:any = LandContoller.getRowCol(value.x, value.y);
            let chip:any = GameConfig.getChip(LandContoller.getChip("world-default20170908-land-home", rowCol.row, rowCol.col).chip);
            if (chip.isWalk === false) {
                DebuggerMovePoint.setIsWalk(false);
                // TODO 切りの良い位置まで移動する感じにする
                // 32の倍数の位置まで移動すればいい・・・？もしくは、最後に半分に割るのか？
                let movePosition = PlayerLogic.movePosition(moveAngle, position, chip);
                if (moveAngle == "w") {
                    speed = Math.min(speed, (movePosition - position.y));
                } else if (moveAngle == "s") {
                    speed = Math.min(speed, (position.y - movePosition));
                } else if (moveAngle == "a") {
                    speed = Math.min(speed, (movePosition - position.x));
                } else if (moveAngle == "d") {
                    speed = Math.min(speed, (position.x - movePosition));
                }
            }
        });

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