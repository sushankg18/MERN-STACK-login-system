import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from "../models/user.models.js"

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, userName, email, password } = req.body

    if ([fullName, userName, email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are Required..!!");
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        return res.status(409).json(new ApiError(409,"User already Exist"));
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        password,
        email: email.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select("-password -refreshTokens")

    if (!createdUser) {
        throw new ApiError(500, "Something Went Wrong...!!")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created Successfully..!!")
    )
})



const loginUser = asyncHandler(async (req, res) =>{

    const {email, userName, password} = req.body;
    
    if ([userName, email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are Required..!!");
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if(!existedUser){
        throw new ApiError(404, "User Not found");
    } else{
        User.comparePassword(password, existedUser.password, (err, isMatch) => {
            if (err) {
                throw new ApiError(500, "Something Went Wrong...!!")
            }
            if (!isMatch) {
                throw new ApiError(401, "Invalid Credentials..!!")
            }else{}
    })}

})
export { registerUser, loginUser }
