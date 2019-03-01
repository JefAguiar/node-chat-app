const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
      users = new Users();
      users.users = [{
        id: 1,
        name: 'Jef',
        room: 'Node Course'
      },
      {
        id: 2,
        name: 'User2',
        room: 'React Course'
      },
      {
        id: 3,
        name: 'User3',
        room: 'Node Course'
      }];
    });

    it('Should create new users', () => {
        const user = users.addUser(4, 'User1', 'Room 1');

        expect(users.users[3]).toEqual(user);
    });

    it('Should remove user', () => {
        const user = users.removeUser(1);
        expect(users.users.length).toBe(2);
        expect(user).not.toBeNull();
    });

    it('Should not remove user', () => {
        const user = users.removeUser(-1);
        expect(users.users.length).toBe(3);
        expect(user).toBeFalsy();
    });

    it('Should find user', () => {
        const user = users.getUser(2);

        expect(user).toEqual(users.users[1]);
    });

    it('Should not find user', () => {
        const user = users.getUser(-1);

        expect(user).toBeFalsy();
    });

    it('Should return names from node course', () => {
        const names = users.getUserList(users.users[0].room);
        
        expect(names).toEqual([users.users[0].name, users.users[2].name]);
    });
});