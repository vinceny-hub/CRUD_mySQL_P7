module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      userId:{
        type: Sequelize.STRING
      },
      username:{
        type: Sequelize.STRING
      },
      // post_id:{
      //   type: Sequelize.STRING
      // },
      description: {
        type: Sequelize.STRING
      },
      // content_Id: {
      //   type: Sequelize.STRING
      // },
 
    });

    return Comment;
  };