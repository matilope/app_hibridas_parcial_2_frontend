import { Link } from "react-router-dom";

const NavBar = ({ links }) => (
  <nav>
    <ul>
      {links?.map((item) => (
        <Link key={item.name} to={item.url}>{item.name}</Link>
      ))}
    </ul>
  </nav>
);

export {
  NavBar
}