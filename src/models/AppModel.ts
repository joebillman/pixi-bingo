import {Application} from "pixi.js";

export default class AppModel
{
    public app:Application | undefined;
    public assets:any;

    private static _instance:AppModel = new AppModel();

    public get centerX():number
    {
        return this.stageWidth / 2;
    }

    public get centerY():number
    {
        return this.stageHeight / 2;
    }

    public get stageHeight():number
    {
        return this.app?.screen.height || 0;
    }

    public get stageWidth():number
    {
        return this.app?.screen.width || 0;
    }

    public static getInstance():AppModel {
        return this._instance;
    }
}