import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { errorNotificaton, successMessage } from "../SignupLogin/NotificationService";
import { getJob, postJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// form boxes validation, even * sign, number range thing in post job deatils....
const PostJob=()=>{
    const {id} = useParams();
    const [editorData, setEditorData] = useState(content);
    const user = useSelector((state:any)=>state.user);
    const navigate = useNavigate();
    const select = fields;
    useEffect(()=>{
        window.scrollTo(0,0);
        if(id!=="0"){
            getJob(id).then((res)=>{
                form.setValues(res);
                setEditorData(res.description);
            }).catch((err)=>{
                console.log(err);
            })
        } else {
            form.reset();
            setEditorData(content);
        }
    },[id]);
    const form = useForm({
        mode:'controlled',  //form filling process where the form made and the entry can be made 
        validateInputOnChange: true,
        initialValues:{ 
            jobTitle:'',
            company: '',  
            experience: '',  
            jobType: '',  
            location: '',  
            packageOffered: '',  
            skillsRequired: [],  
            about: '',  
            description: content 
        },
        validate:{
            jobTitle: isNotEmpty('Title is required'),  
            company: isNotEmpty('Company is required'),  
            experience: isNotEmpty('Experience is required'),  
            jobType: isNotEmpty('Job Type is required'),  
            location: isNotEmpty('Location is required'),  
            packageOffered: isNotEmpty('Package is required'),  
            skillsRequired: isNotEmpty('Skills are required'),  
            about: isNotEmpty('About is required'),  
            description: isNotEmpty('Description is required'),
        }
    });
    const handlePost=()=>{
        form.validate();
        if(!form.isValid())return;
        postJob({...form.getValues(),id, postedBy:user.id, jobStatus:"ACTIVE", postTime: Date.now}).then((res)=>{
            successMessage("success","Job posted successfully" );
            navigate(`/posted-job/${res.id}`);
        }).  catch((err)=>{
            console.log(err);
            errorNotificaton("Error", err.response.data.errorMessage);
        })
    }
    const handleDraft=()=>{
        postJob({...form.getValues(),id, postedBy:user.id, jobStatus:"DRAFT"}).then((res)=>{
            successMessage("success","Job drafted successfully" );
            navigate(`/posted-job/${res.id}`);
        }).  catch((err)=>{
            console.log(err);
            errorNotificaton("Error", err.response.data.errorMessage);
        })
    }
    return <div className="px-16 py-5">
        <div className="text-2xl font-semibold mb-5">Post a Job</div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="jobTitle"{...select[0]}/>
                <SelectInput form={form} name="company"{...select[1]}/>
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="experience"{...select[2]}/>
                <SelectInput form={form} name="jobType"{...select[3]}/>
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="location"{...select[4]}/>
                <NumberInput {...form.getInputProps('packageOffered')} label="Salary" withAsterisk min={1} max={300} clampBehavior="strict" placeholder="Enter Salary" hideControls/>
            </div>
            <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills" placeholder="Enter Skills" clearable acceptValueOnBlur splitChars={[',',' ','|']}/>
            <Textarea {...form.getInputProps("about")} withAsterisk className="my-3" label="about job"  autosize minRows={3}  placeholder="Enter About job"/>
            <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
                <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span> </div>
                <TextEditor form={form} data={editorData}/>
            </div>
            <div className="flex gap-4">
            <Button  color="bright-sun" onClick={handlePost} variant="light">Publish Job</Button>
            <Button  color="bright-sun" onClick={handleDraft} variant="outline">Save as Draft</Button>
            </div>
        </div>
    </div>
}
export default PostJob;