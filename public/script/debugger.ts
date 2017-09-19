namespace MetalTile {
    export class Debugger {

        private static _isShow : boolean;
        static varMap = new Map<String, any>();

        static get isShow(): boolean {
            return this._isShow;
        }

        static set isShow(isShow : boolean){
            this._isShow = isShow;
        }

        public static setValue(key : string, value : any) {
            this.varMap.set(key, value);
        }

        public static getText() {
            let text : string = "";
            this.varMap.forEach(
                (value: any, key: string) => {
                    text += key + " : " + value + "\n";
                }
            );
            return text;
        }
    }
}
