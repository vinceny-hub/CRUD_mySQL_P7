
<template>

  <div class="container-fluid">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-8 gedf-main">
        <div class="card gedf-card d-flex " v-if="!submitted">
          <div class="box-header-body-input">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a v-on:click="isHidden = true" class="nav-link active"    id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make a publication</a>
                </li>
                <li class="nav-item">
                  <!--v-bind="noImage"--> 
                  <a  v-on:click="isHidden = false" class="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images"> Images </a>
                </li>
              </ul>
            </div>
            <div class="card-body card-input">
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                  <div class="form-group">
                    <label class="sr-only" for="message">post</label>
                      <textarea-autosize ref="myTextarea" :min-height="75" :max-height="350" type="text" class="form-control" id="description" required v-model="post.description" autofocus  placeholder="What are you thinking?"/>
                  </div>
                </div>
                <div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                  <div class="form-group">
                    <div class="custom-file">
                      <input  type="file" ref="file" @change="onSelect" class="" id="">
                        <label class=""></label>                 
                    </div>
                    <div class="py-3"></div>
                  </div>
                </div>
                <div class="">
                  <div class="">
                    <div>                                       <!-- Share and upload button -->
                      <img class="card-img-post" src="../img/icon-left-font-sized.png" alt="logo Groupomania text">
                      <button @click="savePost" :disabled="!post.description" type="submit" class="btn btn-primary float-right" v-show="isHidden">Share</button>
                      <button @click="uploadImage"  :disabled="!noImage" type="submit" class="btn btn-success float-right" v-show="!isHidden">Upload</button> 
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div v-if="!emptyError"></div>
            </div>
          </div> 
        </div>
      </div>
      <div class="">          
        <div class="d-inline-flex p-2"> <img class="title-img" src="../img/icon.png" alt="logo Groupomania"><h4 class="title-pos">Posts</h4></div>
          <div class="">
            <div class="post-heading">            
              <ul class="list-group">                                     <!-- list of posts reversed -->
                <li class="card rounded card-white postBox" @dblclick="editPost(index, post)" v-for="(post, index) in posts.slice().reverse()" :key="post.id"> 
                <div class="card-body">
                  <div class="float meta ">                     
                    <div class="title h5">                         <!-- Link to profile page  -->
                        <span class="colorLink"><b> {{ post.user.username}} </b></span> 
                          made a post.
                    </div>
                    <h6 class="text-muted time"> {{ post.createdAt.slice(7,10).replace(/-/g,` `) }} {{ post.createdAt.slice(5,7).replace(/-/g,` `) }} {{ post.createdAt.slice(0,4).replace(/-/g,`.`) }} {{post.createdAt.slice(11,16).replace(/:/g,`h`)}} (UTC)</h6>
                  </div>                                                          <!-- posted image -->
                  <div class="card aPost rounded card-white"> <h5><strong>{{ post.description }}</strong></h5><img :src="post.imageUrl"></div> 
                  <div class="">
                    <div class="post-heading">
                      <div class="float meta">
                        <div class="title h5">                                   <!-- comments in post -->
                          <div  v-for="comment in comments" :key="comment.id"> <div class="comment float-right card rounded card-white" v-if="post.id == comment.postId">                    
                            <div class="list-group-item">  
                              <div class="title h5"> <a href="#"><b> {{ comment.user.username }} </b></a>  made a comment </div>  
                              <h6 class="text-muted time"> {{ comment.createdAt.slice(7,10).replace(/-/g,` `) }} {{ comment.createdAt.slice(5,7).replace(/-/g,` `) }} {{ comment.createdAt.slice(0,4).replace(/-/g,`.`) }} {{comment.createdAt.slice(11,16).replace(/:/g,`h`)}} (UTC)</h6> 
                              <div>{{ comment.description }} </div>
                            </div>    
                          </div>
                        </div>
                      </div> 
                    </div>
                  </div>             
                </div>      
              <div>   
              <img class="card-img" src="../img/icon-left-font-sized.png" alt="Goupomania image">     <!-- create a comment for this post -->
              <a :href="'/posts/' + post.id"><button  href="#top" class="btn btn-outline pink float-right float-bottom"> Comment </button></a>
              </div>
            </div>             
            </li>
            </ul>            
          </div>
        </div>
        <!-- <button v-if="showAdminBoard" class="m-3 btn btn-sm btn-danger" @click="removeAllPosts"> Remove All </button>  -->
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import PostDataService from "../services/PostDataService";
import PostCommentService from "../services/PostCommentService";
import UpLoadFilesService from '../services/UpLoadFilesService';

