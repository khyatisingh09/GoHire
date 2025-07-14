import { Carousel} from "@mantine/carousel"
import { jobCategorylist } from "../Data/Data"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

const JobCategory=()=>{
    return  <div className="mt-20 pb-5">
    
    <div className="text-4xl text-center  mb-3 font-semibold text-mine-shaft-100">Browse 
        <span className="text-bright-sun-400"> Job</span> Category</div>
    
    <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2"> 
    Explore diverse job opportunities tailored to your skills. Start your carrier journey today!</div>
    
    <Carousel slideSize="22%" slideGap="md" loop className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400[&_button]:!border-none [&_button]:hover:opacity-75n[&_button]:opacity-0 hover:[&_button]:opacity-100"
    nextControlIcon=
    { <div className="bg-gray-700 p-2 rounded-full text-mine-shaft-100"><IconArrowRight className="h-8 w-8" stroke="currentColor" />
    </div>}
    previousControlIcon= 
     
    {  <div className="bg-gray-700 p-2 rounded-full text-mine-shaft-100">
    <IconArrowLeft className="h-8 w-8" stroke="currentColor"/> </div>}>
        {
        jobCategorylist.map((category: any, index: any)=><Carousel.Slide>
        <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300">
            <div className="p-2 bg-bright-sun-300 rounded-full">
                <img className="h-8 w-8" src={category.image} alt={category.name}/>
            </div>
            <div className="text-mine-shaft-100 text-xl font-semibold">
            {category.name}
            </div>
            <div className="text-sm text-center text-mine-shaft-300">
            {category.desc}
            </div>
            <div className="text-bright-sun-300 text-lg">{category.jobs}</div>
        </div>
        </Carousel.Slide>)
        }
    </Carousel>
 </div>

}
export default JobCategory