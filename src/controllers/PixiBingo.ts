import { Application, Assets } from 'pixi.js';
import AppModel from "../models/AppModel.ts";
import Menu from "../scenes/Menu.ts";
import Game from "../scenes/Game.ts";
import Caller from "../scenes/Caller.ts";
import {Viewport} from "pixi-viewport";

export default class PixiBingo
{
    private ROOT_ASSETS_PATH = "/assets";

    private app:Application;
    private caller:Caller;
    private game:Game;
    private menu:Menu;
    private model:AppModel;
    private viewport:Viewport;

    constructor()
    {
        this.model = AppModel.getInstance();
        this.createApp().then(() => {
            this.preloadAssets().then(() => {
                this.createViewport();
                this.createMenu();
            });
        });
    }

    private async createApp():Promise<void>
    {
        const pixiAppConfig = {
            antialias: true,
            background: "#000000",
            resizeTo: window,
            canvas: document.getElementById('pixi-canvas') as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        };
        this.app = new Application();
        this.app.stage.label = "Marking Activity";
        await this.app.init(pixiAppConfig);
        this.model.app = this.app;
    }

    private createCaller():void
    {
        this.caller = new Caller();
        this.app.stage.addChild(this.caller);
    }

    private createGame():void
    {
        this.game = new Game();
        this.viewport.addChild(this.game);
    }

    private createMenu():void
    {
        this.menu = new Menu();
        this.menu.addListener("play", this.onPlay);
        this.menu.addListener("caller", this.onCaller);
        this.viewport.addChild(this.menu);
    }

    private createViewport():void
    {
        this.viewport = new Viewport({
            screenWidth: this.model.stageWidth,
            screenHeight: this.model.stageHeight,
            worldWidth: this.model.stageWidth,
            worldHeight: this.model.stageHeight,
            events: this.app.renderer.events
        });
        this.app.stage.addChild(this.viewport);
        this.viewport.drag().pinch().wheel().decelerate();
    }

    private destroyMenu():void
    {
        if(this.menu)
        {
            this.menu.destroy();
            this.app.stage.removeChild(this.menu);
            this.menu = null;
        }
    }

    private onLoadProgress = (progress:Number):void =>
    {
        console.log("onLoadProgress: "+progress+"%");
    }

    private onCaller = ():void =>
    {
        this.destroyMenu();
        this.createCaller();
    }

    private onPlay = ():void =>
    {
        this.destroyMenu();
        this.createGame();
    }

    private async preloadAssets():Promise<void>
    {
        const bundle = [
            {
                alias: "menuBg",
                src: `${this.ROOT_ASSETS_PATH}/img/menu-bg.jpg`
            },
            {
                alias: "spritesheet",
                src: `${this.ROOT_ASSETS_PATH}/img/pixi-bingo.json`
            },
            {
                alias:"bingo",
                src:`${this.ROOT_ASSETS_PATH}/fonts/bingo.ttf`
            },
        ];

        await Assets.init();
        Assets.addBundle("bingo", bundle);
        this.model.assets = await Assets.loadBundle('bingo', this.onLoadProgress);
        return Promise.resolve();
    }
}