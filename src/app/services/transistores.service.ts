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
    IcMax:0
  }
  
  MPS2222:transistor ={
    nombre:"MPS2222",
    beta:290, //290
    IcMax:0.6
  }

  TIP41:transistor ={
    nombre:"TIP41",
    beta:80, //80
    IcMax:0.7
  }
  
  BC547:transistor ={
    nombre:"BC547",
    beta:450,
    IcMax:0.2
  }
}
export interface transistor{
  nombre:string,
  beta:number,
  IcMax:number
}
