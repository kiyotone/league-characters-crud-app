import { UserType } from "../types/user";
import axios from "axios";

export const loginCharacter = async (data: UserType) => {
  const response = await axios.get("http://localhost:8000/users");

  var send = false

  response.data.forEach((Gotdata: UserType) => {
    if (Gotdata.name == data.name && Gotdata.password == data.password) {
      localStorage.setItem("user", JSON.stringify(Gotdata));
      send = true;
    }
  });
  return send;
};
