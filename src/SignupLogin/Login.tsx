import { rem, PasswordInput, Button, TextInput, LoadingOverlay } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";
import { useState } from "react";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlices";
const Login = () => {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const form = {
        email: "",
        password: "",
}
    const [data, setData] = useState(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);

    const handleChange = (event: any) => {
        setFormError({...formError,[event.target.name]:""});
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        let valid = true;
        let newFormError: { [key in keyof typeof form]: string } = { email: "", password: "" };

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                newFormError[key as keyof typeof data] = loginValidation(key, data[key as keyof typeof data]);
                if (newFormError[key as keyof typeof data]) valid = false;
            }
        }
        console.log(data)
        setFormError(newFormError);
        if (valid) {
            setloading(true);
            loginUser(data)
                .then((res) => {
                    console.log(res);
                    setData(form);
                    notifications.show({
                        title: 'login Successfully',
                        message: 'Redirecting to home page.',
                        withCloseButton:true,
                        icon:<IconCheck style={{width:"90%",height:"90%"}}/>, color:"bright-sun",
                        withBorder:true,
                        className:"!border-bright-sun-500",
                      });
                    setTimeout(() => {
                        
                        dispatch(setUser(res));
                        navigate("/homepage");
                    }, 4000);
                }).catch((err) => {
                    setloading(false);
                    const errorMessage = err.response?.data?.errorMessage || "An unknown error occurred";
                    console.log(err);
                    notifications.show({
                        title: 'Login failed',
                        message: 'invalid credentials',
                        withCloseButton: true,
                        icon: <IconX style={{ width: "90%", height: "90%" }} />,
                        color: "red",
                        withBorder: true,
                        className: "!border-red-500",
                    });
                });
        }
    }
    return<> <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} /><div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">User account</div>
            <TextInput
                value={data.email}
                error={formError.email}
                name="email"
                onChange={handleChange}
                withAsterisk
                leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                label="E-mail"
                placeholder="Your email"
            />
            <PasswordInput
                value={data.password}
                error={formError.password}
                name="password"
                onChange={handleChange}
                withAsterisk
                leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                label="Password"
                placeholder="Enter password"
            />
            <Button loading={loading} onClick={handleSubmit} autoContrast color="bright-sun.5" variant="light">
                Log In
            </Button>
            <div className="mx-auto">
                Don't have an account? <span className="text-bright-sun-400 hover:underline cursor-pointer"  onClick={()=>{navigate("/login"); setFormError(form); setData(form)}}>Sign up</span>
            </div>
            <div onClick={open} className="text-bright-sun-500 hover:underline cursor-pointer text-center">Forget Password?</div>
        </div>  
        <ResetPassword opened={opened} close={close}/>
    </>  
}

export default Login;
