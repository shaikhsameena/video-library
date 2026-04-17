import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function AdminLogin(){
    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            Admin_id:'',
            password:''
        },
        onSubmit:(admin:any)=>{
            axios.get(`http://127.0.0.1:5080/get-admin`)
            .then(response=>{
                let result=response.data.find((item:any)=>item.admin_id===admin.admin_id);
                if(result){
                    if(result.password===admin.password){
                        navigate('/admin-dashboard');
                    }else{
                        alert('Invalid password');
                    }
                }else{
                    alert(`Admin doesn't exist`);
                }
            })
        }

    })


    return(
        <div>
            <h2>Admin Login</h2>
             <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>admin Id</dt>
                    <dd><input type="text" name="admin_id" onChange={formik.handleChange}/></dd>
                     <dt>password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange}/></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
             </form>

        </div>
    )

}