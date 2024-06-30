import "../styles/home.css";
import b1 from "../images/bubble1.svg";
import b2 from "../images/bubble2.svg";
import b3 from "../images/bubble3.svg";
import b4 from "../images/bubble4.svg";
import b5 from "../images/bubble5.svg";
import b6 from "../images/bubble6.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <div className="bubbles">
        <div className="bubbleL1">
          <img src={b1} alt="bubble" />
        </div>
        <div className="bubbleL2">
          <img src={b2} alt="bubble" />
        </div>
        <div className="bubbleL3">
          <img src={b3} alt="bubble" />
        </div>
        <div className="bubbleL4">
          <img src={b4} alt="bubble" />
        </div>
        <div className="bubbleR5">
          <img src={b5} alt="bubble" />
        </div>
        <div className="bubbleR6">
          <img src={b6} alt="bubble" />
        </div>
      </div>

      <h1 className="home-h1">
        Experience the Freedom of Permissionless TLDs and Domains
      </h1>
      <p className="home-tagline">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta,
        ante eu laoreet efficitur, ipsum velit sodales sem
      </p>
      <div className="button-group">
        <Link className="b1" to="/search?type=tld">
          Register TLD
        </Link>
        <Link className="b2" to="/search?type=domain">
          Get Domain
        </Link>
      </div>

      <div className="below"></div>
    </main>
  );
}

export default Home;
