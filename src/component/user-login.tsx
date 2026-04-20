import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const API_URL = "https://video-library-cxf0.onrender.com";

export function UserLogin(){

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      user_id:'',
      password:''
    },
    onSubmit:(user)=>{
      axios.post(`${API_URL}/user-login`, user)
      .then(response=>{
        console.log(response.data);

        if(response.data.success){
          navigate("/user-dashboard");
        } else {
          navigate("/user-login-error");
        }
      })
      .catch(err=>{
        console.log(err);
        navigate("/user-login-error");
      })
    }
  });

  return(
    <div>
      <h2>User Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" name="user_id" onChange={formik.handleChange} placeholder="User Id" />
        <input type="password" name="password" onChange={formik.handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}