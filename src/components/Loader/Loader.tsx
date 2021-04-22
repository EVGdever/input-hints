import React from "react";
import loader from "../../images/loader.png";

const Loader: React.FC = () => {
  return (
    <div className="loader" >
      <img src={loader} alt="loader"/>
    </div>
  )
}

export default Loader;