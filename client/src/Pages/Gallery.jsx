import styles from './Gallery.module.css'
import logo from '../assets/paint-brush.png'
import { Link } from 'react-router-dom';


const Gallery = () => {
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
            <div>Gallery</div>
        </>
    );
}

export default Gallery;