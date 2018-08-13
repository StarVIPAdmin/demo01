module Core {
    import Sprite = Laya.Sprite;

    /**
     * UI界面管理器
     */
    export class ViewMgr extends BaseSingleton
    {
        /** 获取单例实例 */
        static get instance():ViewMgr
        {
            return super.getInstanceOrCreate(ViewMgr);
        }

        // 游戏界面类集
        private _viewCls:Array<any>;
        // 缓存游戏已打开的ui界面
        private _uiViews:Array<Sprite>;
        // 缓存界面对应的层级
        private _uiLayers:Array<number>;

        /** 重写父类函数 */
        protected onCreate():void 
        {
            this._viewCls = [];
            this._uiViews = [];
            this._uiLayers = [];
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
            this._viewCls = null;
            this._uiViews = null;
            this._uiLayers = null;
        }

        /** 根据界面唯一ID，显示ui界面 */
        showView(ViewId:number, Param?:any):Sprite 
        {
            let viewCls = this._viewCls[ViewId];
            if (viewCls == null) {
                console.log("[ViewMgr] showView : ViewCls is not register!!! ViewId = ", ViewId);
                return;
            }

            let view = this._uiViews[ViewId];
            if (view == null) {
                view = new viewCls();
                this._uiViews[ViewId] = view;

                if (view["onInit"]) {
                    view["onInit"]();
                }
            }

            if (view["onShow"]) {
                view["onShow"](Param);
            }
            let uiLayer = this._uiLayers[ViewId];
            LayerMgr.instance.addChildToLayer(uiLayer, view, 0, 0);
            return view;
        }
        
        /** 根据界面唯一ID，隐藏ui界面 */
        hideView(ViewId:number):void 
        {
            let view = this._uiViews[ViewId];
            if (view != null) {
                if (view["onHide"]) {
                    view["onHide"]();
                }
                if (view["onDestroy"]) {
                    view["onDestroy"]();
                }
                view.removeSelf();
                this._uiViews[ViewId] = null;
            }
        }

        /** 隐藏所以ui界面 */
        hideAllView():void 
        {
            if (this._uiViews.length <= 0) {
                return;
            }

            for (let viewId in this._uiViews) {
                this.hideView(parseInt(viewId));
            }
            this._uiViews.length = 0;
        }

        /** 根据ID，获取已打开的界面 */
        getView(ViewId:number):Sprite
        {
            let view = this._uiViews[ViewId];
            return view;
        }

        /** 检查ui界面是否已打开 */
        checkViewIsOpen(ViewId:number):boolean 
        {
            let view = this._uiViews[ViewId];
            return view != null;
        }

        /** 注册UI界面 */
        registerView(ViewId:number, ViewCls:any, UILayer:number=UI_LAYER.Dialog):void 
        {
            // 检测参数是否为空
            if (!ViewId || !ViewCls) {
                console.log("[ViewMgr] registerView : ViewId or ViewCls is null", ViewId, ViewCls);
                return;
            }
            // 检测是否重复注册
            if (this._viewCls[ViewId] != null) {
                console.log("[ViewMgr] registerView : ViewCls is exist, ViewId = ", ViewId);
                return;
            }
            // 检测ui层级是否存在
            if (!LayerMgr.instance.checkUILayer(UILayer)) {
                console.log("[ViewMgr] registerView : UILayer is not exist, ViewId = ", ViewId);
                return;
            }
            this._viewCls[ViewId] = ViewCls;
            this._uiLayers[ViewId] = UILayer;
        }
    }
}