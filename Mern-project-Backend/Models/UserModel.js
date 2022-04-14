const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const { roles } = require('../Utils/Constants');

 

const UserSchema = new mongoose.Schema({
    email:{
        type : String,
        required : [true , "Email is required"],
        unique : true,
    },

    password : {
        type : String,
        required :[true, 'password is required']

    },

    role : {
        type : String,
        enum : [roles.admin,  roles.moderator,  roles.client],
        default: roles.client
    } 

});

// UserSchema.pre("save", async function(next) {

//     const salt = await bcrypt.genSalt();
//     // normal function use than this access
//     this.password = await bcrypt.hash(this.password, salt);

// })


UserSchema.pre('save', async function (next) {
    try {
      if (this.isNew) {
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(this.password, salt);
        // this.password = hashedPassword;
        if (this.email === "test@gmail.com") {
          this.role = roles.admin;
          console.log('---',this.role);
        }else{
          console.log(this.role)
        }
      }
      next();
    } catch (error) { 
      next(error);
    }
  });



const MODEL = mongoose.model('User' , UserSchema);
module.exports = MODEL;