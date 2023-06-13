import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransistoresService {

  constructor() { 

  }

  getTransistor(nombre:string):transistor{
    switch (nombre) {
      case 'MPS2222':
        return this.MPS2222;
        break;
      case 'TIP41':
        return this.TIP41;
        break;
      case 'BC547':
        return this.BC547;
        break;
      default:
        return this.vacio;
        break;
    }
    return this.vacio;
  }
  vacio:transistor = {
    nombre:"",
    beta:0,
    IcMax:0,
    PMax:0,
    VceMax:0
  }
  
  MPS2222:transistor ={
    nombre:"MPS2222",
    beta:100, //290
    IcMax:0.6,
    PMax: 1.5,
    VceMax: 30
  }

  TIP41:transistor ={
    nombre:"TIP41",
    beta:75,
    IcMax:6,
    PMax:2,
    VceMax:40
  }
  
  BC547:transistor ={
    nombre:"BC547",
    beta:130,
    IcMax:0.1,
    PMax: 1.5,
    VceMax: 45
  }
}
export interface transistor{
  nombre:string,
  beta:number,
  IcMax:number,
  VceMax:number,
  PMax:number
}
