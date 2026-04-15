import axios from "axios";
import { useEffect,useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate,useParams } from "react-router-dom";
import type { CategoryContract } from "../contracts/category-contract";
import type { VideoContract } from "../contracts/video-contract";

export function DeleteVideo(){
const[categories,setCategories]=useState<CategoryContract[]>();

const[videos,setVideos]=useState<VideoContract[]>([{video_id:0,title:'',description:'',comments:'',likes:0,views:0,url:'',category_id:0}]);
let navigate=useNavigate();
let params=useParams();
const Formik=useFormik({
    initialValues:{
       video_id:videos[0].video_id,
       title:videos[0].title,
       description:videos[0].description,
       comments:videos[0].comments,
       likes:videos[0].likes,
       views:videos[0].views,
       url:videos[0].url,
       category_id:videos[0].category_id
    },
    onSubmit:(video)=>{
        axios.put(`http://127.0.0.1:5079/delete-video/${params.id}`,video)
        .then(()=>{
          console.log('modified');  
        })
        alert('video modified successfully..');
        navigate('/admin-dashboard');
    },
    enableReinitialize:true

})
function Loadcategories(){
    axios.get(`http://127.0.0.1:5079/get-categories`)
    .then(response=>{
        response.data.unshift({category_id:-1,category_name:'select category'});
        setCategories(response.data);
    })
}
function LoadVideos(){
    axios.get(`http://127.0.0.1:5079/get-video/${params.id}`)
    .then(response=>{
        setVideos(response.data);
    })
}
useEffect(()=>{
    Loadcategories();
    LoadVideos();
},[])
function handleDeleteClick(){
    axios.delete(`http://127.0.0.1:5079/delete-video/${params.id}`)
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





