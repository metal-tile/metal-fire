namespace MetalTile {
    export class PlayerController {

        public static myPlayer = new Player();
        public static playerMap = new Map<String, Player>();

        public static getMyPlayer() : Player {
            return this.myPlayer;
        }

        public static setPlayer(player : Player) {
            this.playerMap.set(player.id, player);
        }
    }
}
