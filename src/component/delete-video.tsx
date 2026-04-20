import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import type { VideoContract } from "../contracts/video-contract";

export function DeleteVideo(){

const[videos,setVideos]=useState<VideoContract[]>([{video_id:0,title:'',description:'',comments:'',likes:0,views:0,url:'',category_id:0}]);
let navigate=useNavigate();
let params=useParams();

function LoadVideos(){
    axios.get(`https://video-library-cxf0.onrender.com/get-video/${params.id}`)
    .then(response=>{
        setVideos(response.data);
    })
}
useEffect(()=>{
    LoadVideos();
},[])
function handleDeleteClick(){
    axios.delete(`https://video-library-cxf0.onrender.com/delete-video/${params.id}`)
    .then(()=>{
        console.log('Delete');
    })
    alert('Video Deleted');
    navigate('/admin-dashboard');

}
 return(
        <div>
            <h2>Delete Video</h2>
            <h4>Are you sure?</h4>
            <dl>
                <dt>title</dt>
                <dd>{videos[0].title}</dd>
                <dt>preview</dt>
                <dd>
                    <iframe src={videos[0].url} width={300} height={200}></iframe>
                </dd>
            </dl>
            <button onClick={handleDeleteClick} className="bt btn-danger">yes</button>
            <Link to="/admin-dashboard" className="btn btn-warning mx-2">no</Link>                     

        </div>
    )
}





