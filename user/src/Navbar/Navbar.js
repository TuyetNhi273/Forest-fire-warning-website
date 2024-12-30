import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isMaster = localStorage.getItem("isMaster") === "true";

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
