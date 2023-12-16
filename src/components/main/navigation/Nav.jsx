import {Link} from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav className="flex-center py-2 bg-white w-screen  drop-shadow-sm">
        <ul>
          <li>
            <Link to="/">
              <img src="" alt="Logo" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
