import styles from './Home.module.css'
import logo from '../assets/paint-brush.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../utils/LoadingSpinner';

const Home = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isImageProcessed, setIsImageProcessed] = useState(false);
    const [formData, setFormData] = useState({
        prompt: ''
    });
    const [imageLink, setImageLink] = useState('');


    const handleChange = (e) => {
        setFormData({
            prompt: e.target.value
        });
    };

    const handleCreateImage = async () => {
        setIsLoading(true);
        setIsImageProcessed(false)
        try {
            const response = await axios.post('http://localhost:5001/api/v1/dalle', formData);
            console.log('Response:', response.data);
            setImageLink(response.data.imgLink)
        } catch (error) {
            console.error('There was an error!', error);
        } finally {
            setIsImageProcessed(true)
            setIsLoading(false);
        }
    };

    const downloadImage = async () => {
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

    const handleOpenImage = () => {
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
                        <h1>PintorAI</h1>
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
            <div className={styles['form-div-cover']}>
                <div className={styles['form-div']}>

                    <h1>Imagine, write and let the PintorAI paint it!</h1>
                    <h2>Write down your dream image and PintorAI will draw it for you, or browse the image <Link to='/gallery'>gallery</Link> for more.</h2>
                    <input value={formData.prompt} onChange={handleChange} type="text" placeholder='eg. Eiffel Tower and Liberty Statue in Istanbul' />
                    <button onClick={() => handleCreateImage()} type='submit'>Create Image</button>

                    {isLoading && (
                        <>
                            <p>Please wait <span>PintorAI</span> painting your imagination...</p>
                            <LoadingSpinner />
                        </>
                    )
                    }
                    {isImageProcessed && (
                        <>
                            <img src={imageLink} alt='generated-image' />
                            <div className={styles['btns-div']}>
                                <button onClick={() => downloadImage()} className={styles['download-btn']}>Download Image</button>
                                <button onClick={() => handleOpenImage()} className={styles['original-btn']}>Open Original Image</button>
                            </div>
                        </>
                    )}


                </div>

            </div>

        </>
    );
}

export default Home;