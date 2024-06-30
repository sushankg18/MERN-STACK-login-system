import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from "../models/user.models.js"


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if(!user){
            throw new ApiError(404, " User not found")
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken , refreshToken}
    } catch (error) {
        console.log("error", error)
    }
}

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

    const {email, password} = req.body;
    
    if(!email){
        throw new ApiError(400, "Username or Email is required")
    }

   const user  = await User.findOne({email})

   if(!user){
    throw new ApiError(400, " User doesn't exist")
   }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if(!isPasswordValid){
    throw new ApiError(404, " Invalid Password")
   }

   const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)

   const LoggedInUser = await User.findById(user._id).select("-password -refreshToken");

   const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'lax', // HTTPS mein hi set karo
    sameSite: true, // ya "strict"
   }

   return res
   .status(200)
   .cookie('accessToken' , accessToken, options)
   .cookie('refreshToken', refreshToken , options)
   .json(
    new ApiResponse(200, {user : LoggedInUser, refreshToken,accessToken}, "User logged in Successfully")
   )
})


const logoutUser = asyncHandler(async(req, res)=> {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(new ApiResponse(200, {} , "User logged out successfully"))
})

export { registerUser, loginUser, logoutUser }
