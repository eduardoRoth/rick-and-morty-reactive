import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RickAndMortyCharacter } from '../models/character.model';
import { RickAndMortyCharactersResponse } from '../models/charactersResponse.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  async obtenerPersonajes(
    nombre: string = '',
    pagina: number = 1
  ): Promise<RickAndMortyCharactersResponse> {
    return firstValueFrom(
      this.http.get<RickAndMortyCharactersResponse>(
        `${environment.apiUrl}/character?name=${nombre}&page=${pagina}`
      )
    );
  }

  async obtenerPersonaje(id: number): Promise<RickAndMortyCharacter> {
    return firstValueFrom(
      this.http.get<RickAndMortyCharacter>(
        `${environment.apiUrl}/character/${id}`
      )
    );
  }
}
