import { IconChevronsLeft, IconZoomCodeFilled } from "@tabler/icons-react";
import Signup from "../SignupLogin/Signup";
import Login from "../SignupLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SigninPage=()=>{
    const location=useLocation();
    const navigate = useNavigate();
    return(
        <div className={`min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden`}>
            <Button rightSection={<IconChevronsLeft size={20}/>} color="bright-sun.4" my="md" className="!absolute left-5 z-10" onClick={()=>navigate("/")} variant="light">Home</Button>
            <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-200 flex [&>*]:flex-shrink-0 ${window.location.pathname =='/login' ? '-translate-x-1/2' :'translate-x-0'}`}>
                <Login/>
                <div className={`w-1/2 h-full transition-all duration-200 ease-in-out ${location.pathname=="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex items-center gap-4 justify-center flex-col`}>
                <div className="flex gap-1 items-center text--400">
            <IconZoomCodeFilled className="h-16 w-16"stroke={2.5} />
            <div className="text-6xl font-semibold">Go  Hire</div>
            </div>
            <div className="text-2xl text-mine-shaft-200 font-semibold">Find the job made for you</div>
            
        </div>
        <Signup/>
    </div>
</div>
    ) 
}
export default SigninPage;