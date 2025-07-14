import { ActionIcon } from "@mantine/core";
import { IconCalendarTime, IconTrash } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "console";
import { successMessage } from "../SignupLogin/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const CertiCard=(props:any)=>{
    const dispatch = useDispatch(); // Move useDispatch here
    const profile = useSelector((state: any) => state.profile);
    const handleDelete = () => {  
        let certis = [...profile.certifications];  
        certis.splice(props.index, 1);  
        let updatedProfile = { ...profile, certifications:certis };  
        dispatch(changeProfile(updatedProfile));  
        successMessage("Success", "certificate Deleted Successfully");  
      }  
      console.log(props)
    return <div className="flex justify-between">
    <div className="flex gap-2 items-center">
       <div className="p-2 bg-mine-shaft-800 rounded-md">
           <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
       </div>
       <div className="flex flex-col gap-1 py-3">
           <div className="font-semibold"> {props.name} </div>
           <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
       </div>
   </div>
   <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
            <div className="text-sm text-mine-shaft-300">Issued: {formatDate(props.issueDate)}</div>
            <div className="text-sm text-mine-shaft-300">ID: {props.certificateId}</div>
        </div>
        {props.edit && <ActionIcon size="lg" color="red.8" variant="subtle">
            <IconTrash onClick={handleDelete} className="h-4/5 w-4/5" stroke={1.5}/>
        </ActionIcon>}
    </div>   
</div>
}
export default CertiCard;