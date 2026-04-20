import axios from "axios";
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import {Link,useNavigate} from "react-router-dom";
import type { VideoContract } from "../contracts/video-contract";
 
export function AdminDashboard(){
    const[, ,removecookie]=useCookies(['admin_id']);

    const[videos,setVideos]=useState<VideoContract[]>();

    let navigate= useNavigate();

    function LoadVideos(){
        axios.get(`https://video-library-cxf0.onrender.com/get-video`)
        .then(response=>{
           setVideos(response.data); 
        })

    }
    useEffect(()=>{
        LoadVideos();
    },[])
    function handleSignout(){
        removecookie('admin_id');
        navigate('/');


    }

  return(
        <div>
        <header className="d-flex justify-content-between">
        <h2>Admin Dashboard<button className="btn btn-Link" onClick={handleSignout}></button></h2>
        </header>
        <section>
            <Link to="/add-video" className="btn btn-primary bi bi-camera-video">Add New video</Link>
            <table className="table table-hover ">
            <thead>
                <tr>
                    <th>title</th>
                    <th>preview</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                  videos?.map(video=><tr key={video.video_id}>
                    <td>{video.title}</td>
                    <td>
                        <iframe src={video.url} width={200} height={100}></iframe>
                    </td>
                    <td>
                        <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning"><span className="bi bi-pen-fill"></span></Link>
                        <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger mx-2"><span className="bi bi-trash-fill"></span></Link>
                    </td>

                  </tr>)  
                }
            </tbody>
            </table>

        </section>

        </div>
    )
}


 

