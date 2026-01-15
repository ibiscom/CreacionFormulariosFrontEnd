import type { CondicionEntity } from './condicion.entity';

export interface MapaCondicionesTotEntry {
  string?: string;
  list?: Record<string, CondicionEntity>;
}

export type MapaCondicionesTot = Record<string, MapaCondicionesTotEntry>;
