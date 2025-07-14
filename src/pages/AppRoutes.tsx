import { Divider } from "@mantine/core"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import ApplyJobPage from "./ApplyJobPage"
import CompanyPage from "./CompanyPage"
import Findjobs from "./Findjobs"
import FindTalentPage from "./FindTalentPage"
import HomePage from "./HomePage"
import JobDescPage from "./JobDescPage"
import JobHistoryPage from "./JobHistoryPage"
import PostedJobPage from "./PostedJobPage"
import PostJobPage from "./PostJobPage"
import ProfilePage from "./ProfilePage"
import SigninPage from "./SigninPage"
import TalentProfile from "./TalentProfile"
import { useSelector } from "react-redux"

const AppRoutes=()=>{
    const user = useSelector((state:any)=>state.user);
   return <BrowserRouter>
    <div className='relative'>
    <Header/>
    <Divider color="bright-sun.5" size="xs"/>
    <Routes>
      <Route path='/find-jobs' element={<Findjobs/>}/>
      <Route path='/find-talent' element={<FindTalentPage/>}/>
      <Route path='/company/:name' element={<CompanyPage/>}/>
      <Route path='/jobs/:id' element={<JobDescPage/>}/>
      <Route path='/posted-job/:id' element={<PostedJobPage/>}/>
      <Route path='/job-history' element={<JobHistoryPage/>}/>
      <Route path='/apply-job/:id' element={<ApplyJobPage/>}/>
      <Route path='/post-jobs/:id' element={<PostJobPage/>}/>
      <Route path='/talent-profile/:id' element={<TalentProfile/>}/>
      <Route path='/signup' element={user?<Navigate to="/"/>:<SigninPage/>}/>
      <Route path='/login' element={user?<Navigate to="/"/>:<SigninPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='*' element={<HomePage/>} />
    </Routes>
     <Footer/>
     </div>
    </BrowserRouter>
}
export default AppRoutes;