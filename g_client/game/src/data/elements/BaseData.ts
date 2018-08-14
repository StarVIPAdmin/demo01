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

        constructor(id:number)
        {
            this.id = id;
        }
    }
}