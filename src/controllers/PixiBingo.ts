import { Application, Assets } from 'pixi.js';
import AppModel from "../models/AppModel.ts";
import Menu from "../scenes/Menu.ts";

export default class PixiBingo
{
    private ROOT_ASSETS_PATH = "/assets";

    private app:Application;
    private menu:Menu;
    private model:AppModel;

    constructor()
    {
        this.model = AppModel.getInstance();
        this.createApp().then(() => {
            this.preloadAssets().then(() => {
                this.createMenu();
            });
        });
    }

    private async createApp():Promise<void>
    {
        const pixiAppConfig = {
            antialias: true,
            background: "#000000",
            width: 1366,
            height: 768,
            canvas: document.getElementById('pixi-canvas') as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        };
        this.app = new Application();
        this.app.stage.label = "Marking Activity";
        await this.app.init(pixiAppConfig);
    }

    private createMenu():void
    {
        this.menu = new Menu();
        this.app.stage.addChild(this.menu);
    }

    private onLoadProgress = (progress:Number):void =>
    {
        console.log("onLoadProgress: "+progress+"%");
    }

    private async preloadAssets():Promise<void>
    {
        const bundle = [
            {
                alias: "menuBg",
                src: `${this.ROOT_ASSETS_PATH}/img/menu-bg.jpg`
            },
            {
                alias:"sweaterschoolreg",
                src:`${this.ROOT_ASSETS_PATH}/fonts/bingo.ttf`
            },
        ];

        await Assets.init();
        Assets.addBundle("bingo", bundle);
        this.model.assets = await Assets.loadBundle('bingo', this.onLoadProgress);
        return Promise.resolve();
    }
}