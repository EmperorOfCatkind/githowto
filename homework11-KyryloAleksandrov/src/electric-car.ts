import { IElectricCar } from './i-electric-vehicle';
import { Type } from './type';
import { Vehicle } from './vehicle';

export class ElectricCar extends Vehicle implements IElectricCar{
    private batteryCapacity: number;

    public constructor (maker: string, model: string, startingPrice: number, type: Type, batteryCapacity: number){
        super(maker, model, startingPrice, type);
        this.batteryCapacity = batteryCapacity;

        this.setType(Type.ElectricCar);
    }

    public startEngine(): string {
        return 'Electric Car ' + this.maker + ' ' + this.model + ' is running';
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
