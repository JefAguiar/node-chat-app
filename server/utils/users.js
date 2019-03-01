class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        this.users.push({ id, name, room });

        return { id, name, room };
    }

    removeUser(id) {
      const user = this.getUser(id);

      if(user){
        this.users = this.users.filter(u => u.id !== user.id);
      }

      return user;
        
    }

    getUser(id) {
        return this.users.find(u => u.id === id);
    }

    getUserList(room) {
        return this.users
            .filter(u => u.room === room)
            .map(u => u.name);
    }
}

module.exports = { Users };


