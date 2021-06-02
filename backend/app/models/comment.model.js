module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      // userId:{
      //   type: Sequelize.INTEGER(11)
      // },
      // postId:{
      //   type: Sequelize.INTEGER(11)
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