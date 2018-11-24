namespace MetalTile {
    export class DebuggerMovePoint {
        private static _isShow : boolean;
        private static x : number;
        private static y : number;
        private static firstX : number;
        private static firstY : number;
        private static isWalk : boolean;

        static initialize() {
            // PlayerSprite と同じ初期位置に設定
            this.firstX = (MetalTile.GameConfig.SCREEN_WIDTH / 2) - (32 / 2);
            this.firstY = (MetalTile.GameConfig.SCREEN_HEIGHT / 2) - (48 / 2);
        }

        static get isShow(): boolean {
            return this._isShow;
        }

        static set isShow(isShow : boolean){
            this._isShow = isShow;
        }

        public static setPoint(x : number, y : number) {
            this.x = x;
            this.y = y;
        }

        public static getPoint() : { x : number, y : number} {
            return {x : this.x, y : this.y};
        }

        public static getFirstPoint() : {x : number, y : number} {
            return {x : this.firstX, y : this.firstY};
        }

        public static setIsWalk(isWalk : boolean) {
            this.isWalk = isWalk;
        }

        public static getIsWalk() : boolean {
            return this.isWalk;
        }
    }
}