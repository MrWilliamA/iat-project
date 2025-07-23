import "./Header.css";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <header>
      <section className="inner-header">
        <div>
          <img src="/hat-logo.svg" alt="hat-logo" width="50px" height="50px" />
        </div>
        <div>
          <NavMenu />
        </div>
      </section>
    </header>
  );
};

export default Header;
