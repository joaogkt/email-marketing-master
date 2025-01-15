import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/styles/email.css'; 


const Navbar = () => {
  const handleLogout = () => {
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-static-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">
          <img
            src="qw.svg"
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
          Email
        </a>
        <a className="navbar-brand mb-0 h1" href="/">
          EmailMrkt
        </a>
        <a className="navbar-brand" href="#">
          |
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Início <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Administração <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a
                href="/logout"
                className="nav-link"
                onClick={handleLogout}
              >
                Logout <span className="sr-only">(current)</span>
              </a>
              <form id="postForm" action="/logout" method="POST" style={{ display: "none" }}>
                <input type="hidden" name="key" value="value" />
              </form>
            </li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            {/* Placeholder for dynamic page.nav content */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
