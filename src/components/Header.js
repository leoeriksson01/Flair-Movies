import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="topNav">
          <Link to="/popular">Flair Movies</Link>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="logo"></div>
          </a>
        </div>
        <div className="bottomNav">
          <Link to="/"> Popular </Link>
          <Link to="/latest"> Latest </Link>
          <Link to="/top"> Top </Link>
          <Link to="/search"> Search </Link>
          <Link to="/genres"> Genres </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
