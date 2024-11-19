export class User{

    private readonly id?: number;
    private readonly createdAt: number;
    private email: string;
    private userName: string;
    private password: string;

    constructor(user: {
        email: string, 
        userName: string, 
        password: string
    }){
        this.validate(user);
        this.email = user.email;   
        this.userName = user.userName;
        this.password = user.password;
        this.createdAt = Date.now();
    }
    
    getId(): number | undefined{
        return this.id;
    }

    getEmail(): string{
        return this.email;
    }

    getUserName(): string{
        return this.userName;
    }

    getPassword(): string{
        return this.password;
    }

    getCreatedAt(): number{
        return this.createdAt;
    }

    setEmail(email: string){
        this.checkEmail(email);
        this.email = email;
    }

    setUserName(userName: string) {
        this.checkUserName(userName);
        this.userName = userName;
    }

    setPassword(password: string){
        this.checkPassword(password);
        this.password = password;
    }

    private checkEmail(email: string){
        const re = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
        if(!email.toLowerCase().match(re))
            throw new Error('email is not valid');
    }

    private checkUserName(userName: string){
        //TODO: check if userName exists in repo
        this.userName = userName;
    }

    private checkPassword(password: string){
        if(password.length < 10)
            throw new Error('password is too short');
    }

    validate(user: {
        email: string, 
        userName: string, 
        password: string
    }) {
        this.checkEmail(user.email);
        this.checkUserName(user.userName);
        this.checkPassword(user.password);
    }
    
    equals(user: User): boolean{
        return (
            this.id === user.getId() &&
            this.createdAt == user.getCreatedAt() &&
            this.email === user.email && 
            this.userName === user.userName &&
            this.password === user.password
        )
    }
};
