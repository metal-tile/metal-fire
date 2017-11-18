declare let MainScene: any;

namespace MetalTile {
    export class PlayerController {

        public static myPlayer = new Player();
        public static playerMap = new Map<String, Player>();

        public static getMyPlayer() : Player {
            return this.myPlayer;
        }

        public static setPlayer(player : Player) {
            if (this.playerMap.has(player.id) == false) {
                console.log("new player " + player.id + ":" + player.x + ":" + player.y);
                this.playerMap.set(player.id, player);
                GameController.currentScene.addChild(OtherPlayerSprite(player, "player"));
            }
            let p = this.playerMap.get(player.id);
            p.x = player.x;
            p.y = player.y;
            p.angle = player.angle;
            p.isMove = player.isMove;
        }
    }
}
