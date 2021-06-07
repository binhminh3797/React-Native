import Parse from 'parse/react-native.js';
const DeleteUserService = {
  deleteUser: function (id) {
    return new Promise((resolve, reject) => {
      fetch('http://192.168.8.23:8080/user/delete/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
        .then(rs => {
          resolve(rs.status);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteUserBack4App: function (id) {
    return new Promise((resolve, reject) => {
      const memberObj = new Parse.Object('Member');
      memberObj.set('objectId', id);
      memberObj
        .destroy()
        .then(rs => {
          console.log(rs);
          resolve(rs);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
};
export default DeleteUserService;
