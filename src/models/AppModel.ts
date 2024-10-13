
export default class AppModel
{
    private static _instance:AppModel = new AppModel();
    public assets:any;

    public static getInstance():AppModel {
        return this._instance;
    }
}