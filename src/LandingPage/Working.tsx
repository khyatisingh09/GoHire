import { Avatar } from "@mantine/core";
import { work } from "../Data/Data"

const Working=()=> {

    return <div className="mt-20 pb-5">
    
    <div className="text-4xl text-center font font-semibold mb-3 text-mine-shaft-100">How it
        <span className="text-bright-sun-400"> works</span></div>
    
    <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2"> 
    Wanna explore? then just click and go!!!</div>
     
     <div className="flex px-16 justify-between items-center">
        <div className="relative">
            <img className="w-[20rem] rounded-full" src="/Working/guy.png" alt="guy" />
            <div className="w-36 flex top-[-19%] left-0 absolute flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md">
                <Avatar className="!h-16 !w-16" src="avatar2.png" alt="it's me" />
                <div className="text-sm font-semibold text-mine-shaft-100 text-center">complete <span className="text-sm font-semibold text-mine-shaft-800 text-center">your Profile</span> </div>
                <div className="text-xs text-mine-shaft-1000">70% completed...</div>
            </div>
        </div>
        <div className="flex flex-col gap-10">
           {
                work.map((item, index) => <div key={index}className="flex items-center gap-4">
                <div className="p-3 bg-bright-sun-200 rounded-full">
                    <img className="h-8 w-8"  src={`/working/${item.name}.png`} alt="" />
                </div>
                    <div>
                        <div className="text-mine-shaft-200 text-xl font-semibold">{item.name}</div>
                        <div className="text-mine-shaft-300"> {item.desc}</div>
                    </div>
            </div>)
           }
        </div>
     </div>

    </div>

}
export default Working;