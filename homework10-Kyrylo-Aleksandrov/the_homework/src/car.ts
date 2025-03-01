import { Vehicle } from './vehicle';

export class Car extends Vehicle{
    private doorsAmount: number;

    public constructor (maker: string, model: string, doorsAmount: number){
        super(maker, model);
        this.doorsAmount = doorsAmount;
    }

    public startEngine(): string {
        return 'Car ' + this.maker + ' ' + this.model + ' is running';
    }
    public calculateFuelEfficiency(): number {
        return 60;
    }
}
