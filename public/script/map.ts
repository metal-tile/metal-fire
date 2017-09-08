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

    updatePlayerPosition: function(x:number, y:number) {
        console.log(x, y);
        console.log(x / 32, y / 32);
    },

    draw: function(canvas) {
        for (var row = 0; row < 4; ++row) {
            for (var col = 0; col < 4; ++col) {
                let assetName = "ground";
                if (row % 2 == 0) {
                    assetName = "grassland";
                }
                var element = phina.asset.AssetManager.get("image", assetName).domElement;

                // dx, dyはマイナスでもよいっぽいので、現在位置からのずれをdx, dyで計算すれば良さそう
                var dx = col * 32;
                var dy = row * 32;

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