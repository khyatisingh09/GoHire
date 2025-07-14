import { useEffect, useState } from "react";
import { jobList } from "../Data/JobsData";
import JobCards from "./JobCards";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs=() =>{
    const dispatch = useDispatch();
    const[jobList, setJobList] = useState([{}]);
    const filter = useSelector((state:any)=>state.filter);
    const[filteredJobs, setFilteredJobs] = useState<any>([]);
    const [sort, setSort] = useState<string>("Most Recent");
    useEffect(()=>{
        dispatch(resetFilter());
        dispatch(resetSort());
        getAllJobs().then((res)=>{
            setJobList(res.filter((job:any)=>job.jobStatus=="ACTIVE"));
            console.log(res[0]);
        }).catch((err)=>console.log(err));  
    },[])
    useEffect(()=>{
        if (sort === "Most Recent") {  
            setJobList([...jobList].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));  
        } else if (sort === "Salary: Low to High") {  
            setJobList([...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered));  
        } else if (sort === "Salary: High to Low") {  
            setJobList([...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered));  
        }
    }, [sort]);
    useEffect(() => {  
        let filtered = jobList; // Initialize filtered talents from full list
      
        setFilteredJobs(jobList); // Reset filtered talents
        console.log(filter);  
      
        // Filter by "Job Title"
        if (filter["Job Title"] && filter["Job Title"].length > 0)   
            filtered = filtered.filter((jobs: any) => filter["Job Title"]?.some((x: any) => jobs.jobTitle?.toLowerCase().includes(x.toLowerCase())));  
        if (filter.Location && filter.Location.length > 0)   
            filtered = filtered.filter((jobs: any) => filter.Location?.some((x: any) => jobs.location?.toLowerCase().includes(x.toLowerCase())));  
        if (filter.Experience && filter.Experience.length > 0)   
            filtered = filtered.filter((jobs: any) => filter.Skill?.some((x: any) => jobs.Experience?.toLowerCase.includes(x.toLowerCase())));  
        if (filter.exp && filter.exp.length > 0)   
            filtered = filtered.filter((jobs: any) => filter.exp[0] <= jobs.totalExp && jobs.totalExp <= filter.exp[1]);  
        setFilteredJobs(filtered); 
        if (filter["Job Type"] && filter["Job Type"].length > 0)   
            filtered = filtered.filter((jobs: any) => filter["Job Type"]?.some((x: any) => jobs.jobType?.toLowerCase().includes(x.toLowerCase()))); 
        if(filter.salary && filter.salary.length>0){  
            filtered=filtered.filter((jobs:any)=>filter.salary[0]<=jobs.packageOffered && jobs.packageOffered<=filter.salary[1]); 
        }  setFilteredJobs(filtered);
        },[filter, jobList]);
    return <div className="p-5">
     <div className="flex justify-between">
    <div className="text-2xl font-semibold text-bright-sun-400">Recommended Jobs</div>
    <Sort sort="job" />
</div>

        <div className="mt-10 flex flex-row flex-wrap gap-5">
        {
            filteredJobs.map((job:any, index:any)=> <JobCards key={index}{...job}/>)
        }
        </div>
    </div>
}
export default Jobs;