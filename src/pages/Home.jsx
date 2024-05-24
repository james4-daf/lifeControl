import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="basis-4/5">
      <h1>Home Page</h1>

      <button>hello</button>
      <Link to="/randome">follow In</Link>
    </div>
  );
};

export default Home;
