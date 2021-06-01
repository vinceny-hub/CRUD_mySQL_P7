'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('comments', {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
    userId:{
      type: Sequelize.STRING
    },
    username:{
      type: Sequelize.STRING
    },
    post_id:{
      type: Sequelize.STRING
    },
    // description: {
    //   type: Sequelize.STRING
    // },
    // content_Id: {
    //   type: Sequelize.STRING
    // },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE  

  });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('comments');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
