import './Feed.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import SingleImage from '../SingleImage/SingleImage';
import React, { useEffect, useState } from 'react';


const Feed = () => {
    const [images, setImages] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
        fetch("http://localhost:8080/api/images", {
        })
            .then(response => response.json())
            .then(data => {
    
            setImages(data);
            })
    
        // } 
    }, [])
    console.log(images);

    return (
        
        <div id="image-layout-outer-box" className="image-layout">
        <Box id="image-layout-inner-box" sx={{ width: "400", overflowy: 'scroll' }}>
        
        <ImageList id="image-list" variant="masonry" cols={3} gap={0}>
            {images.map((item) => (
            <ImageListItem key={item.imageURL} id={`image-${item._id}`} >
                <SingleImage imgUrl={item.imageURL} />
                
                {/* // srcSet={`${item.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                // src={`${item.imageURL}?w=248&fit=crop&auto=format`}
                // width={item.width}
                // height={item.height}
                // loading="lazy"
                // style={{ height: `${item.height}px` // this will change the height of the image based on likes/upvotes
                //     }} */}
                        
                    
                {/* // /> */}
            </ImageListItem>
            ))}
        </ImageList>
        </Box>
        </div>
    );
    }


export default Feed