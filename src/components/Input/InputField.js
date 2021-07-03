import React, { useState, useRef } from "react";
import swal from "sweetalert";

import Link from "./Link";

const InputField = (props) => {
  const [isValid, setIsValid] = useState(true);

  const searchInput = useRef();

  const search = () => {
    if (searchInput.current.value.trim().length !== 0) {
      setIsValid(true);
      props.setSearchName(searchInput.current.value);
    } else {
      setIsValid(false);
      swal("Error!", "Enter valid City Name", "error");
    }
  };

  return (
    <section className="input_container">
      <input
        placeholder="City Name,country code...."
        ref={searchInput}
        className={`input ${!isValid && "empty"}`}
      />
      <Link />
      <button onClick={search} className="input-btn">
        Search
      </button>
    </section>
  );
};

export default InputField;
