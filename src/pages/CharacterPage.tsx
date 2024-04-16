import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCharacterData } from "../hooks/useCharacterData";
import UpdateCharacter from "../components/UpdateCharacter";

const CharacterPage = () => {
  const [updater, setDisplay] = useState(false);
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isError, error } = useCharacterData(id);
  console.log(data);
  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        {error.message || "An error occurred"}
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-yellow-600 rounded-lg shadow-lg text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{data?.data.name}</h1>
          <p className="text-lg">ID: {data?.data.id}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Abilities</h2>
            <div>
              <p className="text-base mb-2">
                <strong>Passive:</strong> {data?.data.passive}
              </p>
              <p className="text-base mb-2">
                <strong>Q Ability:</strong> {data?.data.q}
              </p>
              <p className="text-base mb-2">
                <strong>W Ability:</strong> {data?.data.w}
              </p>
              <p className="text-base mb-2">
                <strong>E Ability:</strong> {data?.data.e}
              </p>
              <p className="text-base mb-2">
                <strong>R Ability:</strong> {data?.data.r}
              </p>
            </div>
          </div>
          <div>
            <div
              onClick={() => setDisplay(true)}
              className=" cursor-pointer text-xl bg-black items-center flex flex-col rounded-md h-10 font-semibold mb-4"
            >
              Update
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute duration-1000 ease-in-out h-full ${
          !updater && "hidden"
        }`}
      >
        <UpdateCharacter setDisplay={setDisplay} inData={data?.data} />
      </div>
    </div>
  );
};

export default CharacterPage;
