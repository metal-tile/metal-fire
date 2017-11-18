phina.define('OtherPlayerNameLabelSprite', {
    superClass: 'Label',
    init: function(player : Player) {
        this.superInit({text : player.id, fontSize : 18});
        this.setPosition(player.x, player.y - this.labelYPosition);
        this.align = "center";
        this.player = player;
    },

    update: function(app) {
        let diffX = this.player.x - PlayerController.myPlayer.x - GameConfig.CHRACTER_WIDTH / 2;
        let diffY = this.player.y - PlayerController.myPlayer.y - GameConfig.CHRACTER_HEIGHT / 2;

        this.setPosition(
            MetalTile.GameConfig.SCREEN_WIDTH / 2 + diffX + this.width / 4,
            MetalTile.GameConfig.SCREEN_HEIGHT / 2 + diffY - this.labelYPosition,
        );
    },
    labelYPosition: 8,
});