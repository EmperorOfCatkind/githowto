import { Vehicle } from './vehicle';

export class Truck extends Vehicle{
    private _cargoCapacity: number;

    public constructor (maker: string, model: string, cargoCapacity: number){
        super(maker, model);
        this._cargoCapacity = cargoCapacity;
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
