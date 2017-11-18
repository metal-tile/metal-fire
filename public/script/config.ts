namespace MetalTile {
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
                    "chip000" : "/image/mapchip/ground.png",
                    "chip001" : "/image/mapchip/grassland.png"
                },
            };
        }
    }
}

