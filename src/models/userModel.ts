import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpiry: Date

}

const userSchema: Schema<User> =new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\../, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: String,
        required: [true, "verifycode is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required"]

    }

})

 const UserModle  = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)

 export default UserModle
