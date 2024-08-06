import styles from './Home.module.css'
import logo from '../assets/paint-brush.png'
import { Link } from 'react-router-dom';

const Home = () => {
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
                    <form action="">
                        <h1>Imagine, write and let the PintorAI paint it!</h1>
                        <h2>Write down your dream image and PintorAI will draw it for you, or browse the image <Link to='/gallery'>gallery</Link> for more.</h2>
                        <input type="text" placeholder='eg. Eiffel tower and liberty statue in istanbul' />
                        <button>Create</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;