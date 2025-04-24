import Header from "./Header";
import HomePage from "./Home";

const FrontPage = ({user}) => {
  return (
    <div className="blur-wrapper">
      <Header />
      <HomePage user={user}/>
    </div>
  );
};

export default FrontPage;
