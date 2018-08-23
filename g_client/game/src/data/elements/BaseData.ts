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
        /** 长宽 */
        public width:number = 1;
        public height:number = 1;
        /** 碰撞半径 */
        public collisionRadius:number = 0;

        constructor(id:number)
        {
            this.id = id;
        }
    }
}