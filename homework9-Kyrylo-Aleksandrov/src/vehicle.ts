export abstract class Vehicle{
    protected maker: string;
    protected model: string;

    protected constructor(maker: string, model: string){
        this.maker = maker;
        this.model = model;
    }

    public abstract startEngine(): void;
    public abstract calculateFuelEfficiency(): number;

    public getVehicleInfo(): string{
        return 'This is ' +  this.maker + ' ' + this.model;
    }
}
