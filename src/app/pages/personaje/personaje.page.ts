import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyCharacter } from '../../models/character.model';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.page.html',
  styleUrls: ['./personaje.page.scss'],
})
export class PersonajePage implements OnInit {
  personaje: RickAndMortyCharacter;

  constructor(
    private activated: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {}

  async ngOnInit() {
    const id = parseInt(this.activated.snapshot.paramMap.get('id') ?? '0', 10);
    this.personaje = await this.rickAndMortyService.obtenerPersonaje(id);
    console.log(this.personaje);
  }
}
