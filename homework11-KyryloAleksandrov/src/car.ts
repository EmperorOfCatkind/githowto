import { Type } from './type';
import { Vehicle } from './vehicle';

export class Car extends Vehicle{
    private doorsAmount: number;

    public constructor (maker: string, model: string, startingPrice: number, type: Type, doorsAmount: number){
        super(maker, model, startingPrice, type);
        this.doorsAmount = doorsAmount;

        this.setType(Type.Car);
    }

    public startEngine(): string {
        return 'Car ' + this.maker + ' ' + this.model + ' is running';
    }
    public calculateFuelEfficiency(): number {
        return 60;
    }
}
