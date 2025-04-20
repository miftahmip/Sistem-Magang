'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10; // Jumlah putaran salt, semakin tinggi semakin aman, namun proses hashing akan lebih lambat

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('admin123', saltRounds);
    const hashedPassword2 = await bcrypt.hash('3018', saltRounds);

   

    return queryInterface.bulkInsert('user', [
      {
       
        email: 'admin@gmail.com',
        password: hashedPassword1,
        role: 'admin',
        createdAt : new Date(),
        updatedAt: new Date()
        
      },
      {
       
        email: '2211523018_najwa@student.unand.ac.id',
        password: hashedPassword2,
        role: 'peserta',
        createdAt : new Date(),
        updatedAt: new Date()
      },
   
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  }
};