import DisplayContainer from "../components/DisplayContainer.ts";
import {Graphics, Sprite} from "pixi.js";
import DisplayContainerOptions from "../interfaces/DisplayContainerOptions.ts";

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

    private beginBtn:Sprite;
    private bg:Sprite;
    private exitBtn:Sprite;
    private logo:Sprite;

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
        if(this.options.autoCreate)
        {
            this.create(this.options.showAfterCreate);
        }
    }

    private createBackground()
    {
        this.bg = Sprite.from("menuBg");
        this.addChild(this.bg);
    }

    private createBeginButton():void
    {
        this.beginBtn = Sprite.from("beginBtn.png");
        /*this.beginBtn.accessible = true;
        this.beginBtn.accessibleTitle = "Begin";
        this.beginBtn.accessibleHint = "Click here to begin.";*/
    }

    private createExitButton():void
    {
        this.exitBtn = Sprite.from("exitBtn.png");
        /*this.exitBtn.accessible = true;
        this.exitBtn.accessibleTitle = "Exit";
        this.exitBtn.accessibleHint = "Click here to exit.";*/
    }

    private createLogo():void
    {
        this.logo = Sprite.from("logo.png");
        this.addChild(this.logo);
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
        if(showAfterCreate)
        {
            this.show();
        }
    }
}