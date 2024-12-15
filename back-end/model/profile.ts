export class Profile {
    private bio: string;


    constructor(profile: {bio: string; }) {
        this.bio= profile.bio;
    }

    getBio(): string {
        return this.bio;
    }

    validate(profile: {
        bio: string;
    }) {
        if (!profile.bio?.trim()) {
            throw new Error('Bio is required');
        }
    }

    equals(profile: Profile): boolean {
        return (
           this.bio === profile.getBio()
        );
    }
}
export default {Profile};