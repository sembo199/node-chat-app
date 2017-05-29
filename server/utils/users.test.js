const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Sem',
      room: 'Room 1'
    }, {
      id: '2',
      name: 'Andrew',
      room: 'Room 2'
    }, {
      id: '3',
      name: 'Jen',
      room: 'Room 1'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Sem',
      room: 'Room 1'
    }
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    // take id, remove it, check it
    var user = users.removeUser('1');
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var user = users.removeUser('4');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('1');
    expect(user.id).toBe('1');
  });

  it('should not find user', () => {
    var user = users.getUser('4');
    expect(user).toNotExist();
  });

  it('should return names for Room 1', () => {
    var userList = users.getUserList('Room 1');
    expect(userList).toEqual(['Sem', 'Jen']);
  });

  it('should return names for Room 2', () => {
    var userList = users.getUserList('Room 2');
    expect(userList).toEqual(['Andrew']);
  });
});
