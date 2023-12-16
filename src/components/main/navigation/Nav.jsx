import {Link} from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav className="flex-center py-2 bg-white w-screen drop-shadow-md">
        <ul>
          <li>
            <Link to="/" className="outline-none">
              <img src="" alt="Logo" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
