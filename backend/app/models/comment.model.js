module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      user_Id:{
        type: Sequelize.STRING
      },
      username:{
        type: Sequelize.STRING
      },
      post_id:{
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      // content_Id: {
      //   type: Sequelize.STRING
      // },
 
    });

    return Comment;
  };