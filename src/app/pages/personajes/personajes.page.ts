import { Component, OnInit, ViewChild } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { RickAndMortyCharacter } from '../../models/character.model';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  LoadingController,
  SearchbarCustomEvent,
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

  async obtenerPersonajes(event?: InfiniteScrollCustomEvent) {
    try {
      this.characters = await this.rickAndMortyService
        .obtenerPersonajes()
        .then((response) => response.results);
    } catch (err) {
      console.log(err);
      await (
        await this.toastCtrl.create({
          message: err,
          color: 'danger',
          duration: 4500,
        })
      ).present();
    } finally {
      if (event) {
        await event.target.complete();
      }
      this.infiniteScroll.disabled = false;
    }
  }

  async buscarPorNombre(event: SearchbarCustomEvent) {
    const nameToSearch = event.target.value;
    if (nameToSearch.length === 0) {
      this.infiniteScroll.disabled = true;
      return;
    }
    const obteniendo = await this.loadingCtrl.create({
      message: 'Obteniendo personajes',
    });
    await obteniendo.present();
    try {
      this.characters = await this.rickAndMortyService
        .obtenerPersonajes(nameToSearch)
        .then((response) => response.results);
    } catch (err) {
      console.log(err);
      (
        await this.toastCtrl.create({
          message: err?.error?.error ?? err,
          color: 'danger',
          duration: 4500,
        })
      ).present();
    } finally {
      this.infiniteScroll.disabled = false;
      await obteniendo.dismiss();
    }
  }

  async cargarMas(event: InfiniteScrollCustomEvent) {
    try {
      const nuevosPersonajes = await this.rickAndMortyService
        .obtenerPersonajes('', this.paginaActual + 1)
        .then((response) => response.results);
      this.characters.push(...nuevosPersonajes);
      this.paginaActual++;
    } catch (err) {
      console.log(err);
      (
        await this.toastCtrl.create({
          message: err?.error?.error ?? err,
          color: 'danger',
          duration: 4500,
        })
      ).present();
      this.infiniteScroll.disabled = true;
    } finally {
      await event.target.complete();
    }
  }
}
