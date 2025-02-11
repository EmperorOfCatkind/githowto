const user = {
    name: "John",
    surname: "Smith",
    age: 30,
    job: {
        company: "Microsoft",
        position: "developer"
    },

    get first_name(){
        return this.name;
    },
    set first_name(newName){
        this.name = newName;
    },

    get last_name(){
        return this.surname;
    },
    set last_name(newName){
        this.surname = newName;
    },

    get the_age(){
        return this.age;
    },
    set the_age(newAge){
        this.age = newAge;
    },

    get employment(){
        return this.job;
    },
    set employment(newJob){
        this.job = newJob;
    },

    getFullUserInfo(){
        return "Full name: " + this.name + " " + this.surname + "; Age: " + this.age + "; Place of work: " + this.job.position + " at " + this.job.company + ";";
    }
};

console.log(user.getFullUserInfo());
user.first_name = "Alice";
user.last_name = "Cooper";
user.the_age = 25;
user.employment = {company: "Apple", position: "designer"};
console.log(user.getFullUserInfo());
