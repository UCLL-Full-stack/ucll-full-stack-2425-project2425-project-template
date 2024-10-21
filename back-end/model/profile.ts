import e from "express";

class Profile {
    private email: string;
    public name: string;
    public lastname: string;

    constructor (profile: {email: string, name: string, lastname: string}) {
        this.validateprofiles(profile);

        this.email = profile.email;
        this.name = profile.name;
        this.lastname = profile.lastname;
    }

    private validateprofiles = (profile: {email: string, name: string, lastname: string}) => {
        if (typeof profile.email !== 'string' || profile.email.length > 60 || !this.validateEmail(profile.email)) {
            throw new Error('Invalid email value');
        }

        if (typeof profile.name !== 'string' || profile.name.length > 40) {
            throw new Error('Invalid name value');
        }

        if (typeof profile.lastname !== 'string' || profile.lastname.length > 60) {
            
            throw new Error('Invalid lastname value');
    
        }

    };

    getFullName = ():string => {
        return `${this.name} ${this.lastname}`;
    };
    
    getAbbreviatedName= ():string => {
        return `${this.name[0]}${this.lastname[0]}`;
    }

    setName= (name : string) =>
    {
        this.name = name;
    }

    setLastName= (lastname: string) => {
        this.lastname = lastname;
    }

    validateEmail= (email:string): boolean =>
    {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    getEmail= ():string =>
    {
        return this.email;
    }
}
export default Profile;