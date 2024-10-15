import DisplayContainer from "../components/DisplayContainer.ts";
import DisplayContainerOptions from "../interfaces/DisplayContainerOptions.ts";
import AppModel from "../models/AppModel.ts";
import {Graphics, Sprite, Text} from "pixi.js";
import {ScrollBox} from "@pixi/ui";

export default class Caller extends DisplayContainer
{

    private currentSpriteIndex:number = 0;
    private model:AppModel;
    private pullBtn:Graphics;
    private scrollBox:ScrollBox;
    private spriteIds:Array<string>;

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

    private _init()
    {
        this.label = "Caller";
        this.model = AppModel.getInstance();
        if(this.options.autoCreate)
        {
            this.create(this.options.showAfterCreate);
        }
    }

    private createBackground()
    {
        const bg = Sprite.from("menuBg");
        bg.anchor.set(0.5);
        bg.x = this.model.centerX;
        bg.y = this.model.centerY;
        if(this.model.stageWidth > this.model.stageHeight)
        {
            bg.scale.set(this.model.stageWidth / bg.width);
        }
        else
        {
            bg.scale.set(this.model.stageHeight / bg.height);
        }
        this.addChild(bg);
    }

    private createPullBtn():void
    {
        this.pullBtn = new Graphics();
        this.pullBtn.cursor = "pointer";
        this.pullBtn.eventMode = "static";
        this.pullBtn.onpointertap = this.onPointerTap;
        this.pullBtn.circle(0, 0, 100);
        this.pullBtn.fill(0x00FF00);
        this.pullBtn.pivot.set(0.5);
        this.pullBtn.x = this.model.centerX;
        this.pullBtn.y = this.model.stageHeight*0.35;
        let pullText = new Text({ text: "Pull", style: { fontFamily:"bingo", fontSize: 48, fill: "0x000000" } });
        pullText.anchor.set(0.5);
        this.pullBtn.addChild(pullText);
        this.addChild(this.pullBtn);
    }

    private createScrollBox():void
    {
        this.scrollBox = new ScrollBox({
            background: 0XFFFFFF,
            width: this.model.stageWidth*0.9,
            height: this.model.stageHeight*0.25,
            padding: 20,
            elementsMargin: 20,
        });
        this.scrollBox.pivot.set(this.scrollBox.width/2, this.scrollBox.height/2);
        this.scrollBox.x = this.model.centerX;
        this.scrollBox.y = (this.model.stageHeight-this.scrollBox.height/2)-40;
        this.addChild(this.scrollBox);
    }

    private onPointerTap = ():void =>
    {
        const sprite = Sprite.from(this.spriteIds[this.currentSpriteIndex]);
        this.currentSpriteIndex++;
        this.scrollBox.addItem(sprite);
    }

    private populateSpriteIds():void
    {
        this.spriteIds = [];
        this.spriteIds.push("amongUs");
        this.spriteIds.push("bbq");
        this.spriteIds.push("burrito");
        this.spriteIds.push("chips");
        this.spriteIds.push("cSharp");
        this.spriteIds.push("drone");
        this.spriteIds.push("frisbee");
        this.spriteIds.push("gummyBears");
        this.spriteIds.push("iceCream");
        this.spriteIds.push("javascript");
        this.spriteIds.push("laptop");
        this.spriteIds.push("licorice");
        this.spriteIds.push("monitor");
        this.spriteIds.push("mountainBike");
        this.spriteIds.push("mouse");
        this.spriteIds.push("pickleball");
        this.spriteIds.push("pixi");
        this.spriteIds.push("popCorn");
        this.spriteIds.push("postgres");
        this.spriteIds.push("programmer");
        this.spriteIds.push("rcCar");
        this.spriteIds.push("react");
        this.spriteIds.push("soda");
        this.spriteIds.push("tv");
        this.spriteIds.push("vr");
        this.spriteIds = this.shuffleArray(this.spriteIds);
    }

    private setDefaultOptions():void
    {
        this.options = {
            autoCreate: true,
            showAfterCreate: true
        };
    }

    private shuffleArray<T>(array: T[]): T[]
    {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    public override create(showAfterCreate:boolean=true):void
    {
        this.populateSpriteIds();
        this.createBackground();
        this.createPullBtn();
        this.createScrollBox();
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