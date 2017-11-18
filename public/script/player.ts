namespace MetalTile {
    
    export class Player {

        public id : string;
        public angle : number = 180;
        public isMove : boolean;
        public currentFrame : number = 0;
        public animetion : any = {
            0 : 9,
            180 : 0,
            270 : 3,
            90 : 6,
        };

        readonly animetionFrameSize = 3;
        public x : number;
        public y : number;

        public updatePosition(x : number, y : number) {
            this.x = x;
            this.y = y;
        }

        public moveUp(spped : number) {
            this.y -= spped;
            this.angle = 0;
        }

        public moveDown(spped : number) {
            this.y += spped;
            this.angle = 180;
        }

        public moveLeft(spped : number) {
            this.x -= spped;
            this.angle = 270;
        }

        public moveRight(spped : number) {
            this.x += spped;
            this.angle = 90;
        }

        public isAngleUp() : boolean {
            return (this.angle === 0);
        }

        public isAngleDown() : boolean {
            return (this.angle === 180);
        }

        public isAngleLeft() : boolean {
            return (this.angle === 270);
        }

        public isAngleRight() : boolean {
            return (this.angle === 90);
        }

        public getAheadPosition() : any {
            if (this.isAngleUp()) {
                return {
                    x : this.x,
                    y : this.y - 25
                }
            }
            if (this.isAngleDown()) {
                return {
                    x : this.x,
                    y : this.y + 40 // 下の方がキャラクターの中心より遠いので、多めに下を見る
                }
            }
            const foot = 10; // 足元を見る調整値
            if (this.isAngleLeft()) {
                return {
                    x : this.x - 25,
                    y : this.y + foot
                }
            }
            if (this.isAngleRight()) {
                return {
                    x : this.x + 25,
                    y : this.y + foot
                }
            }
        }

        public nextFrame() : number {
            let startFrameIndex = this.animetion[this.angle];
            if (this.currentFrame < startFrameIndex || this.currentFrame >= startFrameIndex + this.animetionFrameSize) {
                this.currentFrame = startFrameIndex;
                return this.currentFrame;
            }
            
            return this.currentFrame++;
        }

        public getPosition() : any {
            return {
                x : this.x,
                y : this.y
            }
        }
    }
}
