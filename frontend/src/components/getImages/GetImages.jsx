import React, { useEffect, useState } from 'react';


const GetImages = ({ }) => {
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    // if(token) {
      fetch("http://localhost:8080/api/images", {
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // }
      })
        .then(response => response.json())
        .then(data => {
          // window.localStorage.setItem("token", data.token)
          // setToken(window.localStorage.getItem("token"))

          setImages(data);
        })

    // } 
  }, [])


  
      return(
        <>
        <div>{images.map(imgData => <img src={imgData.imageURL}></img>)}</div>
        </>
      )
}

export default GetImages;