import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { errorNotificaton, successMessage } from "./NotificationService";


const ResetPassword=(props:any)=>{
    const[email,setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[passErr, setPassErr] = useState("");
    const[otpSent, setOtpSent]= useState(false);
    const[otpSending, setOtpSending] = useState(false);
    const[verified, setverified] = useState(false);
    const[resendLoader, setResendLoader] = useState(false);
    

 const handleSendOtp=()=>{
        setOtpSending(true);
        sendOtp(email).then((res)=>{
            console.log(res);
            successMessage("OTP sent successfully","Enter OTP to Reset Password.");
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
        }).catch((err)=>{
            console.log(err);
            setOtpSending(false);
            errorNotificaton("OTP not occured try again", err.response.data.errorMessage);
        })

    }
    const handleVerifyOTP = (otp:string)=>{
        verifyOtp(email, otp).then((res)=>{
            console.log(res);
            successMessage("OTP verified.","Enter new password to reset.");
            setverified(true);

        }).catch((err)=>{
            console.log(err);
            errorNotificaton("verification failed",err.response.data.errorMessage);
        })
    }
    const resendOtp=()=>{ 

        handleSendOtp();
    }
    const changeEmail=()=>{
        setOtpSent(false);
    }
    const handleResetPassword=()=>{
        changePass(email, password).then((res)=>{
            successMessage("Password changed","Login with new password.");
            props.close();
        }).catch((err)=>{
            console.log(err);
            errorNotificaton("password reset failed", err.response.data.errorMessage);
        })
    }
    return <Modal opened={props.opened} onClose={props.close} title="reset Password">
    <div className="flex flex-col gap-6">
    <TextInput
                value={email}
                name="email"
                onChange={(e)=> setEmail(e.target.value)}
                withAsterisk
                leftSection={<IconAt size={16}/>}
                label="E-mail" size="md"
                placeholder="Your email"
                rightSection = {<Button loading={otpSending && !otpSent} size="xs" className="mr-1" onClick={handleSendOtp} 
                autoContrast color="bright-sun.5" disabled={email==="" || otpSent}
                variant="filled">
                Log In
            </Button>} 
            rightSectionWidth="xl"/>
            { otpSent && <PinInput onComplete={handleVerifyOTP} length={6} className="mx-auto" type="number" />}
            {otpSent && !verified &&
                <div className="flex gap-3">
                    {<Button loading={otpSending} onClick={resendOtp} 
                autoContrast color="bright-sun.5" variant="light"> Resend OTP </Button>} 
            {<Button onClick={changeEmail}  autoContrast color="bright-sun.5" variant="filled"> Change Email </Button>} 
                </div>
            }
            {verified && <PasswordInput
                value={password}
                error={passErr}
                name="password"
                onChange={(e)=>{setPassword(e.target.value); setPassErr(signupValidation("password", e.target.value))}}
                withAsterisk
                leftSection={<IconLock size={16} stroke={1.5} />}
                label="Password"
                placeholder="Enter password"
            />}
            {<Button onClick={handleResetPassword}  autoContrast color="bright-sun.5" variant="filled"> Change Password </Button>}
    </div>
</Modal>
}
export default ResetPassword;