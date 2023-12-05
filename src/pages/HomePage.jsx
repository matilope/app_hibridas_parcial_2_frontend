import BannerSection from '../components/BannerSection';

function HomePage() {
  return (
    <>
      <div className="jumbotron text-center">
        <h1 className="display-4 bold">¡Bienvenidos a RincónGamer!</h1>
      </div>

      <BannerSection
        title="Explora Nuevos Mundos"
        description="Sumérgete en mundos emocionantes y descubre nuevas aventuras."
        imageSrc="images/banner1.jpg"
        altText="Juegos emocionantes"
      />

      <BannerSection
        title="Desafía a tus Amigos"
        description="Juega con tus amigos y compite en emocionantes desafíos en línea."
        imageSrc="images/banner2.jpg"
        altText="Multijugador en línea"
      />

      <BannerSection
        title="Descubre Juegos Únicos"
        description="Explora una amplia variedad de experiencias únicas y envolventes."
        imageSrc="images/banner3.jpg"
        altText="Variedad de experiencias"
      />

    </>
  );
}

export default HomePage;
