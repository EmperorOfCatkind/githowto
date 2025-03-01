import { expect } from 'chai';
import { Car } from 'src/car';
import { ElectricCar } from 'src/electric-car';
import { Motorcycle } from 'src/motorcycle';
import { Truck } from 'src/truck';
import { VehicleService } from 'src/vehicle-service';

describe('Vehicle price calculations Test Suite', () => {
    it('Average car ', () => {
        const obj = new Car('Dodge', 'Viper', 4);

        const price = VehicleService.calculateVehiclePrice(obj);

        expect(price).to.be.equal(100);
    });

    it('Fuel inefficient car ', () => {
        const obj = new Motorcycle('Honda', 'Chorizo', false);

        const price = VehicleService.calculateVehiclePrice(obj);

        expect(price).to.be.equal(200);
    });

    it('Electric car ', () => {
        const obj = new ElectricCar('Mitsubishi', 'Electra', 4);

        const price = VehicleService.calculateVehiclePrice(obj);

        expect(price).to.be.equal(50);
    });

    it('Truck ', () => {
        const obj = new Truck('UAZ', 'Trailblazer', 3000);

        const price = VehicleService.calculateVehiclePrice(obj);

        expect(price).to.be.equal(130);
    });

});
