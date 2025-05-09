import Test from "../test/page";
import Header from "./Header";
import HomePage from "./Home";

const FrontPage = ({user}) => {
  return (
    <div className="blur-wrapper">
      <HomePage user={user}/>
    </div>
  );
};

export default FrontPage;
