export class UserDto {
    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public phone: string;
    public userStatus: number;

    public constructor(
        id: number,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phone: string,
        userStatus: number
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.userStatus = userStatus;
    }
}
