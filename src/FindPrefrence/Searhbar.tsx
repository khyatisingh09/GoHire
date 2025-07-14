import { Divider, Input, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import React, { useState } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import Multiinput from "../FindJobs/Multiinput";
import { searchFields } from "../Data/TalentData";
import { useDisclosure } from "@mantine/hooks";
import { updateFilter } from "../Slices/FilterSlice";
import { useDispatch } from "react-redux";

const Searchbar=()=>{
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 50]);
    const [name, setName] = useState('');
    const handleChange=(name:any, event:any)=>{
        if(name == "exp")dispatch(updateFilter({exp:event}));
        else{
            dispatch(updateFilter({name:event.target.value}));
            setName(event.target.value)     
        }
    }
    return( <div className=" px-5 py-8 items-center !text-mine-shaft-100 flex">
        <div className="flex items-center">
            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20}/></div>
            <Input defaultValue={name} onChange={(e)=> handleChange ("name",e)} className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name"/>
        </div>
        {
            searchFields.map((item,index)=> {
                return <React.Fragment key={index}><div className="w-1/5"> <Multiinput title={item.title} icon={item.icon} options={item.options}/>
        </div>
            <Divider mr="xs" size="sm" orientation="vertical" /></React.Fragment>})
        }
        <div className="w-1/5 [&_.mantine-Slider-label]:translate-y-10">
        <div className="flex text-xs justify-between">
            <div>Experiences(Year)</div>
            <div>{value[0]} - {value[1]}</div>
            </div>
        <RangeSlider onChangeEnd={(e)=>handleChange("exp",e)} color="bright-sun" min={1} max={50} minRange={1} step={1} size="xs" value={value} labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }} onChange={setValue} />
        </div>    
    </div>
    )
}
export default Searchbar;