// import axios from "axios";
// import { createContext, useContext, useEffect, useState, type SetStateAction } from "react"
// import type { VideoContract } from "../contracts/video-contract";
// import { string } from "yup";


// let searchContext = createContext<string | undefined>(undefined);

// export function MainComponent(){

//     let search = useContext(searchContext);

//     const [videos, setVideos] = useState([{video_id:0,title:'',description:'',comments:'',likes:0,views:0,url:'',category_id:0}])
//     useEffect(()=>{

//          axios.get(`http://127.0.0.1:5079/get-video/${search}`)
//          .then(response => {
//              setVideos(response.data);
//              console.log(response.data,"dataaaaaaaa")
//          });

//     },[search])

//     return(
//         <div>
//             <div className="h5">Search Results</div>
//             <main className="d-flex flex-wrap">
//                  {
//                 videos?.map(video=>
//                    <div key={video.video_id} className="card m-2 p-1" style={{width:'250px'}}>
//                     <iframe src={video.url} height="200"></iframe>
//                     <div className="card-header">
//                         <h3>{video.title}</h3>
//                     </div>
//                     <div className="card-body">
//                        {video.description}
//                        {video.comments}

//                     </div>
//                     <div className="card-footer">
//                         <span className=" bi bi-hand-thumbs-up">{video.likes}</span>
//                         <span className=" bi bi-eye mx-2">{video.views}</span>


//                     </div>
//                    </div> 
//                 )
//             }
//             </main>
//         </div>
//     )
// }

// export function ProductsSearch(){


//     const [searchString, setSearchString] = useState('');

//     const [contextValue, setContextValue] = useState<string>('');

//     function handleSearchChange(e: { target: { value: SetStateAction<string>; }; }){
//         setSearchString(e.target.value);
//     }
//     function handleSearchClick(){
//         setContextValue(searchString);
//     }

//     return(
//         <div className="container-fluid">
//             <header className="mt-3 p-4 d-flex justify-content-center">
//                 <div className="input-group w-50">
//                     <input type="text" onChange={handleSearchChange} placeholder="Search video" className="form-control" /> <button onClick={handleSearchClick} className="bi bi-search btn btn-warning"></button>
//                 </div>
//             </header>
//             <section className="mt-4">
//                 <searchContext.Provider value={contextValue}>
//                      <MainComponent />
//                 </searchContext.Provider>
//             </section>
//         </div>
//     )
// }

// Remove context import
import axios from "axios";
import { useEffect, useState } from "react";
import type { VideoContract } from "../contracts/video-contract";

// MainComponent accepts `search` as a prop
export function MainComponent({ search }: { search: string }) {
    const [videos, setVideos] = useState<VideoContract[]>([]);

    useEffect(() => {
        if (search) {
            axios.get(`http://127.0.0.1:5080/get-video/${search}`)
                .then(response => {
                    setVideos(response.data);
                    console.log(response.data)
                })
                .catch(error => console.error("Error fetching videos", error));
        }
    }, [search]);

    return (
        <div>
            <div className="h5">Search Results</div>
            <main className="d-flex flex-wrap">
                {videos.map(video => (
                    <div key={video.video_id} className="card m-2 p-1" style={{ width: '250px' }}>
                        <iframe src={video.url} height="200"></iframe>
                        <div className="card-header">
                            <h3>{video.title}</h3>
                        </div>
                        <div className="card-body">
                            {video.description}
                            <br />
                            {video.comments}
                        </div>
                        <div className="card-footer">
                            <span className="bi bi-hand-thumbs-up">{video.likes}</span>
                            <span className="bi bi-eye mx-2">{video.views}</span>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export function ProductsSearch() {
    const [searchString, setSearchString] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const handleSearchClick = () => {
        setSearchTerm(searchString);
    };

    return (
        <div className="container-fluid">
            <header className="mt-3 p-4 d-flex justify-content-center">
                <div className="input-group w-50">
                    <input type="text" onChange={handleSearchChange} placeholder="Search video" className="form-control" />
                    <button onClick={handleSearchClick} className="bi bi-search btn btn-warning"></button>
                </div>
            </header>
            <section className="mt-4">
                <MainComponent search={searchTerm} />
            </section>
        </div>
    );
}


