import { Vehicle } from './vehicle';
import { ElectricCar } from './electric-car';
import { Truck } from './truck';

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

    public static calculateVehiclePrice(vehicle: Vehicle): number{
        let finalPrice = vehicle.startingPrice;
        const startingPrice = 100;
        const fuelTax = 10;
        const fuelTaxBrake = 50;
        const fuelSubsidy = 50;
        const cargoTax = 100;

        finalPrice += startingPrice;

        if(vehicle.calculateFuelEfficiency() <= fuelTaxBrake){
            finalPrice += (fuelTaxBrake - vehicle.calculateFuelEfficiency()) * fuelTax;
        }

        if(vehicle instanceof ElectricCar){
            finalPrice -= fuelSubsidy;
        }

        if(vehicle instanceof Truck) {
            const truck = vehicle as Truck;
            finalPrice += truck.cargoCapacity / cargoTax;
        }

        console.log(finalPrice);
        return finalPrice;
    }
}
