const signupValidation=(name:string, value:string)=>{
    switch(name){
        case "name":
            if(value.length===0)return "name is required.";
            return "";
        case "email": 
        if(value.length===0)return "E-mail is required.";
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Email is invalid";
            return "";
        case "password":
            if(value.length===0)return "password is required.";
            if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-\/\\])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\-\/\\]{8,20}$/.test(value))
                return "paswword must be 8-20 characters and upper and lower case character and atleast one special character."
            return "";
        default:
            return "";
     }
}

const loginValidation=(name:string, value:string)=>{
    switch(name){
        case "name":
            if(value.length===0)return "name is required.";
            return "";
        case "email": 
        if(value.length===0)return "E-mail is required.";
            return "";
        case "password":
            if(value.length===0)return "password is required.";
            return "";
        default:
            return "";
    }
}
export {signupValidation, loginValidation};