import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

const Talents=() =>{
    const dispatch = useDispatch();
    const[talents, setTalents] = useState<any>([]);
    const filter = useSelector((state:any)=>state.filter);
    const sort = useSelector((state: any) => state.sort);
    const[filteredTalents, setFilteredTalents] = useState<any>([]);
    useEffect(()=>{
        dispatch(resetFilter())
        getAllProfiles().then((res)=>{
            console.log(res)
            setTalents(res);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    useEffect(()=>{
      if (sort === "Most Recent") {  
          setTalents([...talents].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));  
      } else if (sort === "Experience: Low to High") {  
          setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp));  
      } else if (sort === "Experience: High to Low") {  
          setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp));  
      }
  }, [sort]);
    useEffect(() => {  
        let filterTalent = talents; // Initialize filtered talents from full list
      
        setFilteredTalents(talents); // Reset filtered talents
        console.log(filter);  
      
        // Filter by name
        if (filter.name) {
          filterTalent = filterTalent.filter((talent: any) =>
            talent.name?.toLowerCase().includes(filter.name.toLowerCase())
          );
        }
      
        // Filter by "Job Title"
        if (filter["Job Title"] && filter["Job Title"].length > 0) {
          filterTalent = filterTalent.filter((talent: any) => 
            filter["Job Title"]?.some((title: any) =>
              talent.jobTitle?.toLowerCase().includes(title.toLowerCase())
            )
          );
          if (filter.Location && Array.isArray(filter.Location) && filter.Location.length > 0) {  
            filterTalent = filterTalent.filter((talent: any) => 
              filter.Location.some((location: any) => 
                talent.location?.toLowerCase().includes(location.toLowerCase())));  
          }  
          
          if (filter.Skills && Array.isArray(filter.Skills) && filter.Skills.length > 0) {  
            filterTalent = filterTalent.filter((talent: any) => 
              filter.Skills.some((talentskill: any) => 
                talent.skills?.includes(talentskill)));  
          } 
         }
         if(filter.exp && filter.exp.length>0){  
            filterTalent=filterTalent.filter((talent:any)=>filter.exp[0]<=talent.totalExp && talent.totalExp<=filter.exp[1]);  
        }
            setFilteredTalents(filterTalent);
        }, [filter, talents]);
      

    return <div className="p-5">
        <div className="flex justify-between">
            <div className="text-2xl font-semibold text-bright-sun-400">APPLICANTS</div>
            <Sort/>
        </div>
        <div className="mt-10 flex flex-wrap gap-5 justify-evenly">
            {
               filteredTalents.length ? (
                filteredTalents.map((talent: any, index: any) => (
                  <TalentCard key={talent.id || index} {...talent} />
                ))
              ) : (
                <div className="text-xl font-semibold">No talents found.</div>
              ) 
            }
        </div>
    </div>
}
export default Talents;

