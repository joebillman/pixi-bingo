import DisplayContainer from "../components/DisplayContainer.ts";
import DisplayContainerOptions from "../interfaces/DisplayContainerOptions.ts";
import AppModel from "../models/AppModel.ts";
import {Container, Graphics, Sprite, Text} from "pixi.js";

export default class Game extends DisplayContainer
{
    private CHIP_COLOR:string = "0xFF0000";//this.getRandomHexColor();
    private PADDING:number = 20;

    private card:Graphics;
    private chipDict:Map<string, Graphics>;
    private model:AppModel;
    private spaceContainer:Container;
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
        this.label = "Game";
        this.model = AppModel.getInstance();
        if(this.options.autoCreate)
        {
            this.create(this.options.showAfterCreate);
        }
    }

    private createBingoText():void
    {
        const bingoText = new Text({
            text: "Bingo",
            style: { fontFamily:"bingo", fontSize: 82, fill: "0xFFFFFF" },
        });
        bingoText.anchor.set(0.5);
        bingoText.x = this.card.width/2;
        bingoText.y = (this.card.height-this.spaceContainer.height-this.PADDING)/2;
        this.card.addChild(bingoText);
    }

    private createCard():void
    {
        let desiredWidth = 800;
        let desiredHeight = 880;
        const widthToHeightRatio = desiredWidth / desiredHeight;

        this.card = new Graphics();
        this.card.roundRect(0, 0, desiredWidth, desiredHeight, 16);
        this.card.fill(this.getRandomHexColor());

        if(desiredWidth < this.model.stageWidth && desiredHeight < this.model.stageHeight)
        {
            // do nothing
        }
        else
        {
            desiredWidth = this.model.stageWidth * 0.96;
            desiredHeight = desiredHeight * widthToHeightRatio;
            this.card = new Graphics();
            this.card.roundRect(0, 0, desiredWidth, desiredHeight, 16);
            this.card.fill(this.getRandomHexColor());
        }

        this.card.pivot.set(this.card.width/2, this.card.height/2);
        this.card.x = this.model.centerX;
        this.card.y = this.model.centerY;
        this.addChild(this.card);
    }

    private createChip(space:Graphics, id:string):void
    {
        const radius = ((this.card.width-this.PADDING*2) / 6)/2;
        const chip = new Graphics();
        chip.circle(0, 0, radius);
        chip.fill(this.CHIP_COLOR);
        chip.stroke("0x000000");
        chip.alpha = 0.75;
        chip.visible = false;
        chip.x = space.width/2;
        chip.y = space.height/2;
        space.addChild(chip);
        this.chipDict.set(id, chip);
    }

    private createFreeSpace(container:Graphics):void
    {
        const freeSpaceText = new Text({
            text: "Free",
            style: { fontFamily:"bingo", fontSize: 24, fill: "0x000000" },
        });
        freeSpaceText.anchor.set(0.5);
        freeSpaceText.x = container.width/2;
        freeSpaceText.y = container.height/2;
        container.addChild(freeSpaceText);
    }

    private createImageSprite(spriteId:string, container:Graphics):void
    {
        const sprite = Sprite.from(spriteId);
        const scale = (container.width-this.PADDING/2) / Math.max(sprite.width, sprite.height);
        sprite.scale.set(scale);
        sprite.anchor.set(0.5);
        sprite.x = container.width/2;
        sprite.y = container.height/2;
        container.addChild(sprite);
    }

    private createSpaces():void
    {
        this.spaceContainer = new Container();
        const spaceSize = (this.card.width-this.PADDING*2) / 5;
        let curSpace:Graphics;
        const startX:number = 0;
        let curX:number = startX;
        let curY:number =0;
        const len = 25;
        for(let i:number=0; i<len; i++)
        {
            curSpace = new Graphics();
            curSpace.label = this.spriteIds[i];
            curSpace.cursor = "pointer";
            curSpace.eventMode = "static";
            curSpace.onpointertap = this.onSpaceClick;
            curSpace.rect(0, 0, spaceSize, spaceSize);
            curSpace.fill("0xFFFFFF");
            curSpace.stroke("0x000000");
            curSpace.x = curX;
            curSpace.y = curY;
            this.spaceContainer.addChild(curSpace);
            if(i == 12)
            {
                this.createFreeSpace(curSpace);
            }
            else
            {
                this.createImageSprite(this.spriteIds[i], curSpace);
            }
            this.createChip(curSpace, this.spriteIds[i]);
            curX += spaceSize;
            if(i % 5 == 4)
            {
                curX = startX;
                curY += spaceSize;
            }
        }
        this.spaceContainer.x = this.card.x-this.card.pivot.x+this.PADDING;
        this.spaceContainer.y = (this.card.y+this.card.pivot.y-this.PADDING)-this.spaceContainer.height;
        this.addChild(this.spaceContainer);
    }

    private getRandomHexColor(): string
    {
        const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }

    private onSpaceClick = (event:any):void =>
    {
        const id = event.target.label;
        this.chipDict.get(id).visible = !this.chipDict.get(id).visible;
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
        this.createCard();
        this.populateSpriteIds();
        this.chipDict = new Map<string, Graphics>();
        this.createSpaces();
        this.createBingoText();
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