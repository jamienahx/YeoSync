import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import"./Navbar.css";
import { signOut } from "../Services/authService";
import { UserContext } from "../Contexts/UserContext";
import { useState } from "react";
import {fetchMembers} from "../Services/navbarService";
import { useEffect } from "react";


const Navbar = () => {

    const navigate = useNavigate();
      const { setUser } = useContext(UserContext);
      const [members, setMembers] = useState<string[]>([]);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

useEffect(() => {
    const loadMembers = async () => {
      const data = await fetchMembers();
      setMembers(data);
    };
    loadMembers();
  }, []);

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
    <div className="nav-link dropdown"
    onMouseEnter={()=>setIsDropdownOpen(true)}
    onMouseLeave={()=> setIsDropdownOpen(false)}
          >
            Members ▾
            {isDropdownOpen && (
              <div className="dropdown-menu">
              {members.map((member) => ( //loop over the array of strings, on every iteration, create a div block
                <div
                key={member} 
                className="dropdown-item"
                onClick={()=>navigate(`/members/${member}`)}
                >
                {member}
                </div>
              ))}
               </div>
            )}
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