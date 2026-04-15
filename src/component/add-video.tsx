import axios from "axios";
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import {Link,useNavigate} from "react-router-dom";
import type { CategoryContract } from "../contracts/category-contract";

export function AddVideo(){

    let navigate=useNavigate();
    const[categories, setCategories]=useState<CategoryContract[]>();
    const formik=useFormik({
        initialValues:{
            video_id:0,
            title:'',
            description:'',
            comments:'',
            likes:0,
            views:0,
            url:'',
            category_id:0
        },
        onSubmit:(video)=>{
          axios.post(`http://127.0.0.1:5079/add-video`,video)
          .then(()=>{
            console.log('video added');
          })
          alert('video added successfully');
          navigate('/admin-dashboard');  
        }
    })
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5079/get-categories`)
        .then(response=>{
            response.data.unshift({category_id:1,category_name:'select category'});
            setCategories(response.data);

        })

    },[])

    return(
        <div>
            <h2>Add Video</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-2">Video Id</dt>
                    <dd className="col-10"><input type="number"name="video_id" onChange={formik.handleChange} /></dd>
                     <dt className="col-2">Title</dt>
                    <dd className="col-10"><input type="text"name="title" onChange={formik.handleChange} /></dd>
                     <dt className="col-2">description</dt>
                    <dd className="col-10"><input type="text"name="description" onChange={formik.handleChange} /></dd>
                     <dt className="col-2">Comments</dt>
                    <dd className="col-10"><input type="text"name="comments" onChange={formik.handleChange} /></dd>
                     <dt className="col-2">Likes</dt>
                    <dd className="col-10"><input type="number"name="likes" onChange={formik.handleChange} /></dd>
                     <dt className="col-2">Views</dt>
                    <dd className="col-10"><input type="number"name="views" onChange={formik.handleChange} /></dd>
                     <dt className="col-2">Url</dt>
                    <dd className="col-10"><input type="text"name="url" onChange={formik.handleChange} /></dd>
                     <dt className="col-2">category</dt>
                     <dd className="col-10">
                        <select name="category_id" onChange={formik.handleChange}>
                            {
                               categories?.map(category=>
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>

                                
                               ) 
                            }

                        </select>

                     </dd>

                </dl>
                <button className="btn btn-primary mx-2" type="submit">Add video</button>
                <Link to="/admin-dashboard" className="btn btn-warning">cancel</Link>

            </form>

        </div>
    )
}



