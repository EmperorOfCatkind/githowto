import { Type } from './type';
export abstract class Vehicle{
    protected maker: string;
    protected model: string;
    protected _startingPrice: number;
    protected _type: Type;

    protected constructor(maker: string, model: string, _startingPrice: number, _type: Type){
        this.maker = maker;
        this.model = model;
        this._startingPrice = _startingPrice;
        this._type = _type;
    }

    public abstract startEngine(): string;
    public abstract calculateFuelEfficiency(): number;

    public get startingPrice(): number{
        return this._startingPrice;
    }

    public get type(): Type{
        return this._type;
    }

    public getVehicleInfo(): string{
        return 'This is ' +  this.maker + ' ' + this.model;
    }

    protected setType(type: Type): void{
        this.type == type;
    }
}
