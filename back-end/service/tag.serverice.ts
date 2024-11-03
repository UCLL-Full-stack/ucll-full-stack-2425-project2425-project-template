import tagDb from "../repository/tag.db";

const getTagById = ({ tagId }: { tagId: number }) => {
    const tag = tagDb.getTagById({ tagId });
    if (!tag) {
        throw new Error(`Tag with id: ${tagId} does not exist.`);
    }
    return tag;
}

export default {
    getTagById
}