import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from "../models/user.models.js"


const registerUser = asyncHandler( async (req, res)=>{

    res.status(200).json({message : "OKAY working"})
    const {fullName, userName, email, password}= req.body

    if([fullName, userName, email, password].some((field)=> field?.trim === "")){
        throw new ApiError(400, "All fields are Required..!!");
    }

    const existedUser = await User.findOne({
        $or : [{userName}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User already Exist")
    }


    const user = await User.create({
        userName : userName.toLowerCase(),
        fullName ,
        password,
        email ,
    });

    const createdUser = User.findById(user._id).select("-password -refreshTokens")

    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong...!!")
    };

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created Successfully..!!")
    )
})

export { registerUser }