import React from "react";

const Error = ({ error }) => {
  return (
    <main>
      <p>
        Oh no!, there has been an error.{" "}
        <span className="error-message">{error.message}</span>
      </p>
    </main>
  );
};

export default Error;
