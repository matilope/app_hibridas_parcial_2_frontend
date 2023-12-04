import { NavBar } from "./NavBar";

function Nav() {
  const linkList = [
    {
      name: "Inicio",
      url: "/"
    },
    {
      name: "Perfil",
      url: "/perfil"
    }
  ];
  return (
    <header>
      <img src="" alt="" />
      Test
      <NavBar links={linkList} />
    </header>
  )
}

export default Nav;