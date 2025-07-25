import { Link } from "react-router";

const About = () => {
  return (
    <main>
      <h1>About</h1>
      <p>I am fabulous.</p>
      <Link to="/">Now go back to the course page.</Link>
    </main>
  );
};

export default About;
