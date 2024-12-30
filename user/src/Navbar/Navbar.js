import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const isMaster = useSelector((state) => state.auth.isMaster);

  const handleHomeClick = () => {
    navigate(isMaster ? "/home" : "/homeuser");
  };

  return (
    <nav>
      <button onClick={handleHomeClick}>Home</button>
      {/* Các nút khác */}
    </nav>
  );
};

export default Navbar;
