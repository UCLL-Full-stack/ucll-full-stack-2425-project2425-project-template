class User {
    private username: string;
    public password: string;
    private role: string;

    constructor (user: {username: string, password: string, role: string}) {
        this.validateusers(user);
        this.validatePassword(user.password);

        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    private validateusers = (user: {username: string, password: string, role: string}) => {
        if (typeof user.username !== 'string' || user.username.length > 40) {
            throw new Error('Invalid username value');
        }

        if (typeof user.password !== 'string' || user.password.length > 200) {
            throw new Error('Invalid password value');
        }

        if (typeof user.role !== 'string') {
            throw new Error('Invalid role value')
        }

    };

    getUsername = ():string => {
        return this.username;
    };
    
    getRole= ():string => {
        return this.role;
    }

    setRole= (role : string) =>
    {
        this.role = role;
    }

    validatePassword= (password:string) =>
    {
        const hasUpperCase = /[A-Z]/.test(password);
        if(!hasUpperCase)
        {
            throw new Error('Password must have an upper case')
        }
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        if(!hasSpecialChar)
        {
            throw new Error('Password must contain a special character')
        }
    
    return hasUpperCase && hasSpecialChar;   
    }

    setPassword= (password: string) =>
        {
            if(this.validatePassword(password)){
                this.password = password;
            }
        }
}
export default User;