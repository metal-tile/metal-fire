namespace MetalTile {
    export class GameConfig {
        
        public static get SCREEN_WIDTH():number {
            return 1024;
        }
    
        public static get SCREEN_HEIGHT():number {
            return 800;
        }

        public static get CHIP_SIZE():number {
            return 32;
        }

        public static get ASSETS():any {
            return {
                image : {
                    "ground": "/image/mapchip/ground.png"
                },
            };
        }
    }
}

