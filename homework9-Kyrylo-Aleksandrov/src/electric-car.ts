import { IElectricCar } from './i-electric-vehicle';
import { Vehicle } from './vehicle';

export class ElectricCar extends Vehicle implements IElectricCar{
    private batteryCapacity: number;

    public constructor (maker: string, model: string, batteryCapacity: number){
        super(maker, model);
        this.batteryCapacity = batteryCapacity;
    }

    public startEngine(): void {
        console.log('Electric Car ' + this.maker + ' ' + this.model + ' is running');
    }
    public calculateFuelEfficiency(): number {
        return 100;
    }

    public recharge(): void {
        console.log(this.maker + ' ' + this.model + ' is fully charged');
    }
    public calculateBatteryRange(): number {
        const rangePerKWh = 5;
        return this.batteryCapacity * rangePerKWh;
    }
}
