import Test from "../test/page";
import Header from "./Header";
import HomePage from "./Home";
import LandingPage from "./LandingPage";

const FrontPage = ({user}) => {
  return (
    <div className="blur-wrapper">
    <LandingPage user={user}/>
    </div>
  );
};

export default FrontPage;
