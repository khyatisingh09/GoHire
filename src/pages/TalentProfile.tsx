import { Button, Divider } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import { useState, useEffect } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfile=()=>{
    const navigate = useNavigate();
    const[talents, setTalents] = useState<any[]>([]);
    useEffect(()=>{  
        getAllProfiles().then((res) => {  
            setTalents(res);  
        }).catch((err) => {  
            console.log(err);  
        })
        }, []);
    return(
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4">
                <Button leftSection={<IconChevronsLeft size={20}/>} onClick={()=>navigate(-1)} color="bright-sun" my="sm" variant="light">back</Button>
            <div className="flex gap-5">
              <Profile {...profile}/>
              <RecommendTalent talents={talents}/>
            </div>
        </div>
    )
}
export default TalentProfile;