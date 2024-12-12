import { Tag } from '../../model/tags';
import { Recipe } from '../../model/recipe';
import { User } from '../../model/user';

const tagId: number | undefined = 1;
const name: string = 'Italian';
const description: string = 'Food from Italy';

test(`given: valid values for user, when: user is created, then: user is created with those values`, () => {
    //given
    //when
    const tag = new Tag({ tagId, name, description });

    //then
    expect(tag.getTagId()).toBe(tagId);
    expect(tag.getName()).toBe(name);
    expect(tag.getDescription()).toBe(description);
});

test(`given: two equal tags, when: the tag.equals method is called, then: the method will return true`, () => {
    //given
    const tag = new Tag({ tagId, name, description});
    //when
    const isEqual = tag.equals(tag);

    //then
    expect(isEqual).toBe(true);
});

test(`given: two unequal tags, when: the tag.equals method is called, then: the method will return false`, () => {
    //given
    const tag1 = new Tag({ tagId, name, description});
    const tag2 = new Tag({ tagId, name: 'notEqualName', description});
    //when
    const isEqual = tag1.equals(tag2);

    //then
    expect(isEqual).toBe(false);
});
