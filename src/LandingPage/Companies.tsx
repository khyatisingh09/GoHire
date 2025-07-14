import { Key } from "react";
import Marquee from "react-fast-marquee";
import {companies} from "../Data/Data"
const Companies=()=>{
return <div className="mt-20 pb-5">
    <div className="text-4xl text-center font font-semibold mb-10 text-mine-shaft-100">Trusted by <span className="text-ffc300-400">1000+</span> Companies</div>
    <Marquee pauseOnHover={true}>
        {
            companies.map((company, index)=><div key={index} className="mx-8 px-2 py-1 hover:bg-mine-shaft-300 rounded-xl cursor-pointer">     
                <img className="h-14" src={`/Companies/${company}.png`} alt={company} />
            </div>)
        }
    </Marquee>
</div>
}
export default Companies;