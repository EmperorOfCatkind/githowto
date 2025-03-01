import { expect } from 'chai';
import { Car } from 'src/car';
import { Motorcycle } from 'src/motorcycle';
import { Truck } from 'src/truck';

describe('Vehicle Service Unit Test Suite', () => {
    it('Can start the engine of a car', () => {
        const obj = new Car('Ferrari', 'LaFerrari', 2);

        const runningEngine = obj.startEngine();

        expect(runningEngine).to.equal('Car Ferrari LaFerrari is running');
    });

    it('Fuel efficiency of a truck is 50', () => {
        const obj = new Truck('Scandia', 'Nova', 2000);

        const fuelEfficiency = obj.calculateFuelEfficiency();

        expect(fuelEfficiency).to.be.equal(50);
    });

    it('Can get correct info about a vehicle', () => {
        const obj = new Motorcycle('Chopper', 'Mustang', false);

        const vehicleInfo = obj.getVehicleInfo();

        expect(vehicleInfo).to.equal('This is Chopper Mustang');
    });

});
