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

    let instance: sinon.SinonStubbedInstance<Dealership>;
    let service: DealershipService;

    let toyota: Car;
    let peugeot: Car;
    let renault: Car;
    let lamborghini: Car;

    let fiat: Motorcycle;
    let skoda: Truck;
    let tesla: ElectricCar;

    beforeEach(() => {
        toyota = new Car('Toyota', 'Camry', 120, Type.Car, 4);
        peugeot = new Car('Peugeot', 'Logo', 130, Type.Car, 4);
        renault = new Car('Renault', 'Tiara', 140, Type.Car, 4);
        lamborghini = new Car('Lamborghini', 'Tiara', 180, Type.Car, 4);

        fiat = new Motorcycle('Fiat', 'Cortina', 135, Type.Motorcycle, false);
        skoda = new Truck('Skoda', 'Fabia', 180, Type.Truck, 2000);
        tesla = new ElectricCar('Tesla', 'X', 190, Type.ElectricCar, 200);

        instance = sinon.createStubInstance(Dealership);
        service = new DealershipService(instance);
    });

    describe('findPriceRange tests', () =>{

        const priceBetween100and200: Vehicle[] = [toyota, fiat, skoda, tesla] as Vehicle[];

        it('findPriceRange accepts correct input and returns data', () => {
            instance.findPriceRange.returns(priceBetween100and200);
            const result = service.findPriceRange(100, 200);

            expect (result).to.be.equal(priceBetween100and200);
            expect(instance.findPriceRange.calledOnce).to.be.true;
            expect(instance.findPriceRange.calledOnceWith(100, 200)).to.be.true;
            expect(instance.findPriceRange.calledTwice).to.be.false;
            expect(instance.findPriceRange.calledOnceWith(200, 100)).to.throw;
        });
    });

    describe('findSpecificType tests', () =>{

        const carArray: Vehicle[] = [toyota, peugeot, renault, lamborghini] as Vehicle[];

        it('findSpecificType returns data', () => {
            instance.findSpecificType.returns(carArray);
            const result = service.findSpecificType(Type.Car);

            expect (result).to.be.equal(carArray);
            expect(instance.findSpecificType.calledOnceWith(Type.Car)).to.be.true;
        });
    });

    describe('calculateVehiclePrice tests', () =>{

        it('calculateVehiclePrice returns data', () => {
            const price = instance.calculateVehiclePrice(toyota);
            instance.calculateVehiclePrice.returns(price);
            const result = service.calculateVehiclePrice(toyota);

            expect (result).to.be.equal(price);
        });
    });

    describe('getVehicleInfo tests', () =>{

        it('getVehicleInfo returns data', () => {
            const info = lamborghini.getVehicleInfo();
            instance.getVehicleInfo.returns(info);
            const result = service.getVehicleInfo(lamborghini);

            expect (result).to.be.equal(info);
        });
    });

    describe('findCheapestCar tests', () =>{

        const carArray: Vehicle[] = [toyota, peugeot, renault, lamborghini] as Vehicle[];

        it('findCheapestCar returns data', () => {
            instance.findCheapestCar.returns(toyota);
            const result = service.findCheapestCar(carArray);

            expect (result).to.be.equal(toyota);
        });
    });
});
