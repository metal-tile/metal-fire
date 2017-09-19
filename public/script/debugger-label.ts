phina.define('DebuggerLabel', {
    superClass: 'Label',
    init: function () {
        this.superInit("DebuggerLabel");
        this.x = 20;
        this.y = 100;
        this.fontSize = 24;
        this.fill = "#EEE";
        this.align = "left";
        this.backgroundColor = "rgba(80, 80, 80, 0.6)";
    },
    update: function(app) {
        let keyboard = app.keyboard;
        if (keyboard.getKeyDown("f2")) {
            MetalTile.Debugger.isShow = !MetalTile.Debugger.isShow;
        }

        if (MetalTile.Debugger.isShow) {
            this.show();
            this.text = "Debugger\n" + MetalTile.Debugger.getText();
        } else {
            this.hide();
        }
    }
});