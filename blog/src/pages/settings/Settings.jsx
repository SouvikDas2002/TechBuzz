
import './settings.css'
import SideBar from '../../components/sidebar/SideBar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios';

export default function Settings() {
    const {user,dispatch}=useContext(Context);
    const PF="http://localhost:5000/images/"

    const [file,setFile]=useState(null);
    const [username,setUsername]=useState(user.username);
    const [email,setEmail]=useState(user.email);
    const [pass,setPass]=useState(user.password);
    const [success,setSuccess]=useState(false);


    const handleSubmit= async(e)=>{
        e.preventDefault();
        dispatch({type:"Update_Start"})
        const updatedUser={
            userId:user._id,
            username,
            email,
            pass
        }
        if(file){
            const data=new FormData();
            const filename=Date.now()+file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic=filename;
            try{
                await axios.post("/upload",data);
            }catch(err){ }
        }
        try{
            console.log(updatedUser);
            const res=await axios.put(`/users/${user._id}`,updatedUser);
            //   window.location.replace("/post/"+res.data._id);
            setSuccess(true);
            dispatch({type:"Update_Success",payload:res.data})
        }catch(err){
            console.log(err)
            dispatch({type:"Update_failure"})
        }
    }
    

  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsTitleUpdate">Update Your Account</span>
                <span className="settingsTitleDelete">Delete Account</span>
            </div>
            <form className='settingsForm' onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    {/* {console.log(user.profilePic)} */}
                    <img src={file ? URL.createObjectURL(file): PF+user.profilePic} alt="" />
                    <label htmlFor='fileInput'>
                    <i className="settingsPPIcon fa-solid fa-user"></i>
                    </label>
                    <input type='file' id='fileInput' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <label>Username</label>
                <input type='text' placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <label>Email</label>
                <input type='email' placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label>Password</label>
                <input type='password' onChange={(e)=>{setPass(e.target.value)}}/>
                <button className="settingsSubmit" type="submit" >Update</button>
                {success && <span style={{color:'green',textAlign:'center',marginTop:"20px"}}>Profile has been updated 👍</span>}
            </form>
        </div>
            <SideBar/>
    </div>
  )
}
