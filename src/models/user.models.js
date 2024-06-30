import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
    {
        fullName : {
            type : String,
            required : true,
            index : true
        },
        userName : {
            type : String,
            required : true,
            unique : true,
            index : true,
            lowercase : true
        },
        email : {
            type : String,
            required : true,
            lowercase : true,
            unique : true,
            index : true
        },
        password : {
            type : String,
            required : true,
        },
        refreshTokens : {
            type : String
        }
    },
    {timestamps : true}
);

userSchema.pre("save" , async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        next ();
    } else {
        return next ();
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            userName : this.userName,
            email : this.email,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_EXPIRY,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User  = mongoose.model("User", userSchema)