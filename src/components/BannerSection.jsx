const BannerSection = ({ title, description, imageSrc }) => {
  const sectionStyle = {
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black',
    padding: '60px',
    borderRadius: '8px',
    minHeight: '600px',
    opaciiy: '.5',
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 text-center d-flex align-items-center justify-content-center" style={sectionStyle}>
            <div className="banner-box p-5 bg-white">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
