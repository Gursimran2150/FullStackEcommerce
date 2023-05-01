import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img
          src="https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/playstore.png"
          alt="playstore"
        />
        <img
          src="https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Appstore.png"
          alt="Appstore"
        />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; gursimran2150</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a
          href="http://instagram.com/gursimran2150"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        {/* <a href="http://youtube.com/6packprogramemr">LinkeDin</a> */}
        <a
          href="http://github.com/gursimran2150"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
