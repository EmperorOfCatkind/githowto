import { ElectricCar } from './electric-car';
import { Truck } from './truck';
import { Type } from './type';
import { Vehicle } from './vehicle';

export class Dealership{
    public vehicles: Vehicle[];

    public constructor(vehicles: Vehicle[]){
        this.vehicles = vehicles;
    }

    public findPriceRange(lowSide: number, highSide: number): Vehicle[]{
        return this.vehicles.filter((vehicle) => vehicle.startingPrice > lowSide && vehicle.startingPrice < highSide);
    }

    public findSpecificType(type: Type): Vehicle[]{
        return this.vehicles.filter((vehicle) => vehicle.type == type);
    }

    public calculateVehiclePrice(vehicle: Vehicle): number{
        let finalPrice = vehicle.startingPrice;
        const fuelTax = 10;
        const fuelTaxBrake = 50;
        const fuelSubsidy = 50;
        const cargoTax = 100;

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

    public getVehicleInfo(vehicle: Vehicle): string{
        return vehicle.getVehicleInfo();
    }

    public findCheapestCar(vehicles: Vehicle[]): Vehicle{
        return vehicles.reduce((cheapest, vehicle) =>
            vehicle.startingPrice < cheapest.startingPrice ? vehicle : cheapest);
    }
}
