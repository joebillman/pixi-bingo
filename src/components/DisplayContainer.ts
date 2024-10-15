import { Container } from 'pixi.js';
import IDisplayContainer from "../interfaces/IDisplayContainer.ts";
import DisplayContainerOptions from "../interfaces/DisplayContainerOptions.ts";

export default class DisplayContainer extends Container implements IDisplayContainer
{
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Protected:
    //----------------------------------

    protected options:DisplayContainerOptions;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor()
    {
        super();
        this.label = "DisplayContainer";
        this.visible = false;
    }

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Public:
    //----------------------------------

    public create():void
    {
        console.log("DisplayContainer.create() called. Override this method in your subclass.");
    }

    public destroy():void
    {
        let curChild: Container;
        const len = this.children.length;
        for (let i: number = 0; i < len; i++) {
            curChild = this.getChildAt(0);
            if (curChild.destroy != undefined) {
                curChild.destroy();
            }
            if (curChild.removeAllListeners != undefined) {
                curChild.removeAllListeners();
            }
            if (curChild.removeChildren != undefined) {
                curChild.removeChildren();
            }
            curChild = null;
        }
        this.removeAllListeners();
        this.removeChildren();
    }

    public disable():void
    {
        this.eventMode = "passive";
        this.interactiveChildren = false;
    }

    public enable():void
    {
        this.eventMode = "static";
        this.interactiveChildren = true;
    }

    public hide():void
    {
        this.visible = false;
    }

    public show():void
    {
        this.visible = true;
    }
}