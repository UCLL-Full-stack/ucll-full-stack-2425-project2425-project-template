import { hash } from "bcrypt";
import { Profile } from "../../model/profile";
import { User } from "../../model/user";

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given
    const profile1 = new Profile({
        id: 1,
        email: "a@b.c",
        bio: "bio",
        firstName: "first",
        lastName: "last"
    });
    const id = 1;
    const username = "username";
    const hashedPassword = "password";

    // when
    const user = new User({
        id: id,
        username: username,
        hashedPassword: hashedPassword,
        profile: profile1
    });

    // then
    expect(user.getId()).toBe(1);
    expect(user.getUsername()).toBe("username");
    expect(user.getHashedPassword()).toBe("password");
    expect(user.getProfile()).toBe(profile1);
    expect(user.getGroups()).toStrictEqual([]);
    expect(user.getTasks()).toStrictEqual([]);
});