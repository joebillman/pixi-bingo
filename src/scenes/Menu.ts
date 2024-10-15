import DisplayContainer from "../components/DisplayContainer.ts";
import {Sprite} from "pixi.js";
import DisplayContainerOptions from "../interfaces/DisplayContainerOptions.ts";
import AppModel from "../models/AppModel.ts";

export default class Menu extends DisplayContainer
{
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Private:
    //----------------------------------

    private bg:Sprite;
    private logoBottom:Sprite;
    private model:AppModel;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor(options?:DisplayContainerOptions)
    {
        super();
        if(options)
        {
            this.options = options;
        }
        else
        {
            this.setDefaultOptions();
        }
        this._init();
    }

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Private:
    //----------------------------------

    private _init()
    {
        this.label = "Menu";
        this.model = AppModel.getInstance();
        if(this.options.autoCreate)
        {
            this.create(this.options.showAfterCreate);
        }
    }

    private createBackground()
    {
        this.bg = Sprite.from("menuBg");
        this.bg.anchor.set(0.5);
        this.bg.x = this.model.centerX;
        this.bg.y = this.model.centerY;
        if(this.model.stageWidth > this.model.stageHeight)
        {
            this.bg.scale.set(this.model.stageWidth / this.bg.width);
        }
        else
        {
            this.bg.scale.set(this.model.stageHeight / this.bg.height);
        }
        this.addChild(this.bg);
    }

    private createBtns():void
    {
        const desiredWidth = this.model.stageWidth * 0.7;
        const desiredHeight = this.model.stageHeight * 0.1;

        const playBtn = Sprite.from("playBtn");
        playBtn.cursor = "pointer";
        playBtn.eventMode = "static";
        playBtn.onpointertap = () => {
            this.emit("play");
        }
        playBtn.anchor.set(0.5);
        if(playBtn.width > desiredWidth)
        {
            const desiredScale = desiredWidth / playBtn.width;
            playBtn.scale.set(desiredScale);
        }
        if(playBtn.height > desiredHeight)
        {
            const desiredScale = desiredHeight / playBtn.height;
            playBtn.scale.set(desiredScale);
        }
        playBtn.x = this.model.centerX;
        playBtn.y = this.logoBottom.y + this.logoBottom.height / 2 + playBtn.height / 2 + 20;
        this.addChild(playBtn);

        const callerBtn = Sprite.from("callerBtn");
        callerBtn.cursor = "pointer";
        callerBtn.eventMode = "static";
        callerBtn.onpointertap = () => {
            this.emit("caller");
        }
        callerBtn.anchor.set(0.5);
        if(callerBtn.width > desiredWidth)
        {
            const desiredScale = desiredWidth / callerBtn.width;
            callerBtn.scale.set(desiredScale);
        }
        if(callerBtn.height > desiredHeight)
        {
            const desiredScale = desiredHeight / callerBtn.height;
            callerBtn.scale.set(desiredScale);
        }
        callerBtn.x = this.model.centerX;
        callerBtn.y = playBtn.y + playBtn.height+20;
        this.addChild(callerBtn);
    }

    private createLogo():void
    {
        const desiredWidth = this.model.stageWidth * 0.7;

        this.logoBottom = Sprite.from("logoBtm");
        this.logoBottom.anchor.set(0.5);
        if(this.logoBottom.width > desiredWidth)
        {
            const desiredScale = desiredWidth / this.logoBottom.width;
            this.logoBottom.scale.set(desiredScale);
        }
        this.logoBottom.x = this.model.centerX;
        this.logoBottom.y = this.model.centerY;
        this.addChild(this.logoBottom);

        const logoTop = Sprite.from("logoTop");
        logoTop.anchor.set(0.5);
        if(logoTop.width > desiredWidth)
        {
           const desiredScale = desiredWidth / logoTop.width;
            logoTop.scale.set(desiredScale);
        }
        logoTop.x = this.model.centerX;
        logoTop.y = this.logoBottom.y - this.logoBottom.height / 2 - logoTop.height / 2;
        this.addChild(logoTop);
    }

    private setDefaultOptions():void
    {
        this.options = {
            autoCreate: true,
            showAfterCreate: true
        };
    }

    //----------------------------------
    //  Public:
    //----------------------------------

    public override create(showAfterCreate:boolean=true):void
    {
        this.createBackground();
        this.createLogo();
        this.createBtns();
        if(showAfterCreate)
        {
            this.show();
        }
    }

    public override destroy():void
    {
        super.destroy();
    }
}