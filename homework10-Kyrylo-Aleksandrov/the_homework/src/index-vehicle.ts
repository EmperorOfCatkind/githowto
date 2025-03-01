import { Car } from './car';
import { ElectricCar } from './electric-car';
import { Motorcycle } from './motorcycle';
import { Truck } from './truck';
import { VehicleService } from './vehicle-service';

const newCar = new Car('Toyota', 'Camry', 4);
const newMotorcycle = new Motorcycle('Harley-Davidson', 'Street 750', false);
const newElectricCar = new ElectricCar('Tesla', 'Model 3', 75);
const newTruck = new Truck('Ford', 'F-150', 3000);

/*VehicleService.checkVehicle(newCar);
VehicleService.checkVehicle(newMotorcycle);
VehicleService.checkVehicle(newElectricCar);
VehicleService.checkVehicle(newTruck);*/

VehicleService.calculateVehiclePrice(newCar);
VehicleService.calculateVehiclePrice(newMotorcycle);
VehicleService.calculateVehiclePrice(newElectricCar);
VehicleService.calculateVehiclePrice(newTruck);
