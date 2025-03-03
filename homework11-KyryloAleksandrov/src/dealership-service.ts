import { Dealership } from './dealership';
import { Type } from './type';
import { Vehicle } from './vehicle';

export class DealershipService{
    private _dealership: Dealership;

    public constructor(_dealership: Dealership){
        this._dealership = _dealership;
    }

    public findPriceRange(lowerSide: number, upperSide: number): Vehicle[]{
        if(upperSide < lowerSide) {
            throw new Error('Upper side of the range cannot be lower than Lower side');
        }
        if(lowerSide <= 0 || upperSide <= 0) {
            throw new Error('Incorrect range selected');
        }
        return this._dealership.findPriceRange(lowerSide, upperSide);
    }

    public findSpecificType(type: Type): Vehicle[]{
        return this._dealership.findSpecificType(type);
    }

    public calculateVehiclePrice(vehicle: Vehicle): number{
        return this._dealership.calculateVehiclePrice(vehicle);
    }

    public getVehicleInfo(vehicle: Vehicle): string{
        return this._dealership.getVehicleInfo(vehicle);
    }

    public findCheapestCar(vehicles: Vehicle[]): Vehicle{
        return this._dealership.findCheapestCar(vehicles);
    }
}
