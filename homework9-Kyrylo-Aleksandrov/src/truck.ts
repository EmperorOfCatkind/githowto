import { Vehicle } from './vehicle';

export class Truck extends Vehicle{
    private cargoCapacity: number;

    public constructor (maker: string, model: string, hasSidecar: number){
        super(maker, model);
        this.cargoCapacity = hasSidecar;
    }

    public startEngine(): void {
        console.log('Truck ' + this.maker + ' ' + this.model + ' is running');
    }
    public calculateFuelEfficiency(): number {
        return 50;
    }
}
