import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandMeta, IconBrandX, IconZoomCodeFilled } from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";
import { useLocation } from "react-router-dom";

const Footer=()=>{
    const location = useLocation();
    return location.pathname!= "/signup" && location.pathname!= "/login" ? <div className="pd-20 py-10 flex gap-5 justify-around bg-mine-shaft-950 font-['poppins']">
        <div className="w-1/4 flex flex-col gap-4">
        <div className="flex gap-1 items-center text--400">
            <IconZoomCodeFilled className="h-6 w-6"stroke={1.25} />
            <div className="text-xl font-semibold mb-4">Go  Hire</div>
        </div>
        <div className="flex gap-3 text-bright-sun-400 
  [&>div]:bg-mine-shaft-900 
  [&>div]:p-2 
  [&>div]:rounded 
  [&>div]:cursor-pointer 
  hover:[&>div]:bg-mine-shaft-700">
  
  <div><IconBrandFacebook /></div>
  <div><IconBrandInstagram /></div>
  <div><IconBrandLinkedin /></div>
  <div><IconBrandX /></div>
</div>

        </div>
        {
            footerLinks.map((item, index) => <div key={index}>
                <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
                {
                    item.links.map((link,index) => <div key={index} className="text-mine-shaft-300 text-sm
                     hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">{link}</div>)
                }
            </div>)
        }
    </div>:<></>
}
export default Footer;