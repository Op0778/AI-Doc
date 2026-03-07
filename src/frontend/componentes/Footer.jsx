import "../styles/footer.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const footData = [
  { icon: <BsGithub />, link: "", title: "GitHub" },
  {
    icon: <BsLinkedin />, link: "", title: "LinkedIn",
  },
];

const Footer = ({ scrollToSection, refs }) => {

  const handleNavClick = (ref) => {
    if (ref && scrollToSection) {
      scrollToSection(ref);
    }
  };

  return (
    <div className="foot">
      <div className="bottom">

        {/* Social Icons */}
        <div className="social">
          {footData.map((foot, idx) => (
            <a
              key={idx}
              href={foot.link}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
              title={foot.title}
            >
              {foot.icon}
            </a>
          ))}
        </div>

        {/* Navigation */}
        <nav className="footer-nav">
          <li onClick={() => handleNavClick(refs.aboutRef)}>Home</li><br></br><br></br>
          <li onClick={() => handleNavClick(refs.skillRef)}>Account</li><br></br><br></br>
          <li onClick={() => handleNavClick(refs.projectRef)}>History</li><br></br><br></br>
          <li onClick={() => handleNavClick(refs.internRef)}>About</li>
        </nav>

      </div>

      {/* Bottom Footer Content */}
      <div className="bottom">
        <p>AI-DOCX Generator Automatically converts GitHub repositories into structured documentation | Smart AI documentation workflow.</p><br></br>
 <marquee direction ="left"><p>Built and Reserved by Om Prakash , Loga Kumaresan © 2026 </p></marquee> 
      </div>
    </div>
  );
};

export default Footer;