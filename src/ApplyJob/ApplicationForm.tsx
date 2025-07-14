import { NumberInput, FileInput, Textarea, Button, TextInput, LoadingOverlay } from "@mantine/core"
import { useForm, isNotEmpty } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react"
import { useState } from "react";
import { getBase64 } from "../Services/Utilities";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob } from "../Services/JobService";
import { errorNotificaton, successMessage } from "../SignupLogin/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm=()=>{
    const{id}= useParams();
    const navigate = useNavigate();
    const user = useSelector((state:any)=> state.user);
    const [preview, setPreview] = useState(false);  
    const [submit, setSubmit] = useState(false);  
    const handlePreview = () => {  
    form.validate();
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if(!form.isValid())return;
    setPreview(!preview);  
    console.log(form.getValues());
    
}  
const handleSubmit = async () => {  
    setSubmit(true);
    let resume:any = await getBase64(form.getValues().resume);
    let applicant = {...form.getValues(),applicantId:user.id, resume:resume.split(',')[1]};
    applyJob(id, applicant).then((res)=>{  
      setSubmit(false);  
      successMessage("success","Application Submitted Successfully");  
      navigate("/job-history")
    }).catch((err)=>{  
      setSubmit(false);  
      errorNotificaton("Error",err.response.data.errorMessage);  
  })
}
const form = useForm({  
    mode: 'controlled',  
    validateInputOnChange: true,  
    initialValues: {  
      name: '',  
      email: '',
      phone:'',  
      website:'',  
      resume: '',
      coverLetter:''  
    },  
    validate: {  
      name: isNotEmpty('Name cannot be empty'),  
      email: isNotEmpty('Email cannot be empty'),  
      phone: isNotEmpty('Phone number cannot be empty'),  
      website: isNotEmpty('Website cannot be empty'), 
      resume: isNotEmpty('Resume cannot be empty'), 
    }    
  });
    return <div>
        <LoadingOverlay className="!fixed"
          visible={submit}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'bright-sun', type: 'bars' }} />
        <div className="text-xl font-semibold gap-5">Submit Your Application</div>  
                <div className="flex flex-col gap-5"> 
                    <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":"default"}`} label="Full Name" withAsterisk placeholder="Enter Name"/>
                    </div>
                    <div className="flex py-5 gap-10 [&>*]:w-1/2">
                    <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":"default"}`} label="E-mail" withAsterisk placeholder="Enter E-mail"/>
                    <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":"default"}`} label="Phone Number" withAsterisk placeholder="Enter Phone Number" hideControls clampBehavior="strict" min={0} max={9999999999}/>
                    <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":"default"}`}  label="Personal Website" withAsterisk placeholder="Enter http//:@url"/>
                </div>
                <div className="flex flex-col gap-5">
                <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":"default"}`} withAsterisk leftSection={<IconPaperclip/>} label="Attach your CV" placeholder="Your CV" leftSectionPointerEvents="none"/>
                <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":"default"}`} withAsterisk placeholder="Answer...." label="Why Should you be hired for this role?" autosize minRows={4}/>
                {!preview &&<Button onClick={handlePreview} color="yellow" variant="light">Preview</Button>}
                {
                    preview && <div className="flex gap-10 [&>*]:w-1/2">
                        <Button fullWidth onClick={handlePreview} color="yellow" variant="outline">Edit</Button>
                        <Button fullWidth onClick={handleSubmit} color="yellow" variant="light">Submit</Button>
                    </div>
                }
                </div>
    </div>
}
export {ApplicationForm};