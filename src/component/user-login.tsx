import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import {Link,useNavigate} from "react-router-dom";

export function UserLogin(){
  const[, setCookies] = useCookies(['userid']);

    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
           user_id:'',
           password:''
        },
        onSubmit:(user)=>{
            axios.get(`https://video-library-cxf0.onrender.com/get-users`)
            .then(response=>{
                let result=response.data.find((item:any)=> item.user_id===user.user_id);
                console.log(result);
                if(result){
                    if(result.password===user.password){
                       setCookies('userid',user.user_id);
                        navigate('/user-dashboard');
                    }else{
                      alert(`Invalid password`);  
                    }
                }else{
                    navigate('/user-login-error');
                }

            })
        }

    })


    return(
        <div>
            <h1>User Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>user Id</dt>
                    <dd><input type="text" name="user_id" onChange={formik.handleChange}/></dd>
                     <dt>password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange}/></dd>
                </dl>
               <button type="submit" className="btn btn-warning">Login</button>
            </form>
            <div className="mt-3">
                <Link to="/user-register">create New account?</Link>


            </div>

        </div>
    )
}