namespace MetalTile {
    export class Chip {
        id : number;
        hitPoint : number;
        isWalk : boolean;
    }

    export class GameConfig {

        public static get SCREEN_WIDTH():number {
            return 32 * 48;
        }
    
        public static get SCREEN_HEIGHT():number {
            return 32 * 32;
        }

        public static get CHIP_SIZE():number {
            return 32;
        }

        public static get CHRACTER_WIDTH():number {
            return 32;
        }

        public static get CHRACTER_HEIGHT():number {
            return 48;
        }

        public static get ASSETS():any {
            return {
                image : {
                    "player" : "/image/character/sara.png",
                    "orc_fighter" : "/image/monster/orc_fighter.png",
                    "chip000" : "/image/mapchip/ground.png",
                    "chip001" : "/image/mapchip/grassland.png",
                    "chip999" : "/image/mapchip/debug.png",
                    "pickel" : "/image/tool/pickel.png",
                },
            };
        }

        public static getChip(id : number) : Chip {
            let map = new Map<number, Chip>();

            // 地面
            map.set(0, {
                id : 0,
                hitPoint : 1000,
                isWalk : false,
            });

            // 草
            map.set(1, {
                id : 1,
                hitPoint : 1000,
                isWalk : true,
            });

            // debug
            map.set(999, {
                id : 999,
                hitPoint : 1000,
                isWalk : true,
            });

            let v = map.get(id);
            if (v) {
                return v;
            }
            return {
                id : 0,
                hitPoint : 0,
                isWalk : false,
            };
        }
    }
}
import GameConfig = MetalTile.GameConfig;