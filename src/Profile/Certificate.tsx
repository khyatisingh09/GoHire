import { ActionIcon } from "@mantine/core"
import { IconFilePlus, IconEdit, IconX } from "@tabler/icons-react"
import CertiCard from "./CertiCard"
import CertiInput from "./CertiInput"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { successMessage } from "../SignupLogin/NotificationService"
import { changeProfile } from "../Slices/ProfileSlice"

export const Certificate=()=> {  
    const [addCerti, setAddCerti] = useState(false);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector((state:any)=>state.profile);
    const handleClick=()=>{
        setEdit(!edit);
    }

    return <div>  
    <div className="text-2xl font-semibold mb-4 flex justify-between">Certifications  
      <div className="flex gap-2">  
        <ActionIcon onClick={() => setAddCerti(true)} variant="subtle" color="bright-sun" size="lg">  
          <IconEdit className="w-4/5 h-4/5" stroke={1.5} />  
        </ActionIcon>  
        <ActionIcon onClick={handleClick} variant="subtle" color={edit ? "red.8" : "bright-sun"} size="lg">  
          {edit ? <IconX className="w-4/5 h-4/5" stroke={1.5} /> : <IconFilePlus className="w-4/5 h-4/5" stroke={1.5} />}  
        </ActionIcon>  
      </div>  
    </div>  
    <div className="flex flex-col gap-8">  
      {  
        profile?.certifications?.map((certi: any, index: number) => <CertiCard edit key={index} index = {index} {...certi} />)  
      }  
      {addCerti && <CertiInput setEdit={setAddCerti} />}  
    </div>  
  </div>
}  
export default Certificate;