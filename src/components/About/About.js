import "./about.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const About = () => {
  return (
    <div className="about-body">
      <section className="about">
        <div className="main">
          <img  src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668097554/samples/project%205/fitrat_iNsan_wn8qlh.png"/>
          <div className="all-text">
            <h4>About Us</h4>
            <h1>A House Of Givivig & Power Generosity</h1>
            <p>By creating innovative fundraising technology, we empower people, companies, and nonprofits to support the causes they care about in the moments when they feel inspired and uplift communities everywhere.</p>
            <div className="btn-btn">
              <button type="button" className="bttn2" >Our Team</button>
              <button type="button" className="bttn2">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;

