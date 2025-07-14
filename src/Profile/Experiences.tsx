import { ActionIcon } from "@mantine/core";
import { IconPlus, IconDeviceFloppy, IconPencil, IconX, IconEdit, IconFilePlus } from "@tabler/icons-react";
import { profile } from "console";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Experiences = () => {  
    const profile=useSelector((state: any) => state.profile);
    const[edit, setEdit] = useState(false);
    const[addExp, setAddExp] = useState(false);
    const handleClick=()=>{
        setEdit(!edit);
    }
    return (  
        <div>
        <div className="text-2xl font-semibold mb-4 flex justify-between">Experience  
            <div className="flex gap-2">  
        <ActionIcon onClick={() => setAddExp(true)} variant="subtle" color="bright-sun" size="lg">  
          <IconEdit className="w-4/5 h-4/5" stroke={1.5} />  
        </ActionIcon>  
        <ActionIcon onClick={handleClick} variant="subtle" color={edit ? "red.8" : "bright-sun"} size="lg">  
          {edit ? <IconX className="w-4/5 h-4/5" stroke={1.5} /> : <IconFilePlus className="w-4/5 h-4/5" stroke={1.5} />}  
        </ActionIcon>  
      </div>  
      </div>
            <div className="flex flex-col gap-8">  
                {profile?.experiences?.map((exp: any, index: number) => <ExpCard edit={edit} key={index} index={index} {...exp} />)}  
                {addExp && <ExpInput add setEdit={setAddExp} />}  
            </div>  
        </div>  
    );  
}  

export default Experiences;