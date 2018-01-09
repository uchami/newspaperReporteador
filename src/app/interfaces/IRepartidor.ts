import {ITotal} from './ITotal';
import {IEdificio} from './IEdificio';

export interface IRepartidor {
  repartidorId: number;
  nombreRepartidor: string;
  edificios: IEdificio[];
  totalesRepartidor: ITotal[];
}
