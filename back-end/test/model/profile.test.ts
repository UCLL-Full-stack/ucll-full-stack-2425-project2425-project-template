import { Profile } from '../../model/profile'; 

const validProfile = {
    id: '1',
    bio: 'This is a bio description.',
    userId: 'user_1',
};

test('given: valid values for Profile properties; when: Profile is created; then: properties are set correctly', () => {
    const profile = new Profile(validProfile);

    expect(profile.id).toEqual(validProfile.id);
    expect(profile.bio).toEqual(validProfile.bio);
    expect(profile.userId).toEqual(validProfile.userId);
});

test('given: an empty bio; when: Profile is created; then: an error is thrown', () => {
    const invalidProfile = { ...validProfile, bio: '' };

    const createInvalidProfile = () => new Profile(invalidProfile);

    expect(createInvalidProfile).toThrowError('Bio is required and cannot be empty.');
});

test('given: a valid profile; when: Profile equals method is called with matching properties; then: return true', () => {
    const profile = new Profile(validProfile);

    const isEqual = profile.equals({
        id: '1',
        bio: 'This is a bio description.',
        userId: 'user_1',
    });

    expect(isEqual).toBe(true);
});

test('given: a valid profile; when: Profile equals method is called with non-matching properties; then: return false', () => {
    const profile = new Profile(validProfile);

    const isEqual = profile.equals({ id: '2', bio: 'Different bio.', userId: 'user_2' });

    expect(isEqual).toBe(false);
});

test('given: Profile from static method; when: Profile is created from Prisma data; then: properties are set correctly', () => {
    const prismaProfile = {
        id: '1',
        bio: 'This is a bio description.',
        userId: 'user_1',
    };

    const profile = Profile.from(prismaProfile);

    expect(profile.id).toEqual(prismaProfile.id);
    expect(profile.bio).toEqual(prismaProfile.bio);
    expect(profile.userId).toEqual(prismaProfile.userId);
});

test('given: Profile equals method called with only id matching; when: compared with a different profile; then: return false', () => {
    const profile = new Profile(validProfile);

    const isEqual = profile.equals({ id: '1', bio: 'Different bio.', userId: 'user_2' });

    expect(isEqual).toBe(false);
});

test('given: Profile equals method called with only bio matching; when: compared with a different profile; then: return false', () => {
    const profile = new Profile(validProfile);

    const isEqual = profile.equals({
        id: '2',
        bio: 'This is a bio description.',
        userId: 'user_2',
    });

    expect(isEqual).toBe(false);
});

test('given: Profile equals method called with userId matching; when: compared with a different profile; then: return false', () => {
    const profile = new Profile(validProfile);

    const isEqual = profile.equals({
        id: '2',
        bio: 'This is a bio description.',
        userId: 'user_2',
    });

    expect(isEqual).toBe(false);
});
