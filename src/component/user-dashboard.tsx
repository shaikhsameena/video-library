import axios from "axios";
import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import type { VideoContract } from "../contracts/video-contract";
import {  useDispatch } from "react-redux";
import { addToSaveList } from "../slicers/video-slicer";

export function UserDashBoard(){

const[cookies,,removecookie]=useCookies(['userid']);
const[videos,setVideos]=useState<VideoContract[]>();
let navigate=useNavigate();
let dispatch=useDispatch();

function LoadVideos(){
    axios.get(`https://video-library-cxf0.onrender.com/get-video`)
    .then(response=>{
        setVideos(response.data);
    })

}
useEffect(()=>{
    if(cookies['userid']===undefined){
        navigate('/user-login');
    }else{
        LoadVideos();
    }
},[])
function handleSignout(){
   removecookie('userid');
   navigate('/');
} 
function handleSaveClick(video:VideoContract){
    console.log("save in video:",video);
 dispatch(addToSaveList(video));
 alert(`" ${video.title}" added to watch later`);
}





    return(
        <div>
        <header className="d-flex justify-content-between">
            <h2>{cookies['userid']}-dashboard</h2>
            <button onClick={handleSignout} className="btn btn-link">Signout</button>
        </header>
        <section className="mt-4  d-flex flex-wrap">
            {
                videos?.map(video=>
                   <div key={video.video_id} className="card m-2 p-1" style={{width:'250px'}}>
                    <iframe src={video.url} height="200"></iframe>
                    <div className="card-header">
                        <h3>{video.title}</h3>
                    </div>
                    <div className="card-body">
                       {video.description}
                    </div>
                    <div className="card-footer">
                        <span className=" bi bi-hand-thumbs-up">{video.likes}</span>
                        <span className=" bi bi-eye mx-2">{video.views}</span>
                        <button onClick={()=>{handleSaveClick(video)}}className="btn btn-success bi bi-floppy">{" "} watch Later</button>


                    </div>
                   </div> 
                )
            }

        </section>

        </div>
    )

}


