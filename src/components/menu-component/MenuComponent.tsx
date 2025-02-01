import {Link} from "react-router";
import "./MenuStyle.css"

export const MenuComponent = () => {
    return (
        <div className='menu text-3xl'>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'users'}>Users</Link></li>
                <li><Link to={'/recipes'}>Recipes</Link></li>
                <li><Link to={'/auth'}>Login</Link></li>
            </ul>
        </div>
    );
};