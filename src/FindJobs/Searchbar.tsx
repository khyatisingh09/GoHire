import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import { useState } from "react";
import { IconCoinRupeeFilled } from "@tabler/icons-react";
import Multiinput from "../FindJobs/Multiinput";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 300]);
    const handleChange=(event:any)=>{
        dispatch(updateFilter({exp:event}));
        {
            dispatch(updateFilter({salary:event}));  
        }
    }
    return <div className="flex px-5 py-8 ">
        {
            dropdownData.map((item, index) => <><div key={index} className="w-1/5">
                <Multiinput {...item} />
            </div><Divider mr="xs" size="sm" orientation="vertical" /></>)
        }
        <div className="w-1/5 [&_.mantine-Slider-label]:translate-y-10">
            <div className="flex text-xs justify-between">
                <div>Salary</div>
                <div>&#8377;{value[0]} LPA-&#8377;{value[1]} LPA</div>
            </div>
            <RangeSlider color="bright-sun" size="xs" value={value} onChange={setValue} onChangeEnd={handleChange} labelTransitionProps={{
                transition: 'skew-down',
                duration: 150,
                timingFunction: 'linear',
            }}/>
        </div>
    </div>

}
export default SearchBar;