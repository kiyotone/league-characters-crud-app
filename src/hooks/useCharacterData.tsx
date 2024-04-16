import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CharacterType } from "../types/character";

export const useCharacterData = (charId: string | undefined) => {
  return useQuery({
    queryKey: ["character", charId],
    queryFn: async () => {
      return await axios.get(`http://localhost:8000/characters/${charId}`);
    },
  });
};

const addCharacter = (data: CharacterType) => {
  return axios.post("http://localhost:8000/characters", data);
};

export const useAddCharacter = () => {
  return useMutation({
    mutationFn: (data: CharacterType) => addCharacter(data),
  });
};

const deleteCharacter = (id: string) => {
  return axios.delete(`http://localhost:8000/characters/${id}`);
};

export const useDeleteCharacter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCharacter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};

const updateCharacter = (data: CharacterType) => {
  return axios.put(`http://localhost:8000/characters/${data.id}`, data);
};

export const useUpdateCharacter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CharacterType) => updateCharacter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};
