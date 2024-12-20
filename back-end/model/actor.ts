export class Actor {
    private name: string;
    private age: number;
    private bio: string;
 

    constructor(actor: {name: string; age: number; bio: string; }) {
        this.name = actor.name;
        this.age = actor.age;
        this.bio = actor.bio;
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    getBio(): string {
        return this.bio;
    }

    validate(actor: {
        name: string; 
        age: number; 
        bio: string;
    }) {
        if (!actor.name?.trim()) {
            throw new Error('Name is required');
        }
        if (actor.age == null || isNaN(actor.age) || actor.age <= 0)  {
            throw new Error('Age is required');
        }
        if (!actor.bio?.trim()) {
            throw new Error('Bio is required');
    }
    }

    equals(actor: Actor): boolean {
        return (
           this.name === actor.getName() &&
           this.age == actor.getAge() &&
           this.bio === actor.getBio() 
        );
    }
}

export default {Actor};