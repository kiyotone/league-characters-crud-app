import { Link } from "react-router-dom";
import AddCharacter from "../components/AddCharacter";
import { useState } from "react";

const Home = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [loggedin, setLoggedIn] = useState<boolean>(
    localStorage.getItem("user") == null ? false : true
  );
  const handleLoggout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedin ? (
        <div
          className="absolute top-3 right-20 p-4"
          onClick={() => handleLoggout()}
        >
          <button className="bg-yellow-600 text-gray-600 hover:bg-yellow-500 hover:text-gray-700 rounded-lg shadow-lg p-2">
            Logout
          </button>
        </div>
      ) : (
        <div className="absolute top-3 right-20 p-4">
          <Link to="/login">
            <button className="bg-yellow-600 text-gray-600 hover:bg-yellow-500 hover:text-gray-700 rounded-lg shadow-lg p-2">
              Login
            </button>
          </Link>
        </div>
      )}
      <div className="h-screen flex justify-center items-center gap-x-10">
        <Link
          to={"/character"}
          className="bg-yellow-600 p-8 text-gray-600 hover:scale-110 ease-in-out duration-300 hover:bg-yellow-500 hover:text-gray-700 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-center">Characters</h1>
          <p className="text-center">Click here to view the characters</p>
        </Link>
        <div
          onClick={() => setDisplay(true)}
          className="bg-yellow-600 p-8 text-gray-600 hover:scale-110 ease-in-out duration-300 hover:bg-yellow-500 hover:text-gray-700 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-center">Add</h1>
          <p className="text-center">Click here to add a new character</p>
        </div>
        <div
          className={`absolute duration-1000 ease-in-out h-full ${
            !display && "hidden"
          }`}
        >
          <AddCharacter setDisplay={setDisplay} />
        </div>
      </div>
    </div>
  );
};

export default Home;
