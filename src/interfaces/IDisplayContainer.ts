import ICreate from "./ICreate.ts";
import IDestroy from "./IDestroy.ts";
import IShow from "./IShow.ts";
import IHide from "./IHide.ts";
import IDisable from "./IDisable.ts";
import IEnable from "./IEnable.ts";

export default interface IDisplayContainer extends ICreate, IDestroy, IShow, IHide, IDisable, IEnable
{

}