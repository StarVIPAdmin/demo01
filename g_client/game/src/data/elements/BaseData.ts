module Data {

    /**
     * 基础数据
     */
    export class BaseData
    {
        /** 唯一ID */
        public id:number;
        /** 昵称 */
        public nick:string = "";
        /** 图标路径 */
        public bodyPath:string = "";
        /** x/y坐标 */
        public x:number = 0;
        public y:number = 0;
        /** 长宽 */
        public width:number = 1;
        public height:number = 1;

        constructor(id:number)
        {
            this.id = id;
        }
    }
}