import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { successMessage } from "../SignupLogin/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const CertiInput=(props:any)=>{  
    const [issueDate, setissueDate] = useState <Date | null> (new Date());
    const select = fields;
    const profile = useSelector((state:any)=> state.profile);
    const dispatch = useDispatch();
    const form=useForm({
        mode:'controlled',
        validateInputOnChange:true,
        initialValues:{
            name:'',
            issuer:'',
            issueDate: new Date(),
            certificate:""
        },
        validate:{
            name:isNotEmpty("name is required"),
            issuer:isNotEmpty("issuer is required"),
            issueDate:isNotEmpty("issue Date is reqired"),
            certificate:isNotEmpty("Certificate is required"),
        }
    });
    const handleSave=()=>{  
            form.validate();  
            // if(!form.isValid())return;  
            let certi=[...profile.certifications];  
            certi.push(form.getValues());  
            certi[certi.length-1].issueDate=certi[certi.length-1].issueDate.toISOString();  
            let updatedProfile={...profile, certifications:certi};  
            props.setEdit(false);  
            dispatch(changeProfile(updatedProfile));
            successMessage("Success", "certificate added successfully");
    }
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Add Certificate</div>
        <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="Enter Title"/>
        <SelectInput form={form} name="issuer"{...select[1]}/>
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()}
            label ="start date" placeholder="select date" />
            <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" withAsterisk placeholder="Enter ID:"/>
        </div>
        <div className="flex gap-5">
            <Button onClick={handleSave} color="bright-sun.5" variant="light">Save</Button> 
            <Button color="red.8" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
        </div>
    </div>
}
export default CertiInput;