import {IPublicacion} from './IPublicacion';

export interface IDepartamento {
  nombre: string;
  observacion: string;
  publicaciones: IPublicacion[];
}

