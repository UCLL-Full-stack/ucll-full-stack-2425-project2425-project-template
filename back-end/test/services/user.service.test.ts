import { User } from "../../model/user"
import userDb from "../../repository/user.db"
import userService from "../../service/user.service"

const id = 1
const username = '@AliceWonder'
const firstName = 'Alice'
const lastName = 'Wonder'
const email = 'alicewonder@gmail.com'
const password = 'alice123'
const role = 'user'

let mockUserDbGetUserById: jest.Mock

beforeEach(() => {
    mockUserDbGetUserById = jest.fn()
})

afterEach(() => {
    jest.clearAllMocks()
})

test('given a valid userid, when fetch user by id, then return the user', () => {
    //given
    const user = new User({ id: id, username: username, firstName: firstName, lastName: lastName, email: email, password: password, role: role })
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user)
    //when
    const result = userService.getUserById({ userId: 1 })
    //then
    expect(result).toEqual(user)
})