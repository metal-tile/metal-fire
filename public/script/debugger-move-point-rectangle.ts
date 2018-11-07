phina.define('DebuggerMovePointRectangle', {
    superClass: 'RectangleShape',
    init: function() {
        this.superInit();
        this.width = 3;
        this.height = 3;
    },
    update: function(app) {
        let point = MetalTile.DebuggerMovePoint.getPoint();
        this.x = MetalTile.DebuggerMovePoint.getFirstPoint().x + point.x;
        this.y = MetalTile.DebuggerMovePoint.getFirstPoint().y + point.y;

        if (MetalTile.DebuggerMovePoint.getIsWalk()) {
            this.fill = 'blue';
        } else {
            this.fill = 'red';
        }
    }
});