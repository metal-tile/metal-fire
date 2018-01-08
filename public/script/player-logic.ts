/// <reference path="land.ts" />
/// <reference path="config.ts" />
/// <reference path="debugger.ts" />

import LandContoller = MetalTile.LandContoller;
import Debugger = MetalTile.Debugger;

namespace MetalTile {
    export class PlayerLogic {

        public static getAdjustPosition(moveAngle : string, v: number) : number {
            let base = GameConfig.CHIP_SIZE / 8;
            if (moveAngle == "w") {
                return Math.floor(v / base) * base;
            } else if (moveAngle == "s") {
                return Math.ceil(v / base) * base;
            } else if (moveAngle == "a") {
                return Math.floor(v / base) * base;
            } else if (moveAngle == "d") {
                return Math.ceil(v / base) * base;
            }
            console.error("unsupported moveAngle : ", moveAngle);
            return 0;
        }

        public static movePosition(moveAngle : string, playerPosition : any, aheadChip : any) : number {
            if (aheadChip.isWalk == false) {
                // TODO 切りの良い位置まで移動する感じにする
                // 32の倍数の位置まで移動すればいい・・・？もしくは、最後に半分に割るのか？
                if (moveAngle == "w") {
                    return PlayerLogic.getAdjustPosition(moveAngle, playerPosition.y);
                } else if (moveAngle == "s") {
                    return PlayerLogic.getAdjustPosition(moveAngle, playerPosition.y);
                } else if (moveAngle == "a") {
                    return PlayerLogic.getAdjustPosition(moveAngle, playerPosition.x);
                } else if (moveAngle == "d") {
                    return PlayerLogic.getAdjustPosition(moveAngle, playerPosition.x);
                }
            }
            return 0;
        }
    }
}
