import { RickAndMortyCharacter } from './character.model';

export interface RickAndMortyCharactersResponse {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: RickAndMortyCharacter[];
}
