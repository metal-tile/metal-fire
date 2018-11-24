namespace MetalTile {
    export class MonsterController {

        public static monsterMap = new Map<String, Monster>();

        public static setMonster(monster : Monster) {
            if (this.monsterMap.has(monster.id) == false) {
                this.monsterMap.set(monster.id, monster);
                monster.sprite = MonsterSprite(monster, "orc_fighter", 32, 48);
                MetalTile.GameController.currentScene.addChild(monster.sprite);
            }
            let p = this.monsterMap.get(monster.id);
            if (p) {
                p.x = monster.x;
                p.y = monster.y;
                p.angle = monster.angle;
                p.isMove = monster.isMove;
            }
        }
    }
}
