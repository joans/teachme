import React from "react";

const ErrorPage = (props) => {
  return (
    <>
      <h1>ERROR!</h1>
      {props.children && <p>{props.children}</p>}
    </>
  );
};

export default ErrorPage;
