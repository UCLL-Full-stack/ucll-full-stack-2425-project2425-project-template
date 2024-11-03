import { Tag } from "../model/tags"

const tags: Tag[] = [
    new Tag({
        tagId: 1,
        name: 'Dessert',
        description: 'Sweet dishes typically served as the last course of a meal.',
    }),
    new Tag({
        tagId: 2,
        name: 'Vegetarian',
        description: 'Dishes that do not contain meat or fish.',
    })
];

const getTagById = ({ tagId }: { tagId: number }): Tag | null => {
    return tags.find((tag) => tag.getTagId() === tagId) || null;
}

export default {
    getTagById
}