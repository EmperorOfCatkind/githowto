import { Warrior } from './abstraction';
import { Mage } from './abstraction';
import { Archer } from './abstraction';

const warriorInventory: string[] = ['sword', 'shield'];
const mageInventory: string[] = ['grimoire', 'staff'];;
const archerInventory: string[] = ['bow', 'arrow'];;

const warrior = new Warrior('Mighty Mike', 100, warriorInventory);
const mage = new Mage('Wise William', 50, mageInventory);
const archer = new Archer('Swift Sully', 80, archerInventory);

warrior.addItem('helmet');
warrior.addItem('armor');
warrior.displayInventory();

mage.attack();

archer.takeDamage(30);

mage.takeDamage(100);
