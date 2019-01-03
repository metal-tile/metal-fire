namespace MetalTile {
    export class PickelController {

        public static activePickelMap = new Map<String, any>(); // PickelSprite

        public static startPickel(id : string, x : number, y : number, angle : number) {
            if (this.activePickelMap.has(id)) {
                return;
            }
            let index = 9999;
            if (angle === 0) {
                index = 1; // 上の時はプレイヤーより下に描画
            }

            let pickel = PickelSprite(id, "pickel", x, y, angle);
            GameController.currentScene.addChildAt(pickel, index);
            this.activePickelMap.set(id, pickel);
        }

        public static endPickel(id : string) {
            if (!this.activePickelMap.has(id)) {
                return;
            }

            GameController.currentScene.removeChild(this.activePickelMap.get(id));
            this.activePickelMap.delete(id);
        }
    }
}