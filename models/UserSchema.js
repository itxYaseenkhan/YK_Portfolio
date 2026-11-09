// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from  "jsonwebtoken";
// import crypto from "crypto";

// const UserSchema = new mongoose.Schema({
//    fullName: {
//     type: String,
//     required: [true, "fullName Required"],
//   },
//     email:{
//     type: String ,
//     require: [true,"email Required"],
//     },
//     Phone :{
//         type: String,
//         require:[true,"Phone Required"]
//     },
//     AboutMe:{
//         type: String,
//         require: [true,"About required"]
//     },
    
//      Password:{
//         type: String,
//         required: [true,"Password required !"],
//         minLength:[8,"Password much contain at least 8 Characters!"],
//         select: false,    
//     },
//       avatar: {
//          public_id: {
//            type: String,
//          required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//  resume: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   portfolioURL: {
//     type: String,
//     required: [true, "Portfolio URL Required!"],
//   },
 
 
// typewriterText: {
//   type: [String],
//   required: true,
//   validate: {
//     validator: function(v) {
//       return Array.isArray(v) && v.length > 0;
//     },
//     message: "At least one typewriter text is required"
//   }
// },

//   instagramURL: String,
//   linkedInURL: String,
//   facebookURL:String,
//   githubUrl: String,
//   resetPasswordToken: String,
//   resetPasswordExpire: Date,

// });

// // For Hashing Password
//  UserSchema.pre("save",async function (next) {
//      if(!this.isModified("Password")) {
//         next();
//      }
//      this.Password = await bcrypt.hash(this.Password,8);  
//  });
// // for compare password with hashing
//  UserSchema.methods.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.Password);
//  };

// // Generating JSon Web token
//  UserSchema.methods.generateJSonWebToken = function(){
//  return jwt.sign({id:this._id}, process.env.Jwt_SECRET_KEY,{
//    expiresIn: process.env.Jwt_EXPIRES
//  });
//  };


//  UserSchema.methods.getResetPasswordToken = function(){
//    const resetToken = crypto.randomBytes(20).toString("hex");
//    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken)
//    .digest("hex");

//    this.resetPasswordExpire = Date.now() + 15 *60*1000;
//    return resetToken;
//  }
// export const User = mongoose.model("User", UserSchema);


import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name required"],
  },

  email: {
    type: String,
    required: [true, "Email required"],
  },

  Phone: {
    type: String,
    required: [true, "Phone required"],
  },

  AboutMe: {
    type: String,
    required: [true, "About required"],
  },

  Password: {
    type: String,
    required: [true, "Password required"],
    minlength: [8, "Password must contain at least 8 characters"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL required"],
  },

  typewriterText: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "At least one typewriter text is required",
    },
  },

  instagramURL: String,
  linkedInURL: String,
  facebookURL: String,
  githubUrl: String,

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hash Password
UserSchema.pre("save", async function () {
  if (!this.isModified("Password")) return;

  this.Password = await bcrypt.hash(this.Password, 8);
});

// Compare Password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

// Generate JWT Token
UserSchema.methods.generateJSonWebToken = function () {
  const secret = process.env.Jwt_SECRET_KEY;

  if (!secret) {
    throw new Error("Jwt_SECRET_KEY is missing in environment variables");
  }

  return jwt.sign(
    { id: this._id },
    secret,
    {
      expiresIn: process.env.Jwt_EXPIRES || "7d",
    }
  );
};

// Reset Password Token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", UserSchema);
