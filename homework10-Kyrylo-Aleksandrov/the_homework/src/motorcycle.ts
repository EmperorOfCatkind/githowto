import { Vehicle } from './vehicle';

export class Motorcycle extends Vehicle{
    private hasSidecar: boolean;

    public constructor (maker: string, model: string, hasSidecar: boolean){
        super(maker, model);
        this.hasSidecar = hasSidecar;
    }

    public startEngine(): string {
        return 'Motorcycle ' + this.maker + ' ' + this.model + ' is running';
    }
    public calculateFuelEfficiency(): number {
        return 40;
    }
}
