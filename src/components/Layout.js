import {useEffect} from 'react';
import Menu from './Menu';
import Footer from '../components/home/footer';

const Layout = ({ title = 'Title', className,children }) => { 
    useEffect(()=>{ 
        document.title=title; 
    },[])
    return (
        <div>
            <div className="mb-3">
                <Menu/>
            </div>
            <div className={className}>{children}</div>
            <div>
                <Footer/>
            </div>
        </div>

    )
}
export default Layout;