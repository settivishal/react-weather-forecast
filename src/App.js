import { useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Display from "./components/DisplayPart/Display";
import InputField from "./components/Input/InputField";

function App() {
  const [searchName, setSearchName] = useState("Hyderabad");

  return (
    <>
      <Header />
      <InputField setSearchName={setSearchName} />
      <Display searchName={searchName} />
    </>
  );
}

export default App;
