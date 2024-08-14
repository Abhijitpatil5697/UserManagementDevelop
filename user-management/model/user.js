
let users = [];
let currentId = 1;

const addUser = (user) => {
  user.id = currentId++;
  users.push(user);
  return user;
};

const getUserById = (id) => users.find((user) => user.id === parseInt(id));

const updateUser = (id, updatedUser) => {
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return users[index];
  }
  return null;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    users[index].disabled = true; // soft delete
    return true;
  }
  return false;
};

const listUsers = (filters = {}) => {
  return users.filter((user) => {
    for (let key in filters) {
      if (user[key] && user[key].toString().toLowerCase().includes(filters[key].toLowerCase())) {
        return true;
      }
    }
    return false;
  });
};

module.exports = { addUser, getUserById, updateUser, deleteUser, listUsers };
