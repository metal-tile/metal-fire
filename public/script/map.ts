/// <reference path="config.ts" />
/// <reference path="land.ts" />

declare var phina: any;

phina.define('MapSprite', {
    superClass: 'DisplayElement',
    init: function () {
        this.superInit();
        
        this.width  = 32;
        this.height = 32;

        this.playerPositionX = 0;
        this.playerPositionY = 0;

        this.currentFrame = 0;
        this.currentFrameIndex = 0;
    },

    draw: function(canvas) {
        let land = MetalTile.LandContoller.getLand("world-default20170908-land-home");
        let playerPosition = MetalTile.Player.getPosition();

        let startRow = Math.floor(playerPosition.y / MetalTile.GameConfig.CHIP_SIZE - (MetalTile.GameConfig.SCREEN_HEIGHT / 2 / MetalTile.GameConfig.CHIP_SIZE));
        let startCol = Math.floor(playerPosition.x / MetalTile.GameConfig.CHIP_SIZE - (MetalTile.GameConfig.SCREEN_WIDTH / 2 / MetalTile.GameConfig.CHIP_SIZE));

        let fractionY = playerPosition.y % MetalTile.GameConfig.CHIP_SIZE
        let fractionX = playerPosition.x % MetalTile.GameConfig.CHIP_SIZE

        for (var row = startRow; row < startRow + 32 + 1; ++row) {
            for (var col = startCol; col < startCol + 48 + 1; ++col) {
                let assetName = "ground";
                if (row % 2 == 0) {
                    assetName = "grassland";
                }
                if (col % 2 == 0) {
                    assetName = "grassland";
                }
                if (row < 0 || col < 0 || row > land.length || col > land[0].length) {
                    // landの端
                    continue;
                }

                var element = phina.asset.AssetManager.get("image", assetName).domElement;

                // dx, dyはマイナスでもよいっぽいので、現在位置からのずれをdx, dyで計算すれば良さそう
                var dx = (col - startCol) * 32 - fractionX;
                var dy = (row - startRow) * 32 - fractionY;

                // http://www.html5.jp/canvas/ref/method/drawImage.html
                canvas.drawImage(
                    element,
                    dx,
                    dy,
                    32,
                    32);
            }
        }
    }
});