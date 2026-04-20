import axios from "axios";
import { useEffect,useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate,useParams } from "react-router-dom";
import type { CategoryContract } from "../contracts/category-contract";
import type { VideoContract } from "../contracts/video-contract";

export function EditVideo(){
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
        axios.put(`https://video-library-cxf0.onrender.com/edit-video/${params.id}`,video)
        .then(()=>{
          console.log('modified');  
        })
        alert('video modified successfully..');
        navigate('/admin-dashboard');
    },
    enableReinitialize:true

})
function Loadcategories(){
    axios.get(`https://video-library-cxf0.onrender.com/get-categories`)
    .then(response=>{
        response.data.unshift({category_id:-1,category_name:'select category'});
        setCategories(response.data);
    })
}
function LoadVideos(){
    axios.get(`https://video-library-cxf0.onrender.com/get-video/${params.id}`)
    .then(response=>{
        setVideos(response.data);
    })
}
useEffect(()=>{
    Loadcategories();
    LoadVideos();
},[])
 return(
        <div>
            <h2>Edit Video</h2>
            <form onSubmit={Formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-2">video id</dt>
                    <dd className="col-10"><input type="number" name="video_id" value={Formik.values.video_id} onChange={Formik.handleChange} /></dd>
                    <dt className="col-2">title</dt>
                    <dd className="col-10"><input type="text" name="title" value={Formik.values.title} onChange={Formik.handleChange} /></dd>
                    <dt className="col-2">description</dt>
                    <dd className="col-10"><input type="text" name="description" value={Formik.values.description} onChange={Formik.handleChange} /></dd>
                    <dt className="col-2">comments</dt>
                    <dd className="col-10"><input type="text" name="comments" value={Formik.values.comments} onChange={Formik.handleChange} /></dd>
                    <dt className="col-2">likes</dt>
                    <dd className="col-10"><input type="number" name="likes" value={Formik.values.likes} onChange={Formik.handleChange} /></dd>
                    <dt className="col-2">views</dt>
                    <dd className="col-10"><input type="number" name="views" value={Formik.values.views} onChange={Formik.handleChange} /></dd>
                    <dt className="col-2">url</dt>
                    <dd className="col-10"><input type="text" name="url" value={Formik.values.url} onChange={Formik.handleChange} /></dd>
                    <dt className="col-2">category id</dt>
                    <dd className="col-10">
                         <select name="category_id" value={Formik.values.category_id} onChange={Formik.handleChange}>
                            {
                               categories?.map(category=>
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>

                                
                               ) 
                            }

                        </select>

                    </dd>
                </dl>
                <button type="submit" className="btn btn-success mx-2">Save</button>
                <Link to="/admin-dashboard" type="submit" className="btn btn-danger">cancel</Link>

            </form>

        </div>
    )
}



