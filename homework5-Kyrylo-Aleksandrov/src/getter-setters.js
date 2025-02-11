const user = {
    _name: "John",
    _surname: "Smith",
    _age: 30,
    _job: {
        company: "Microsoft",
        position: "developer"
    },

    get name(){
        return this._name;
    },
    set name(newName){
        this.name = newName;
    },

    get surname(){
        return this._surname;
    },
    set surname(newName){
        this.surname = newName;
    },

    get age(){
        return this._age;
    },
    set age(newAge){
        this._age = newAge;
    },

    get job(){
        return this._job;
    },
    set job(newJob){
        this._job = newJob;
    },

    getFullUserInfo(){
        return "Full name: " + this._name + " " + this._surname + "; Age: " + this._age + "; Place of work: " + this._job.position + " at " + this._job.company + ";";
    }
};

console.log(user.getFullUserInfo());
user.name = "Alice";
user.surname = "Cooper";
user.age = 25;
user.job = {company: "Apple", position: "designer"};
console.log(user.getFullUserInfo());
