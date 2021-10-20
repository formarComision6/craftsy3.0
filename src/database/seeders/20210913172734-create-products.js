'use strict';

const faker = require('faker');
const products = [];

for (let i = 0; i < 360; i++) {
  
  var product = {
    name : faker.commerce.productName(),
    description : faker.commerce.productDescription(),
    price : faker.datatype.number({min:100,max:999}),
    categoryId : faker.datatype.number({min:1,max:3}),
    createdAt : new Date,
    updatedAt : new Date
  }

  products.push(product)
  
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Products',products, {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Products', null, {});
     
  }
};
