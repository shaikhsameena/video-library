import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { VideoLibraryHome } from './component/vedeo-library-home';
import { UserRegister } from './component/user-register';
import { UserLogin } from './component/user-login';
import { AdminLogin } from './component/admin-login';
import { AdminDashboard } from './component/admin-dashboard';
import { AddVideo } from './component/add-video';
import { EditVideo } from './component/edit-video';
import { DeleteVideo } from './component/delete-video';
import { UserDashBoard } from './component/user-dashboard';
import { MainComponent } from './component/serach';


export function App(){
  return(
    <div className='container-fluid'>
      <BrowserRouter>
      <header className='bg-dark text-white p-3'>       
      <span className='text-center'><Link to="/" className='btn btn-dark btn-lg d-flex justify-content-center text-content-center fs-2'>Video Project</Link></span>
        <div className='input-group d-flex justify-content-center'>
        <input type="text"className='w-25' />
        <span className='bi bi-search btn btn-warning'></span>
        </div>


      </header>
      <section>
        <Routes>
          <Route path='/'element={<VideoLibraryHome/>}/>
          <Route path='user-register'element={<UserRegister/>}/>
          <Route path='user-login'element={<UserLogin/>}/>
          <Route path='admin-login'element={<AdminLogin/>}/>
          <Route path='admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='add-video'element={<AddVideo/>}/>
          <Route path='edit-video/:id'element={<EditVideo/>}/>
          <Route path='delete-video/:id' element={<DeleteVideo/>}/>
          <Route path='user-dashboard' element={<UserDashBoard/>}/>
          <Route path="/user-login-error" element={<h2>Invalid User Id or Password</h2>} />
          <Route path='serach' element={<MainComponent search={''}/>}/>
        </Routes>
      </section>
      
      </BrowserRouter>

    </div>
  )
    
  
}
