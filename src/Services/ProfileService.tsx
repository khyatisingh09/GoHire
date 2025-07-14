import axios from "axios"
const base_url = "http://localhost:8080/profiles/"

const getProfile = async (id: number) => {  
    return axios.get(`${base_url}get/${id}`)  
        .then(result => result.data)  
        .catch(error => { throw error; });  
}

const updateProfile = async (profile: any) => {
    const { id, ...profileData } = profile;  // Extract id and rest of the profile data
    console.log(id, profileData)
    return axios.put(`${base_url}update/${id}`, profileData)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const getAllProfiles = async () => {  
    return axios.get(`${base_url}getAll`)  
      .then(result => result.data)  
      .catch(error => { throw error; });  
  }
export {getProfile, updateProfile, getAllProfiles};