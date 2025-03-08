import { Type } from './type';
import { Vehicle } from './vehicle';

export class Truck extends Vehicle{
    private _cargoCapacity: number;

    public constructor (maker: string, model: string, startingPrice: number, type: Type, cargoCapacity: number){
        super(maker, model, startingPrice, type);
        this._cargoCapacity = cargoCapacity;

        this.setType(Type.Truck);
    }

    public startEngine(): string {
        return 'Truck ' + this.maker + ' ' + this.model + ' is running';
    }
    public calculateFuelEfficiency(): number {
        return 50;
    }

    public get cargoCapacity(): number{
        return this._cargoCapacity;
    }
}
