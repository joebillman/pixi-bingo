import { Application } from 'pixi.js';

export default class PixiBingo
{

    private app:Application;

    constructor()
    {
        this.createApp();
        this.preloadAssets();
    }

    private createApp()
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
    }

    private preloadAssets()
    {
        // Load assets here
    }
}