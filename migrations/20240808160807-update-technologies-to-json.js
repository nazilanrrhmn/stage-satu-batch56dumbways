'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Projects', 'technologies', {
      type: Sequelize.JSON,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Projects', 'technologies', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};