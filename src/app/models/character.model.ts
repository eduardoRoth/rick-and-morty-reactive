import { RickAndMortyOrigin } from './origin.model';
import { RickAndMortyLocation } from './location.model';
import { RickAndMortyStatus } from './status.model';
import { RickAndMortyGender } from './gender.model';

export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: RickAndMortyStatus;
  species: string;
  type: string;
  gender: RickAndMortyGender;
  origin: RickAndMortyOrigin;
  location: RickAndMortyLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
