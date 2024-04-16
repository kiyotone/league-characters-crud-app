import { useForm } from "react-hook-form";
import { UserType } from "../types/user";
import { DevTool } from "@hookform/devtools";
import { loginCharacter } from "../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const form = useForm<UserType>();

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  console.log(errors);
  const navigate = useNavigate();

  const onSubmit = async (data: UserType) => {
    const res = await loginCharacter(data);
    console.log(res)
    if (res) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="w-full bg-yellow-600 max-w-xs">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-yellow-600 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("name", {
                required: "name is required",
                validate: (fieldValue) => {
                  return fieldValue !== "Draven" || "Draven is not allowed";
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "password is required",
              })}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default Login;
