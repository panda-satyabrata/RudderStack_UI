import { NavLink } from 'react-router-dom';
import './style.css'
 
const NavBar = () => {
   return (
      <nav>
         <ul>
            <li>
               <NavLink to="/">Home</NavLink>
            </li>
            <li>
               <NavLink to="/add">Add Tracking Plan</NavLink>
            </li>
         </ul>
      </nav>
   );
};
 
export default NavBar;