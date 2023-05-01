
import {Typography, Avatar, Button} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import './about.css'

const About = () => {
    const visitInstagram = () => {
      window.location = "https://instagram.com/gursimran2150";
    };
    return (
      <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
          <Typography component="h1">About Us</Typography>
  
          <div>
            <div>
              <Avatar
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                src="https://github.com/meabhisingh/mernProjectEcommerce/blob/master/frontend/public/Profile.png"
                alt="Founder"
              />
              <Typography>Gursimranjit Singh</Typography>
              <Button onClick={visitInstagram} color="primary">
                Visit Instagram
              </Button>
              <span>
                This is a sample wesbite made by @gursimran2150. Only with the
                purpose to learn MERN Stack Development
              </span>
            </div>
            <div className="aboutSectionContainer2">
              <Typography component="h2">Our Brands</Typography>
              <a
                href="https://github.com/gursimran2150"
                target="blank"
              >
                <GitHubIcon className="youtubeSvgIcon" />
              </a>
  
              <a href="https://instagram.com/gursimran2150" target="blank">
                <InstagramIcon className="instagramSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;