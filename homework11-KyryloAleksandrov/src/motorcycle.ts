import { Type } from './type';
import { Vehicle } from './vehicle';

export class Motorcycle extends Vehicle{
    private hasSidecar: boolean;

    public constructor (maker: string, model: string, startingPrice: number, type: Type, hasSidecar: boolean){
        super(maker, model, startingPrice, type);
        this.hasSidecar = hasSidecar;

        this.setType(Type.Motorcycle);
    }

    public startEngine(): string {
        return 'Motorcycle ' + this.maker + ' ' + this.model + ' is running';
    }
    public calculateFuelEfficiency(): number {
        return 40;
    }
}
