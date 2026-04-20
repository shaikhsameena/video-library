import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
//import * as yup  from "yup";

export function UserRegister(){
    const[userMsg,setUserMsg] = useState('');
    const[userColor,setUserColor] = useState('');
    let  navigate=useNavigate();
 
const formik=useFormik({
    initialValues:{
        user_id:'',
        user_name:'',
        password:'',
        email:'',
        mobile:''

    },
    //  validationSchema:({
    // user_name:yup.string().required('User Name Required').min(5,'Name too short'),
    //  Email:yup.string().email('invalid Email').required('Email Required'),
    // Mobile:yup.string().required('Mobile Required').matches(/\+91\d{10}/,'invalid Mobile')

 
    
    onSubmit:(user)=>{
        axios.post(`https://video-library-cxf0.onrender.com/register-user`,user)
        .then(()=>{
           console.log(`Registered`); 
        })
        alert('registered');
        navigate('/user-login');

    }

})
  function VerifyUser(e:any){
    axios.get(`https://video-library-cxf0.onrender.com/get-users`)
    .then(response=>{
        for(var user of response.data){
            if(user.user_id===e.target.value){
                setUserMsg('User Id taken-try Another');
                setUserColor('text-danger');
                break;
            }else{
               setUserMsg('user id available'); 
               setUserColor('text-success');
            }
        }
    })

  }
 return(
    <div>
        <h2>Register User</h2>
        <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>User Id</dt>
                <dt><input type="text" onKeyUp={VerifyUser} onChange={formik.handleChange} name="user_id" /></dt>
                <dd className={userColor}>{userMsg}</dd>
                <dt>User Name</dt>
                <dt><input type="text"onChange={formik.handleChange} name="user_name"/></dt>
                {/* <dd>{(formik.touched.user_name&& formik.errors.user_name)?formik.errors.user_name:null}</dd> */}
                <dt>password</dt>
                <dt><input type="password"onChange={formik.handleChange} name="password" /></dt>
                <dt>Email</dt>
                <dt><input type="text"onChange={formik.handleChange} name="email"/></dt>
                {/* <dd className="text-danger">{(formik.touched.email &&formik.errors.email)?formik.errors.email:null}</dd> */}
                <dt>mobile</dt>
                <dt><input type="text"onChange={formik.handleChange} name="mobile"/></dt>
                {/* <dd>{(formik.touched.mobile&&formik.errors.mobile)?formik.errors.mobile:null}</dd> */}
            </dl>
            <button type="submit" className="btn-btn-primary">Register</button>
            <div className="mt-3">
                <Link to="/user-login">Existing user?</Link>

            </div>

        </form>
    </div>
 )

}


