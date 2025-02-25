abstract class GameCharacter{
    public constructor(public name: string, public health: number, public inventory: string[]){}

    public abstract attack(): void;

    public takeDamage(damage: number): void{
        this.health -= damage;
        if(this.health > 0){
            console.log(this.name + ' has ' + this.health + ' left!');
        }
        if(this.health <= 0){
            console.log(this.name + ' has died!');
        }
    }

    public addItem(item: string): void{
        this.inventory.push(item);
    }

    public displayInventory(): void{
        console.log(this.name + ' has: ' + this.inventory.join(' '));
    }
}

export class Warrior extends GameCharacter{
    public attack(): void {
        console.log(this.name + ' swings a sword!');
    }
}

export class Mage extends GameCharacter{
    public attack(): void {
        console.log(this.name + ' casts a fireball!');
    }
}

export class Archer extends GameCharacter{
    public attack(): void {
        console.log(this.name + ' shoots an arrow!');
    }
}
