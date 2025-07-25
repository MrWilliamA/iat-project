import { Link } from "react-router";

const Contact = () => {
  return (
    <main>
      <h1>Contact</h1>
      <a href="mailto:william.archer6@studytafensw.edu.au">Email me</a>
      <p>or</p>
      <Link to="/">Now go back to the course page.</Link>
    </main>
  );
};

export default Contact;
