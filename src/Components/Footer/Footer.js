import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer">
      <div>
        <p>
          {" "}
          <span>Tour De World</span> on Social Media{" "}
        </p>
        <a className="social-media">Facebook</a>
        <a className="social-media">Twitter</a>
        <a className="social-media">Instagram</a> 
        <a className="social-media">Printerest</a>
      </div>
      <div>
        <p><span>About Tour De World</span></p>
        <ul>
            <li>Contact</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Service Management</li>
        </ul>
      </div>
      <div>
        <p> <span>Tour De world Newsletter</span> </p>
        <input type="email" placeholder="example@mail.com" id="" />
        <input type="submit" value="send" />
      </div>
      </div>
    
        <div className="bottom-footer">
            <p className="copyright">© <span>Tour De World Private Ltd</span> ACN 111 222 333. All rights reserved.</p>
        </div>
    </div>
  );
};

export default Footer;
