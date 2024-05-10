export class Plan {
  id: number | undefined;
  nombre: string | undefined;
}
export interface Chofer {
  id: number ;
  nombre: string ;
  numeroDocumento: number ;
  telefono: string ;
  email: string ;
  patente: string ;
  patenteAcoplado: string;
}

export interface Usuario {
  id: number
  nombre: string
  email: string
  estado: string
  roles: Role[]
}



export interface Role {
  idUsuario: number
  idRol: number
  rol: any
  usuario: any
}

export interface RegistroView {
  id: number;
  fecha: string;
  idChofer: number;
  nombreChofer: string;
  patente: string;
  patenteAcoplado: string;
  estado: string;
  cantidadCorto: number;
  cantidadLargo: number;
  puntos: number;
  chofer?: Chofer;
}
export interface Registro {
  id: number;
  fecha: string;
  idChofer: number;
  estado: string;
}
export interface Viaje {
  id:number;
  fecha: string;
  idChofer: number;  
  chofer:Chofer;
  idTipo: number;
  concepto: string;
  numeroComprobante: number;
  distancia: number;
  estado: string;
}
export interface TipoViaje 
{    
    id:number;    
    nombre :string;
    puntos :number;
}



