import styles from './Gallery.module.css'
import logo from '../assets/paint-brush.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Gallery = () => {

    const [allImages, setAllImages] = useState([]);


    useEffect(() => {

        const url = 'http://localhost:5001/api/v1/dalle';


        axios.get(url)
            .then(response => {
                setAllImages(response.data.reverse());
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    const downloadImage = async (imageLink) => {
        const url = imageLink;
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'generated-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
    };

    const handleOpenImage = (imageLink) => {
        if (imageLink) {
            window.open(imageLink, '_blank');
        } else {
            console.log('No image URL available');
        }
    };




    return (
        <>
            <div className={styles['navbar']}>
                <Link to='/'>
                    <div className={styles['logo-div']}>
                        <img src={logo} alt="" />
                        <h1>Pintor  AI</h1>
                    </div>
                </Link>
                <div className={styles['nav-routes']}>
                    <Link to='/'>
                        <h1>Home</h1>
                    </Link>
                    <Link to='/gallery'>
                        <h1>Gallery</h1>
                    </Link>
                </div>
            </div>
            <div className={styles['gallery']}>
                <div className={styles['content']}>
                    <h1>Gallery</h1>
                    <h2>Latest generated images from PintorAI</h2>
                    <div className={styles['cards']}>
                        {allImages.length > 0 ? (
                            allImages.map((image, index) => (
                                <div key={index} className={styles['card']}>
                                    <img src={image.imgLink} alt='img' />
                                    <p>{image.prompt}</p>
                                    <div className={styles['btns-div']}>
                                        <button onClick={() => downloadImage(image.imgLink)} className={styles['download-btn']}>Download Image</button>
                                        <button onClick={() => handleOpenImage(image.imgLink)} className={styles['original-btn']}>Open Original Image</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No images available</p>
                        )}  
                    </div>

                </div>

            </div>
        </>
    );
}

export default Gallery;