export interface Pokemon {
  id: number;
  name: string;
  image: undefined | string;
  type: PokemonType;
  hp: number;
  attack: number;
  defense: number;
  idAuthor: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export const pokTypes = ["normal", "poison", "water", "fire", "bug"] as const;
export type PokemonType = typeof pokTypes[number];

export interface ModalData {
  openModal: boolean;
  img: string;
  name: string;
}
