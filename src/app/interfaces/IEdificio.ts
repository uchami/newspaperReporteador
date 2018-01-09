import {ITotal} from './ITotal';
import {IDepartamento} from './IDepartamento';

export interface IEdificio {
  direccion: string;
  departamentos: IDepartamento[];
  totalesEdificio: ITotal[];
}

