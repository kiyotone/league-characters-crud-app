import Character from "../components/Character";
import axios from "axios";
import { CharacterType } from "../types/character";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IoTrashBin } from "react-icons/io5";
import { useDeleteCharacter } from "../hooks/useCharacterData";
const CharactersDisplay = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      return await axios.get("http://localhost:8000/characters");
    },
  });

  const { mutateAsync } = useDeleteCharacter();
  const handleDelete = async (id: string) => {
    console.log(id);
    await mutateAsync(id);
  };

  return (
    <div className="h-screen">
      <div className="absolute top-3 left-20 p-4">
        <Link to="/">
          <button className="bg-yellow-600 text-gray-600 hover:bg-yellow-500 hover:text-gray-700 rounded-lg shadow-lg p-2">
            Home
          </button>
        </Link>
      </div>

      {!isError ? (
        <div>
          <h1 className="text-4xl pb-14 font-bold text-center text-yellow-600 animate-pulse">
            Characters
          </h1>

          {isLoading ? (
            <div className="text-2xl text-center">Loading....</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {data?.data.map((character: CharacterType) => {
                return (
                  <div className="relative">
                    <Character {...character} />
                    {JSON.parse(localStorage.getItem("user") || "{}").role ==
                      0 && (
                      <div
                        className="absolute top-0 right-0 text-red-800 z-30 text-2xl hover:scale-150 duration-300 ease-in-out"
                        onClick={() => handleDelete(String(character.id))}
                      >
                        <IoTrashBin />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-4xl pb-14 font-bold text-center text-yellow-600 animate-pulse">
            Error
          </h1>
          <div className="text-2xl text-center text-red-600">
            {error.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharactersDisplay;
