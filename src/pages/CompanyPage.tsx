import { Divider } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage=()=>{
    const navigate = useNavigate();
    return <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4">
        <Button leftSection={<IconChevronsLeft size={20}/>} color="bright-sun.4" my="md" onClick={()=>navigate(-1)} variant="light">back</Button>
    <div className="flex gap-5 justify-between">
        <Company/>
        <SimilarCompanies/>
    </div>
</div>
}
export default CompanyPage;