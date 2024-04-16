import { CharacterType } from "../types/character";
import { Link } from "react-router-dom";

const Character = (props: CharacterType) => {
  return (
    <Link to={`${props.id}`}>
      <div className="max-w-sm bg-yellow-600 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-white text-xl mb-2">{props.name}</div>
          <div className=" flex flex-col items-start">
            <p className="text-green-300 text-base">Passive: {props.passive}</p>
            <p className="text-gray-700 text-base">Q: {props.q}</p>
            <p className="text-gray-700 text-base">W: {props.w}</p>
            <p className="text-gray-700 text-base">E: {props.e}</p>
            <p className="text-gray-700 text-base">R: {props.r}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Character;
