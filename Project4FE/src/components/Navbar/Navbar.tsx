import { useNavigate } from "react-router-dom";
import"./Navbar.css";


const Navbar = () => {

    const navigate = useNavigate();

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
     

       
            <div onClick={()=> navigate("/")} className="nav-link">
                Logout
            </div>
        </div>
        </nav>

    )
}

export default Navbar