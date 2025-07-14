import { Avatar, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPins } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import JobCards from "../FindJobs/JobCards";
import JobsComp from "./JobsComp";
import CompEmployee from "./CompEmployee";

const Company=()=>{
    return <div className="w-3/4">
        <div className="relative">
            <img className="rounded-t-2xl" src="/profile/banner.jpg" alt="" />
            <img className="w-36 h-36 rounded-3xl -bottom-1/4 p-2 absolute left-5
             bg-mine-shaft-950 border-5 " src="/Icons/Google.png" alt="" />
           </div>
            <div className=" px-3 mt-12">
                <div className="text-3xl font-semibold flex justify-between py-3">Google
                <Avatar.Group>
      <Avatar src="avatar.png" />
      <Avatar src="avatar1.png" />
      <Avatar src="avatar2.png" />
      <Avatar>+10K</Avatar>
    </Avatar.Group> </div> 
                <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
            <IconMapPins className="h-5 w-5" stroke={1.5}/> Mumbai,Maharastra
            </div>
         </div>
         <Divider my="xl" color="bright-sun.7"/>
         <div>
         <Tabs variant="outline" radius="lg" defaultValue="About">
      <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
        <Tabs.Tab value="first">About</Tabs.Tab>
        <Tabs.Tab value="second">Jobs</Tabs.Tab>
        <Tabs.Tab value="third">Employees</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first"><AboutComp/></Tabs.Panel>
      <Tabs.Panel value="second"><JobsComp/></Tabs.Panel>
      <Tabs.Panel value="third"><CompEmployee/></Tabs.Panel>
    </Tabs>
         </div>
    </div>
}
export default Company;