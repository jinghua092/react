import React, {useState, useEffect} from 'react'
import Search from '../components/Search'
import Picture from "../components/Picture"


const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f91700001000001701e5416c56e46b4ba6a1be7cb3e96b3";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL= `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  //search method : fetch data from pexels api
  const search = async (url) =>{
    setPage(2);
    const dataFetch =  await fetch(url,{
      method: "GET",
      headers:{
        Accept:"application/json",
        Authorization: auth,
      }
    });
    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
    

  }

  //load more picture 
  const morepicture = async() =>{
    let newURL;
    if (input ==="") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    }else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page+1);
    const dataFetch =  await fetch(newURL,{
      method: "GET",
      headers:{
        Accept:"application/json",
        Authorization: auth,
      }
    });
    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  }

  
  //fetch data when the page loads up
  useEffect(()=>{
    search(initialURL);
  },[]);

  useEffect(()=>{
    if (currentSearch === ""){
      search(initialURL);

    }else {
      search(searchURL);
    }
    search(searchURL);
  },[currentSearch]);



  return (
    <div style={{minHeight:"100vh"}}>
      <Search search={()=> {
        //js closure
        setCurrentSearch(input);
        // search(searchURL)
        }} 
        setInput={setInput}/>
      <div className="pictures">
        { data &&
          data.map( (d)=>{
            return <Picture data={d} />
          })
        }
      </div>

      <div className="morePicture">
        <button onClick={morepicture}>Load More</button>
      </div>
    </div>
  )
}

export default Homepage