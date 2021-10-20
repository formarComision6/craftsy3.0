'use strict';

const faker = require('faker');
const categorias = ['nuevo','usado','refaccionado'];

const categories = [];

categorias.forEach(categoria => {
  var category = {
    name : categoria,
    description : faker.commerce.productDescription(),
    createdAt : new Date,
    updatedAt : new Date
  }
  categories.push(category)
});


module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Categories',categories, {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
