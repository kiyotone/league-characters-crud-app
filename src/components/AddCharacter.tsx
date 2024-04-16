import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CharacterType } from "../types/character";
import { useAddCharacter } from "../hooks/useCharacterData";

type SetDisplayType = React.Dispatch<React.SetStateAction<boolean>>;

const AddCharacter: React.FC<{ setDisplay: SetDisplayType }> = ({
  setDisplay,
}) => {
  const { mutateAsync, error } = useAddCharacter();

  const onSubmit = async (data: CharacterType) => {
    console.log(data);
    await mutateAsync(data);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      passive: "",
      q: "",
      w: "",
      e: "",
      r: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  console.log(errors);

  return (
    <div>
      <div className="h-screen w-[60rem] flex justify-center items-center  ">
        <div className="absolute top-0 left-0">
          <button onClick={() => setDisplay(false)}>Close</button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-yellow-600 w-[60rem] h-[30rem] p-8  text-gray-600 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-center mb-11">
            Add Character
          </h1>
          <div className="gap-x-10 grid grid-cols-2 gap-y-4 w-full h-1/2">
            <div className="w-full">
              <input
                id="name"
                {...register("name", {
                  required: "name is required",
                  validate: (fieldValue) => {
                    return fieldValue !== "Draven" || "Draven is not allowed";
                  },
                })}
                className="text-left w-full h-10 pl-4 text-white rounded-md"
                placeholder="Name"
              ></input>
              <p className="text-red-600">{errors?.name?.message}</p>
            </div>

            <div className="w-full">
              <input
                id="passive"
                {...register("passive", {
                  required: "passive is required",
                })}
                className="text-left w-full h-10 pl-4 text-white rounded-md"
                placeholder="Passive"
              ></input>
              <p className="text-red-600">{errors?.passive?.message}</p>
            </div>
            <div className="w-full">
              <input
                id="q"
                {...register("q", {
                  required: "q is required",
                })}
                className="text-left w-full h-10 pl-4 text-white rounded-md"
                placeholder="Q"
              ></input>
              <p className="text-red-600">{errors?.q?.message}</p>
            </div>
            <div className="w-full">
              <input
                id="w"
                {...register("w", {
                  required: "w is required",
                })}
                className="text-left w-full h-10 pl-4 text-white rounded-md"
                placeholder="W"
              ></input>
              <p className="text-red-600">{errors?.w?.message}</p>
            </div>
            <div className="w-full">
              <input
                id="e"
                {...register("e", {
                  required: "e is required",
                })}
                className="text-left w-full h-10 pl-4 text-white rounded-md"
                placeholder="E"
              ></input>
              <p className="text-red-600">{errors?.e?.message}</p>
            </div>
            <div className="w-full">
              <input
                id="r"
                {...register("r", {
                  required: "r is required",
                })}
                className="text-left w-full h-10 pl-4 text-white rounded-md"
                placeholder="R"
              ></input>
              {<p className="text-red-600">{errors?.r?.message}</p>}
            </div>
          </div>

          <p className="text-red-600">{error?.message}</p>
          <button className="text-center mt-10">Submit</button>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
};

export default AddCharacter;
