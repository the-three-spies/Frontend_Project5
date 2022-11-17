import "./ourTeam.css";

const OurTeam = () => {
  return (
    <section>
      {/* <div className="row-title">
        <h1 className="row-header-title">Our Team</h1>
      </div> */}
      <div className="row">
        {/* column Walla */}
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img
                src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668097554/samples/project%205/fitrat_iNsan_wn8qlh.png"
                alt="img"
              />
            </div>
            <h4>Walaa</h4>
            <p>Developer</p>
            <div className="icons">
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#">
                <i className="bi bi-github"></i>
              </a>
              <a href="#">
                <i className="bi bi-envelope-fill"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>
        </div>
        {/* column Hind */}
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img
                src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668097554/samples/project%205/fitrat_iNsan_wn8qlh.png"
                alt="img"
              />
            </div>
            <h4>Hind</h4>
            <p>Developer</p>
            <div className="icons">
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#">
                <i className="bi bi-github"></i>
              </a>
              <a href="#">
                <i className="bi bi-envelope-fill"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>
        </div>
        {/* column Aseel */}
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img
                src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668097554/samples/project%205/fitrat_iNsan_wn8qlh.png"
                alt="img"
              />
            </div>
            <h4>Aseel</h4>
            <p>Developer</p>
            <div className="icons">
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#">
                <i className="bi bi-github"></i>
              </a>
              <a href="#">
                <i className="bi bi-envelope-fill"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurTeam;
