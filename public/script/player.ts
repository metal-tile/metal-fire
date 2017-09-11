namespace MetalTile {
    
    export class Player {
        
        public static x : number;
        public static y : number;

        public static updatePosition(x : number, y : number) {
            this.x = x;
            this.y = y;
        }

        public static moveUp(spped : number) {
            this.y -= spped;
        }

        public static moveDown(spped : number) {
            this.y += spped;
        }

        public static moveLeft(spped : number) {
            this.x -= spped;
        }

        public static moveRight(spped : number) {
            this.x += spped;
        }

        public static getPosition() : any {
            return {
                x : this.x,
                y : this.y
            }
        }
    }
}
