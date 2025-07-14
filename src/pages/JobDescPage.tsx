import { Button } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../JobDescription/JobDesc";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import RecommendedJob from "../JobDescription/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobDescPage=()=>{
    const {id}= useParams();
    const [job,setJob]=useState<any>(null);
    useEffect(()=>{
        window.scrollTo(0,0);
        getJob(id).then((res)=>{
            setJob(res);
            console.log(res)
        }).catch((err)=>{
            console.log(err);
        })
    },[id])
    return(
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4">
            <Link className="my-4 inline-block" to="/find-jobs">
                <Button leftSection={<IconChevronsLeft size={20}/>} color="bright-sun.4" variant="light">back</Button>
            </Link>
            <div className="">
            <div className="flex gap-5 flex-col">
              <JobDesc {...job}/>
              <RecommendedJob/>
            </div>
            </div>
        </div>
    )
}
export default JobDescPage;