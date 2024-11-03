import { Tag } from "../../model/tags"
import tagDb from "../../repository/tag.db"
import tagServerice from "../../service/tag.serverice"

const tagId = 1
const tagName = 'Dessert'
const description = 'Sweet dishes'

let mockTagDbGetTagById: jest.Mock

beforeEach(() => {
    mockTagDbGetTagById = jest.fn()
})

afterEach(() => {
    jest.clearAllMocks()
})

test('given a valid tag id, when fetch tag by id, then return the tag', () => {
    //given
    const tag = new Tag({ tagId: tagId, name: tagName, description: description });
    tagDb.getTagById = mockTagDbGetTagById.mockReturnValue(tag);
    //when
    const result = tagServerice.getTagById({ tagId: 1 });
    //then
    expect(result).toEqual(tag)
})