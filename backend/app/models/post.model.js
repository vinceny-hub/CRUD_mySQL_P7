module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    id:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    // userId:{
    //   type: Sequelize.INTEGER(11)
    // },
    // username:{
    //   type: Sequelize.STRING
    // },
    imageUrl: { 
      type: Sequelize.STRING(99)
    },  
    description: {
      type: Sequelize.STRING(255)
    },
    // published: {
    //   type: Sequelize.BOOLEAN
    // },
    // createdAt: {
    //   type: Sequelize.DATE
    // },
    // updatedAt: {
    //   type: Sequelize.DATE
    // },

    
  });
  // Post.associate = models => {
  //   User.hasMany(models.User,{
  //     onUpdate: "cascade"
  //   })
  // }
 

  return Post;
};