export default {
  name: "post-list",
  data() {
    return {
      posts:[],
      currentPost: null,
      currentIndex: -1,         
      message: '',
      post: {       
        id: null,
        // title: "",
        description: "",
        userId: "",
        username: "",
        published: false,
        imageUrl: "",
      },
        currentComment:"",
        comments:[],
        comment: {        
        id: null,
        // title: "",
        description: "",
        userId: "",
        username: "",
        published: false
      },
      isHidden:true,
      file:"",
      submitted: false,
      selectedIndex: null,
      editing: false,
      emptyError: false,
      noImage:false,
      users:""
    };
    
  },
 
  computed: {
    dataUser(){  return JSON.parse(localStorage.getItem("user"))
    },

    currentUser() {
      return this.$store.state.auth.user;
     
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }
      return false;
    }
  },

 
  methods: {

    adminRole(){
    if (this.currentUser.id == '1'){
      let adRo = this.currentUser.id
      console.log(adRo)
    }
  
    },
    // get image selected
    upload(e) {   
      this.post.imageUrl = e.target.files[0];
      console.log(this.post.imageUrl);
    },
     // upload image to folder image in backend and send url to database
     uploadImage() {
      let dataUser = JSON.parse(localStorage.getItem("user"))
      const formData = new FormData();
      // if (this.image !== null || "") {
        formData.append("file", this.post.imageUrl, this.post.imageUrl.name);
        formData.append("id", dataUser.id);
        formData.append("username", dataUser.username,);

        UpLoadFilesService.upload(formData)
         .then(response => {
          
          console.log(response.data);
       
          this.retrievePosts();
      
         })
   
     //selected file
     },
    onSelect(e){     
      const file = this.$refs.file.files[0];
      this.post.imageUrl = file;
      if(this.post.imageUrl){
        this.noImage = true
      }
      console.log(e)
      console.log(this.post.imageUrl)
        
    },
    // cancel button
    cancel(){
       this.editing = this.editing == false
    },
    // edit a post
    editPost(){    
      this.editing = this.editing == true?false:true    
      if(this.editing== false){
      this.updatePost()
      }      
      console.log(this.editing)
    },
    // get all comments
    getComment() {
      PostCommentService.getAll()
      .then(response => {          
        this.comments = response.data;
        console.log(response.data.description);
        console.log(this.comments);
      })
      .catch(e => {
        console.log(e);
      });
  },   
  // load(){
  //     location.reload()
  // }, 
      // update a post
    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
        .then(response => {           
          console.log(response.data);      
        })
        .catch(e => {
          console.log(e);
        });     
    },
      // delete a post
    deletePost() {    
      PostDataService.delete(this.currentPost.id)
        .then(response => {
          console.log(response.data);
          this.retrievePosts();        
        })
        .catch(e => {
          console.log(e);
        });
    },
      // get all posts
    retrievePosts() {
      // console.log()
      PostDataService.getAll()
        .then(response => {        
          this.posts = response.data;
          console.log(response.data);
         
        })        
        .catch(e => {
          console.log(e);
        });
    },
      //retrieve all users 
    retrieveAllUsers() {      
      PostDataService.getAllUsers()
      .then(response => {
        this.users = response.data;
        console.log(response.data);
      })        
      .catch(e => {
        console.log(e);
      })
    },   
      //refresing posts list
    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },
    // post selected
    setActivePost(post, index) {   
      this.currentPost = post;
      this.currentIndex = index;      
      console.log(post.id)      
    },
    // remove all posts (admin option)
    removeAllPosts() {
      PostDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    // serach by title ... in progress
    searchTitle() {
      PostDataService.findByTitle(this.title)
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // save post in db
    savePost() {     
      let dataUser = JSON.parse(localStorage.getItem("user"))
      console.log(dataUser)  
      var data = {    
        description: this.post.description,
        id : dataUser.id,
        // username : dataUser.username,
        //  userId: dataUser.id,
      }
      PostDataService.create(data)
        .then(response => {        
          this.post.id = response.data.id;
          this.retrievePosts();
          this.newPost()
        })
        .catch(e => {
          console.log(e);
        });
    },
    // post submitted ?
    newPost() {
      this.submitted = false;
      this.post = {};
    },
      // logout
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
    // get all posts
    retrievePosts() {
      PostDataService.getAll()
        .then(response => {
          this.posts = response.data;
          console.log(response.data);          
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    mounted() {
      this.message = '';
      this.getComment()
      this.retrievePosts();
      // this.retrieveUsers()
       this.retrieveAllUsers()

  }        
}

</script>

<style>

.card-header{
   background-color:  #091f43;
}
.title-pos{
  margin-top: 10px;
  color: #091f43;
  font-weight: bold;
}
.card-img{
  width: 125px;
}
.card-img-post{
  width: 125px;
  margin-top: 10px;
  border-bottom: none;
}
#posts-tab{
  border: 1px solid #e1e1e1;
  border-bottom: none; 
}
#images-tab{
  border: 1px solid #e1e1e1;
  border-bottom: none; 
}
.nav-link{
  color: white;
} 
.box-header-body-input{ 
  box-shadow: 10px 7px 10px#091f43;
}
.card-body{
   box-shadow: 10px 7px 10px #091f43;
}
.title-img{
  width: 50px; 
  margin-top: 0px;
  margin-bottom: 0px;
}
.gedf-main{
  margin-bottom: 100px;
}
.comment {
    width: 80%;
    overflow: hidden;
    border: 1px solid #091f43;
    margin-bottom: 30px;
    margin-left: 100px;
    box-shadow: 5px 5px 5px #091f43;  
} 
.aPost {
    width: 100%;
    min-height: px;
    overflow: hidden;
    border: 0.1vw solid white;
    margin-bottom: 30px;  
} 
.postBox { 
    border: 1px solid #091f43;
    margin-bottom: 30px;     
} 
.list-group{
  border:white;
}
.list-group-item{
    border:white;
}
li{
   border:white

}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
.pink{
  border: 1px solid  #091f43;
  color:  #091f43;
}
.colorLink{
  color: #0069d9;
}

</style>
