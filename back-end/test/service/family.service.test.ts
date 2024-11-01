import { User } from "../../model/user";
import { Family } from "../../model/family";
import familyService from "../../service/family.service";
import userService from "../../service/user.service";
import familyDb from "../../repository/family.db";

let mockGetUserByEmail: jest.SpyInstance;
let mockCreateFamily: jest.SpyInstance;

beforeEach(() => {
    jest.clearAllMocks();
    mockGetUserByEmail = jest.spyOn(userService, 'getUserByEmail');
    mockCreateFamily = jest.spyOn(familyDb, 'createFamily');
});

test("given valid family input, when createFamily is called, then family is created", async () => {
    // given
    const user = new User({ name: "John", email: "john@email.com", password: "SecurePass123", role: 'parent' });
    const name = "The Does";
    const familyList = [user];
    const owner = user;
    const validFamily = new Family({ name, familyList, owner });

    mockGetUserByEmail.mockResolvedValue(user);

    // when
    const result = await familyService.createFamily({ name, familyList, owner });

    // then
    expect(result).toEqual(validFamily);
    expect(mockCreateFamily).toHaveBeenCalledTimes(1);
});