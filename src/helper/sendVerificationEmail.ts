import { Resend } from "resend";
import VerificationEmail from "../../email/VerificationEmail";


export async function SendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<any>{
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'gk  Verification code ',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        return Response.json({
            success: true,
            message: "Verification email sent successfully"
        
        },{status:200})
        
    } catch (error) {
        console.log("verification email sending error", error);
        return Response.json({
            success: false,
            message: "Something went wrong"
        },{status: 500})
        
    }
}