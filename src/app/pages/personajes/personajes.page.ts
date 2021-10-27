import { Component, OnInit, ViewChild } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { RickAndMortyCharacter } from '../../models/character.model';
import {
  IonInfiniteScroll,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  styleUrls: ['./personajes.page.scss'],
})
export class PersonajesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  characters: RickAndMortyCharacter[];
  paginaActual = 1;
  constructor(
    private rickAndMortyService: RickAndMortyService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.obtenerPersonajes();
  }

  async obtenerPersonajes(event?: any) {
    this.characters = await this.rickAndMortyService
      .obtenerPersonajes()
      .then((response) => response.results)
      .catch(async (err) => {
        console.log(err);
        await (
          await this.toastCtrl.create({
            message: err,
            color: 'danger',
            duration: 4500,
          })
        ).present();
        return [];
      });
    if (event) {
      event.target.complete();
    }
    this.infiniteScroll.disabled = false;
  }

  async buscarPorNombre(event: any) {
    const nameToSearch = event.target.value;
    if (nameToSearch.length === 0) {
      this.infiniteScroll.disabled = true;
      return;
    }
    await (
      await this.loadingCtrl.create({
        message: 'Obteniendo personajes',
      })
    ).present();
    this.characters = await this.rickAndMortyService
      .obtenerPersonajes(nameToSearch)
      .then((response) => response.results)
      .catch(async (err) => {
        console.log(err);
        (
          await this.toastCtrl.create({
            message: err?.error?.error ?? err,
            color: 'danger',
            duration: 4500,
          })
        ).present();
        return [];
      });
    this.infiniteScroll.disabled = false;
    await this.loadingCtrl.dismiss();
  }

  async cargarMas(event: any) {
    const nuevosPersonajes = await this.rickAndMortyService
      .obtenerPersonajes('', this.paginaActual + 1)
      .then((response) => response.results)
      .catch(async (err) => {
        console.log(err);
        (
          await this.toastCtrl.create({
            message: err?.error?.error ?? err,
            color: 'danger',
            duration: 4500,
          })
        ).present();
        this.infiniteScroll.disabled = true;
        return [];
      });
    this.characters.push(...nuevosPersonajes);
    this.paginaActual++;
    event.target.complete();
  }
}
