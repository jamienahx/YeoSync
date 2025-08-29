import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import"./Navbar.css";
import { signOut } from "../Services/authService";
import { UserContext } from "../Contexts/UserContext";


const Navbar = () => {

    const navigate = useNavigate();
      const { setUser } = useContext(UserContext);

      const handleLogout = () => {
        signOut();
        setUser(null);
        navigate("/");
      }

    return (

        <nav className="navbar">
   
      <div className="nav-left">
        <div onClick={() => navigate("/dashboard")} className="nav-link">
          Home
        </div>
        <div onClick={() => navigate("/priority")} className="nav-link">
          Priority
        </div>
      </div>
 <div className="nav-right">
     

       
            <div onClick={handleLogout} className="nav-link">
                Logout
            </div>
        </div>
        </nav>

    )
}

export default Navbar