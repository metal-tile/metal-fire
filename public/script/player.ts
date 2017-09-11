namespace MetalTile {
    
    export class Player {
        
        public static angle : number;
        public static currentFrame : number = 0;
        public static animetion : any = {
            0 : 9,
            180 : 0,
            270 : 3,
            90 : 6,
        }
        static readonly animetionFrameSize = 3;
        public static x : number;
        public static y : number;

        public static updatePosition(x : number, y : number) {
            this.x = x;
            this.y = y;
        }

        public static moveUp(spped : number) {
            this.y -= spped;
            this.angle = 0;
        }

        public static moveDown(spped : number) {
            this.y += spped;
            this.angle = 180;
        }

        public static moveLeft(spped : number) {
            this.x -= spped;
            this.angle = 270;
        }

        public static moveRight(spped : number) {
            this.x += spped;
            this.angle = 90;
        }

        public static isAngleUp() : boolean {
            return (this.angle === 0);
        }

        public static isAngleDown() : boolean {
            return (this.angle === 180);
        }

        public static isAngleLeft() : boolean {
            return (this.angle === 270);
        }

        public static isAngleRight() : boolean {
            return (this.angle === 90);
        }

        public static nextFrame() : number {
            let startFrameIndex = this.animetion[this.angle];
            if (this.currentFrame < startFrameIndex || this.currentFrame >= startFrameIndex + this.animetionFrameSize) {
                this.currentFrame = startFrameIndex;
                return this.currentFrame;
            }
            
            return this.currentFrame++;
        }

        public static getPosition() : any {
            return {
                x : this.x,
                y : this.y
            }
        }
    }
}