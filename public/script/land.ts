namespace MetalTile {
    export class LandContoller {
        
        public static landMap = new Map<String, any>();

        public static setMapChip(landName : string, row : number, col : number, mapChip : any) {
            if (!this.landMap.get(landName)) {
                var land : any[][] = new Array();
                for (var i = 0; i < 200; i++) {
                    land[i] = new Array();
                }
                this.landMap.set(landName, land);
            }
            if (!this.landMap.get(landName)[row]) {
                this.landMap.get(landName)[row] = new Array();
            }
            
            this.landMap.get(landName)[row][col] = mapChip;
        }

        public static getLand(landName : string):any {
            if (!this.landMap.get(landName)) {
                return new Array();
            }
            return this.landMap.get(landName);
        }
    }
}

