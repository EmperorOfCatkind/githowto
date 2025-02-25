import { CompleteJoke} from './complete-joke';
import { Joke } from './joke';
import { Warrior } from './abstraction';
import { Mage } from './abstraction';
import { Archer } from './abstraction';
import { ApiResponse } from './api-response';


console.log('-----abstraction and inheritance-----');

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

console.log('-----json response wrapped in the class-----');

async function getJson(): Promise<ApiResponse> {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const json = await response.json() as Joke;
    return { body: json };
}

(async () => {
    const data = await getJson();
    console.log(data);
    const newJoke = new CompleteJoke(data);
    newJoke.tellJoke();
})();
