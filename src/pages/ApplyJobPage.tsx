import { IconChevronsLeft } from "@tabler/icons-react";
import { Button, Divider } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJob } from "../Services/JobService";
import { ApplyJobComp } from "../ApplyJob/ApplyJobComp";

const ApplyJobPage=()=>{
    const navigate = useNavigate();
    const { id } = useParams();  
    const [job, setJob] = useState<any>(null);  
        useEffect(() => {  
        window.scrollTo(0, 0);  
         getJob(id).then((res) => {  
          setJob(res);  
      }).catch((err) => {  
            console.log(err);  
    });  
}, [id]);
    return(
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4">
            <Divider size="xs"/>
                <Button my="md" onClick={()=>navigate(-1)} leftSection={<IconChevronsLeft size={20}/>} color="brown" variant="light">back</Button>
            <ApplyJobComp {...job}/>
        </div>
    ) 
}
export default ApplyJobPage;