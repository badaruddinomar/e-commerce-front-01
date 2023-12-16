import { features, teammates, testimonials } from "../data/data";
import Carousel from "react-material-ui-carousel";
import "./about.scss";
import MetaData from "./../MetaData";
const About = () => {
  // carousel options--
  const carouselOptions = {
    autoPlay: true,
    duration: 300,
    animation: "slide",
    navButtonsAlwaysVisible: true,
  };
  // jsx start from here--
  return (
    <>
      <MetaData title={"About Page"} />
      <div className="about-page">
        {/* banner div-- */}
        <div className="about-banner">
          <h2>Why Choose Us?</h2>
        </div>
        <div className="about-container">
          {/* features div-- */}
          <div className="features">
            {features.map((feature, ind) => {
              return (
                <div className="feature" key={ind}>
                  <img src={feature.image} alt="feature-image" />
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
          {/* Teammates Div -- */}
          <div className="teammates">
            <h2>Our Team</h2>
            <div className="team-member-container">
              {teammates.map((team, ind) => {
                return (
                  <div className="team-member" key={ind}>
                    <img src={team.image} alt="image" />
                    <h4>{team.name}</h4>
                    <p>{team.title}</p>
                    <p>{team.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Testimonials div-- */}
          <div className="testimonials">
            <h2>Testimonials</h2>
            <Carousel className="slider-container" {...carouselOptions}>
              {testimonials.map((slide, ind) => {
                return (
                  <div className="slide" key={ind}>
                    <p className="desc">{slide.desc}</p>
                    <img src={slide.image} alt="slide-image" />
                    <h4 className="name">{slide.name}</h4>
                    <p className="title">{slide.title}</p>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
