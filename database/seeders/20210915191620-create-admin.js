'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Users',[
       {
        name : 'Admin',
        email : 'admin@craftsy.com',
        password : bcrypt.hashSync('123123',10),
        avatar : 'admin.jpg',
        rolId : 2,
        createdAt : new Date,
        updatedAt : new Date
       }
     ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
