import sinon from 'ts-sinon';
import { Vehicle } from 'src/vehicle';
import { Type } from 'src/type';
import { Car } from 'src/car';
import { Dealership } from 'src/dealership';
import { DealershipService } from 'src/dealership-service';
import { expect } from 'chai';
import { Motorcycle } from 'src/motorcycle';
import { Truck } from 'src/truck';
import { ElectricCar } from 'src/electric-car';

describe('DealershipService tests', () =>{

    const instance = sinon.createStubInstance(Dealership);
    const service = new DealershipService(instance);

    describe('findPriceRange tests', () =>{
        const toyota = new Car('Toyota', 'Camry', 120, Type.Car, 4);
        const fiat = new Motorcycle('Fiat', 'Cortina', 135, Type.Motorcycle, false);
        const skoda = new Truck('Skoda', 'Fabia', 180, Type.Truck, 2000);
        const tesla = new ElectricCar('Tesla', 'X', 190, Type.ElectricCar, 200);

        const priceBetween100and200: Vehicle[] = [toyota, fiat, skoda, tesla] as Vehicle[];

        instance.findPriceRange.returns(priceBetween100and200);

        it('findPriceRange accepts correct input and returns data', () => {
            const result = service.findPriceRange(100, 200);

            expect (result).to.be.equal(priceBetween100and200);
            expect(instance.findPriceRange.calledOnce).to.be.true;
            expect(instance.findPriceRange.calledOnceWith(100, 200)).to.be.true;
            expect(instance.findPriceRange.calledTwice).to.be.false;
            expect(instance.findPriceRange.calledOnceWith(200, 100)).to.throw;
        });
    });

    describe('findSpecificType tests', () =>{

        const toyota = new Car('Toyota', 'Camry', 120, Type.Car, 4);
        const fiat = new Car('Fiat', 'Cortina', 135, Type.Car, 4);
        const skoda = new Car('Skoda', 'Fabia', 180, Type.Car, 4);
        const tesla = new Car('Tesla', 'X', 190, Type.Car, 4);

        const carArray: Vehicle[] = [toyota, fiat, skoda, tesla] as Vehicle[];

        instance.findSpecificType.returns(carArray);

        it('findSpecificType returns data', () => {
            const result = service.findSpecificType(Type.Car);

            expect (result).to.be.equal(carArray);
            expect(instance.findSpecificType.calledOnceWith(Type.Car)).to.be.true;
        });
    });

    describe('calculateVehiclePrice tests', () =>{

        const toyota = new Car('Toyota', 'Camry', 120, Type.Car, 4);
        const price = instance.calculateVehiclePrice(toyota);

        instance.calculateVehiclePrice.returns(price);

        it('calculateVehiclePrice returns data', () => {
            const result = service.calculateVehiclePrice(toyota);

            expect (result).to.be.equal(price);
        });
    });

    describe('getVehicleInfo tests', () =>{
        const fiat = new Car('Fiat', 'Cortina', 135, Type.Car, 4);

        const info = fiat.getVehicleInfo();

        instance.getVehicleInfo.returns(info);
        it('getVehicleInfo returns data', () => {
            const result = service.getVehicleInfo(fiat);

            expect (result).to.be.equal(info);
        });
    });

    describe('findCheapestCar tests', () =>{

        const toyota = new Car('Toyota', 'Camry', 120, Type.Car, 4);
        const fiat = new Car('Fiat', 'Cortina', 135, Type.Car, 4);
        const skoda = new Car('Skoda', 'Fabia', 180, Type.Car, 4);
        const tesla = new Car('Tesla', 'X', 190, Type.Car, 4);

        const carArray: Vehicle[] = [toyota, fiat, skoda, tesla] as Vehicle[];

        instance.findCheapestCar.returns(toyota);

        it('findCheapestCar returns data', () => {
            const result = service.findCheapestCar(carArray);

            expect (result).to.be.equal(toyota);
        });
    });

});
