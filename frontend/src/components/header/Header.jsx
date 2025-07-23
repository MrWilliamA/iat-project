import "./Header.css";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <section className="inner-header">
        <div>
          <Link to="/">
            <img
              src="/hat-logo.svg"
              alt="hat-logo"
              width="50px"
              height="50px"
            />
          </Link>
        </div>
        <div>
          <NavMenu />
        </div>
      </section>
    </header>
  );
};

export default Header;
