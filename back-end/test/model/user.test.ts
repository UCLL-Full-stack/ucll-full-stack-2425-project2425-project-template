import { User } from '../../model/user';

let user: User;

beforeEach(() => {
  user = new User({ id: 1, name: 'Alice', email: 'alice@example.com', password: 'securepassword', role: 'user' });
});

test('givenValidUserData_whenUserIsCreated_thenUserHasThoseValues', () => {
  // then
  expect(user.getId()).toBe(1);
  expect(user.getName()).toBe('Alice');
  expect(user.getEmail()).toBe('alice@example.com');
  expect(user.getPassword()).toBe('securepassword');
  expect(user.getRole()).toBe('user');
});

test('givenNewName_whenNameIsUpdated_thenNameIsChanged', () => {
  // when
  user.setName('Bob');

  // then
  expect(user.getName()).toBe('Bob');
});

test('givenNewEmail_whenEmailIsUpdated_thenEmailIsChanged', () => {
  // when
  user.setEmail('bob@example.com');

  // then
  expect(user.getEmail()).toBe('bob@example.com');
});

test('givenNewPassword_whenPasswordIsUpdated_thenPasswordIsChanged', () => {
  // when
  user.setPassword('newpassword');

  // then
  expect(user.getPassword()).toBe('newpassword');
});

test('givenIdenticalUsers_whenEqualsIsCalled_thenReturnsTrue', () => {
  // given
  const otherUser = new User({ id: 1, name: 'Alice', email: 'alice@example.com', password: 'securepassword', role: 'user' });

  // when
  const result = user.equals(otherUser);

  // then
  expect(result).toBe(true);
});

test('givenDifferentUsers_whenEqualsIsCalled_thenReturnsFalse', () => {
  // given
  const otherUser = new User({ id: 2, name: 'Bob', email: 'bob@example.com', password: 'newpassword', role: 'admin' });

  // when
  const result = user.equals(otherUser);

  // then
  expect(result).toBe(false);
});

test('givenUserPrismaObject_whenFromIsCalled_thenCreatesUserInstance', () => {
  // given
  const userPrisma = { id: 1, name: 'Alice', email: 'alice@example.com', password: 'securepassword', role: 'user' };

  // when
  const newUser = User.from(userPrisma);

  // then
  expect(newUser.getId()).toBe(1);
  expect(newUser.getName()).toBe('Alice');
  expect(newUser.getEmail()).toBe('alice@example.com');
  expect(newUser.getPassword()).toBe('securepassword');
  expect(newUser.getRole()).toBe('user');
});