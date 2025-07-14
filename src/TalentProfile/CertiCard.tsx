import { IconCalendarTime } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";

const CertiCard=(props:any)=>{
    return <div className="flex justify-between">
    <div className="flex gap-2 items-center">
       <div className="p-2 bg-mine-shaft-800 rounded-md">
           <img className="h-7" src={`/Icons/Google.png`} alt="" />
       </div>
       <div className="flex flex-col gap-1">
           <div className="font-semibold"> {props.name} </div>
           <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
       </div>
   </div>
        <div className="text-sm flex flex-col items-end">
            <div className="flex justify-center"><IconCalendarTime/> 
            {formatDate(props.issueDate)} </div>
            <div>ID: {props.certificateId}</div>
        </div>
    </div>
}
export default CertiCard;