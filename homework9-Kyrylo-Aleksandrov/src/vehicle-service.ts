import { Vehicle } from './vehicle';
import { ElectricCar } from './electric-car';

export class VehicleService {
    public static checkVehicle(vehicle: Vehicle): void{
        console.log('----------');
        console.log(vehicle.getVehicleInfo());
        vehicle.startEngine();
        console.log('Fuel efficiency ' + vehicle.calculateFuelEfficiency() + ' mpg');

        if(vehicle instanceof ElectricCar){
            console.log('Battery range ' + vehicle.calculateBatteryRange() + ' miles');
        }
        console.log('----------');
    }
}
