import { SendVerificationEmail } from "@/helper/sendVerificationEmail";
import connectDB from "@/lib/connectDb";
import UserModle from "@/models/userModel";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";



export  async function POST(req: NextRequest){
    await connectDB()

    try {
        const {username, email, password} = await req.json()
        const existingVerifiedUserByUsername = await UserModle.findOne({username, isVerified: true})

        if (existingVerifiedUserByUsername) {
            return Response.json({
                success: false,
                message: "User with this username already exists"
            },{status: 400})
        }

        const existingUserByEmail = await UserModle.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User with this email already exists"
                },{status: 400})
                
            }else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.verifyCode= verifyCode,
                existingUserByEmail.password = hashedPassword,
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000 )

                existingUserByEmail.save()

            }
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new UserModle({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: new Date(Date.now() + 3600000 )
            })
            newUser.save()
        
        }
       const resend = await SendVerificationEmail(email,username, verifyCode)
// console.log(resend);

       if (resend.status !== 200) {
        return Response.json({
            success: false,
            message: "resend error"
        },{status: 500})
        
       }
       return Response.json({
        success: true,
        message: "please verify"
       },{status: 200})




    } catch (error) {
        console.log("error in signup route", error);
        return Response.json({
            success: false,
            message: "Something went wrong"
        },{status: 500})
        
    }
}