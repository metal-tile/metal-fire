phina.define('PickelSprite', {
    superClass: 'Sprite',
    init: function(id : string, asset : string, x : number, y : number, angle : number) {
        this.superInit(asset, 32, 48);

        this.id = id;
        this.x = x;
        this.y = y;
        this.origin.x = 0.5;
        this.origin.y = 1;
        this.startAngle = 0;
        this.angle = angle;
        this.animationCount = 0;

        this.PieceAngle = 15;
        this.SwingAngle = 105;
        this.AdjustmentX = 8;
        this.AdjustmentY = 6;

        this.collider.setSize(16, 48);
        this.collider.offset(0, -22); // 上の方に当たり判定を調整
        this.collider.show();

        switch (this.angle) {
            case 0:
                this.startAngle = 0 - this.PieceAngle * 3;
                this.rotation = this.startAngle;
                this.y -= this.AdjustmentY;
                break;
            case 180:
                this.startAngle = 0 - this.PieceAngle * 8;
                this.rotation = this.startAngle;
                this.y += this.AdjustmentY;
                break;
            case 270:
                this.startAngle = 0;
                this.rotation = this.startAngle;
                this.x -= this.AdjustmentX;
                this.y += this.AdjustmentY;
                break;
            case 90:
                this.startAngle = 0;
                this.rotation = this.startAngle;
                this.x += this.AdjustmentX;
                this.y += this.AdjustmentY;
                break;
        }
    },

    update: function() {
        this.animationCount++;
        if (this.animationCount > 7) {
            PickelController.endPickel(this.id);
        }

        switch (this.angle) {
            case 0:
                this.rotation += this.PieceAngle;
                if (this.rotation > this.startAngle + this.SwingAngle) {
                    this.rotation = this.startAngle
                }
                break;
            case 180:
                this.rotation -= this.PieceAngle;
                if (this.rotation < this.startAngle - this.SwingAngle) {
                    this.rotation = this.startAngle
                }
                break;
            case 270:
                this.rotation -= this.PieceAngle;
                if (this.rotation < this.startAngle - this.SwingAngle) {
                    this.rotation = this.startAngle
                }
                break;
            case 90:
                this.rotation += this.PieceAngle;
                if (this.rotation > this.startAngle + this.SwingAngle) {
                    this.rotation = this.startAngle
                }
                break;
            default:
        }
    },
});