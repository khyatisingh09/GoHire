import { talents } from "../Data/TalentData";
import TalentCard from "../FindPrefrence/TalentCard";

const CompEmployee=()=>{
    
    return <div>
        <div className=" flex mt-10 flex-wrap gap-10">
            {
                talents.map((talent, index)=>index<6 &&
                <TalentCard key={index} {...talent}/>)
            }    
        </div>
    </div>
}
export default CompEmployee;