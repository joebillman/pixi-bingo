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