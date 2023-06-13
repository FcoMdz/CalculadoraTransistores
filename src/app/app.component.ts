import { Component, Input, OnInit } from '@angular/core';
import { TransistoresService, transistor } from './services/transistores.service';
import { HtmlTagDefinition } from '@angular/compiler';
import * as numeral from 'numeral';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private transistores:TransistoresService){}
  title = 'Calculadora';
  ////// Declaración de Variables ///////
  tipos:string[]= [];
  transistor:string[]=[];
  Vcc:number=0;
  respuesta:string = "";
  tipoConf:string = "";
  tipoTran:string = "";
  imgCircuito!:HTMLImageElement;
  error!:HTMLElement;
  Rb!:HTMLInputElement;
  Rc!:HTMLInputElement;
  Re!:HTMLInputElement;
  R2!:HTMLInputElement;
  Vcc2!:HTMLInputElement;
  Ib!:HTMLInputElement;
  Ic!:HTMLInputElement;
  Ie!:HTMLInputElement;
  Vb!:HTMLInputElement;
  Vc!:HTMLInputElement;
  Ve!:HTMLInputElement;
  Vce!:HTMLInputElement;
  divRb!:HTMLElement;
  divRc!:HTMLElement;
  divRe!:HTMLElement;
  divR2!:HTMLElement;
  divVcc2!:HTMLElement;
  divIb!:HTMLElement;
  divIc!:HTMLElement;
  divIe!:HTMLElement;
  divVb!:HTMLElement;
  divVc!:HTMLElement;
  divVe!:HTMLElement;
  divVce!:HTMLElement;
  calcular!:HTMLButtonElement;
  copiar!:HTMLButtonElement;
  pegar!:HTMLButtonElement;
  transistorActivo!:transistor;
  labelRb!:HTMLLabelElement;
  ////// Fin de Declaración /////////
  /// Se inician los datos en OnInit ///
  ngOnInit(): void {
    /// Se cargan los valores a un array que se mostrará en el arreglo
    this.tipos = [
      "Fija",
      "Emisor",
      "Divisor de voltaje",
      "Retroalimentación"
    ]
    this.transistor = [
      this.transistores.BC547.nombre,
      this.transistores.MPS2222.nombre,
      this.transistores.TIP41.nombre
    ]
    /// Se inicializan las variables que se mostrarán en el html
    this.error = <HTMLElement> document.getElementById("error");
    this.imgCircuito = <HTMLImageElement> document.getElementById("img");
    this.Rb=<HTMLInputElement> document.getElementById("Rb");
    this.Rc=<HTMLInputElement> document.getElementById("Rc");
    this.Re=<HTMLInputElement> document.getElementById("Re");
    this.R2=<HTMLInputElement> document.getElementById("R2");
    this.Vcc2=<HTMLInputElement> document.getElementById("Vcc2");
    this.Ib=<HTMLInputElement> document.getElementById("Ib");
    this.Ic=<HTMLInputElement> document.getElementById("Ic");
    this.Ie=<HTMLInputElement> document.getElementById("Ie");
    this.Vb=<HTMLInputElement> document.getElementById("Vb");
    this.Vc=<HTMLInputElement> document.getElementById("Vc");
    this.Ve=<HTMLInputElement> document.getElementById("Ve");
    this.Vce=<HTMLInputElement> document.getElementById("Vce");
    
    this.divRb=document.getElementById("divRb")!;
    this.divRc=document.getElementById("divRc")!;
    this.divRe=document.getElementById("divRe")!;
    this.divR2=document.getElementById("divR2")!;
    this.divVcc2=document.getElementById("divVcc2")!;
    this.divIb=document.getElementById("divIb")!;
    this.divIc=document.getElementById("divIc")!;
    this.divIe=document.getElementById("divIe")!;
    this.divVb=document.getElementById("divVb")!;
    this.divVc=document.getElementById("divVc")!;
    this.divVe=document.getElementById("divVe")!;
    this.divVce=document.getElementById("divVce")!;

    this.labelRb=<HTMLLabelElement>document.getElementById("labelRb")!;
    this.calcular=<HTMLButtonElement> document.getElementById("btnCalc");
    this.copiar=<HTMLButtonElement> document.getElementById("btnCop");
    this.pegar=<HTMLButtonElement> document.getElementById("btnPeg");
  }

  /// Función principal del programa
  mostrarConfgurador():void{
    let formatError; // este es el mensaje de error
    this.transistorActivo = this.transistores.getTransistor(this.tipoTran);
    if((!this.Vcc || this.Vcc !==0 )&& this.respuesta !== "" && this.tipoConf!== "" && this.tipoTran !== ""){ // Validamos que el formulario este correcto
      // Se limpia los mensajes de error 
      this.error.innerHTML = "";
      formatError="";
      // se guardan los valores de Vcc para mostrarlos en el diagrama
      this.Vcc2.setAttribute("value",this.Vcc.toString());
      this.Vcc2.removeAttribute("hidden");
      this.Vcc2.setAttribute("disable","true");
      
      switch(this.tipoConf){
        case "Fija":
          this.generarFija();
          break;
        case "Emisor":
          this.generarEmisor();
          break;
        case "Divisor de voltaje":
          this.generarDivisor(); 
          break;
        case "Retroalimentación":
          this.generarRetroalimentacion();
          break;
          default:break;
       }
       switch(this.respuesta){
        case "resistencias":
          this.OcultarResistencias();
          break;
        case "VyC":
          this.OcultarVyC();
          break;
       }
       this.error.innerHTML = ` ${formatError} ${this.imgCircuito}`;
    }
    else{
      this.error.innerHTML ="";
     formatError = 
     `<div class="alert alert-danger" role="alert">
        Ingrese valores correctos
      </div>`;
    }
    this.error.innerHTML = formatError;
    if(this.tipoConf === "Divisor de voltaje"){
      this.labelRb.innerHTML="R1"
    }
    else{
      this.labelRb.innerHTML="Rb" 
    }
  }
  
  generarFija():void{
    this.quitar();
    this.imgCircuito.src="./assets/imgs/Polarización fija.png";
    this.divVc.removeAttribute("hidden");
    this.divVb.removeAttribute("hidden");
    this.divVe.removeAttribute("hidden");
    this.divVce.removeAttribute("hidden");
    this.divRb.removeAttribute("hidden");
    this.divRc.removeAttribute("hidden");
    this.divIc.removeAttribute("hidden");
    this.divIb.removeAttribute("hidden");
    this.divIe.removeAttribute("hidden");
    this.calcular.removeAttribute("hidden");
    this.copiar.removeAttribute("hidden");
    this.pegar.removeAttribute("hidden");
  }

  generarEmisor():void{
    this.quitar();
    this.imgCircuito.src="./assets/imgs/Polarización por emisor.png";
    this.divVc.removeAttribute("hidden");
    this.divVb.removeAttribute("hidden");
    this.divVe.removeAttribute("hidden");
    this.divVce.removeAttribute("hidden");
    this.divRb.removeAttribute("hidden");
    this.divRc.removeAttribute("hidden");
    this.divRe.removeAttribute("hidden");
    this.divIc.removeAttribute("hidden");
    this.divIb.removeAttribute("hidden");
    this.divIe.removeAttribute("hidden");
    this.calcular.removeAttribute("hidden");
    this.copiar.removeAttribute("hidden");
    this.pegar.removeAttribute("hidden");
  }
  generarDivisor():void{
    this.quitar();
    this.imgCircuito.src="./assets/imgs/Polarización por divisor de voltaje.png";
    this.divVc.removeAttribute("hidden");
    this.divVb.removeAttribute("hidden");
    this.divVe.removeAttribute("hidden");
    this.divVce.removeAttribute("hidden");
    this.divRb.removeAttribute("hidden");
    this.divRc.removeAttribute("hidden");
    this.divR2.removeAttribute("hidden");
    this.divRe.removeAttribute("hidden");
    this.divIc.removeAttribute("hidden");
    this.divIb.removeAttribute("hidden");
    this.divIe.removeAttribute("hidden");
    this.calcular.removeAttribute("hidden");
    this.copiar.removeAttribute("hidden");
    this.pegar.removeAttribute("hidden");
  }
  generarRetroalimentacion():void{
    this.quitar();
    this.imgCircuito.src="./assets/imgs/Polarización por retroalimentación.png";
    this.divVc.removeAttribute("hidden");
    this.divVb.removeAttribute("hidden");
    this.divVe.removeAttribute("hidden");
    this.divVce.removeAttribute("hidden");
    this.divRb.removeAttribute("hidden");
    this.divRc.removeAttribute("hidden");
    this.divRe.removeAttribute("hidden");
    this.divIc.removeAttribute("hidden");
    this.divIb.removeAttribute("hidden");
    this.divIe.removeAttribute("hidden");
    this.calcular.removeAttribute("hidden");
    this.copiar.removeAttribute("hidden");
    this.pegar.removeAttribute("hidden");
  }

  OcultarResistencias() {
    this.Vb.removeAttribute("disabled");
    this.Vc.removeAttribute("disabled");
    this.Ve.removeAttribute("disabled");
    this.Vce.removeAttribute("disabled");
    this.Ie.removeAttribute("disabled");
    this.Ib.removeAttribute("disabled");
    this.Ic.removeAttribute("disabled");
    this.Rb.setAttribute("disabled","true");
    this.Rc.setAttribute("disabled","true");
    this.Re.setAttribute("disabled","true");
    if(this.tipoConf === "Divisor de voltaje") {
      this.R2.setAttribute("disabled","true");
    }
  }

  OcultarVyC():void {
    this.Rb.removeAttribute("disabled");
    this.Rc.removeAttribute("disabled");
    this.Re.removeAttribute("disabled");
    if(this.tipoConf === "Divisor de voltaje") {
      this.R2.removeAttribute("disabled");
    }
    this.Vce.setAttribute("disabled","true");
    this.Vb.setAttribute("disabled","true");
    this.Vc.setAttribute("disabled","true");
    this.Ve.setAttribute("disabled","true");
    this.Ic.setAttribute("disabled","true");
    this.Ie.setAttribute("disabled","true");
    this.Ib.setAttribute("disabled","true");
    
  }
  quitar():void{
    this.divRb.setAttribute("hidden","true");
    this.divRc.setAttribute("hidden","true");
    this.divRe.setAttribute("hidden","true");
    this.divR2.setAttribute("hidden","true");

    this.Rb.value = "";
    this.Rc.value = "";
    this.Re.value = "";
    this.R2.value = "";
    this.Vb.value = "";
    this.Vc.value = "";
    this.Ve.value = "";
    this.Vce.value = "";
    this.Ic.value = "";
    this.Ie.value = "";
    this.Ib.value = "";

    this.divVb.setAttribute("hidden","true");
    this.divVc.setAttribute("hidden","true");
    this.divVe.setAttribute("hidden","true");
    this.divVce.setAttribute("hidden","true");
    this.divIc.setAttribute("hidden","true");
    this.divIe.setAttribute("hidden","true");
    this.divIb.setAttribute("hidden","true");

    this.calcular.setAttribute("hidden","true");
    this.copiar.setAttribute("hidden","true");
    this.pegar.setAttribute("hidden","true");
  }
  
  calc(){
    switch(this.respuesta){
      case "resistencias":
        switch(this.tipoConf){
          case "Fija":
            let datosFijo:fijoCorrienteVoltaje={
              Ib: parseFloat(this.Ib.value),
              Ic: parseFloat(this.Ic.value),
              Ie: parseFloat(this.Ie.value),
              Vce: parseFloat(this.Vce.value),
              Vrb: 0,
              Vrc: 0,
              Vb: parseFloat(this.Vb.value),
              Ve: parseFloat(this.Ve.value),
              Vc: parseFloat(this.Vc.value)
            }
            this.fijoResistencias(this.Vcc, this.transistorActivo, datosFijo)
            break;
          case "Emisor":
            let datosEmisor:emisorCorrienteVoltaje = {
              Ib: parseFloat(this.Ib.value),
              Ic: parseFloat(this.Ic.value),
              Ie: parseFloat(this.Ie.value),
              Vce: parseFloat(this.Vce.value),
              Vrb: 0,
              Vrc: 0,
              Vre: 0,
              Vb: parseFloat(this.Vb.value),
              Ve: parseFloat(this.Ve.value),
              Vc: parseFloat(this.Vc.value),
            }
            this.emisorResistencias(this.Vcc, this.transistorActivo, datosEmisor);
            break;
          case "Divisor de voltaje":
            let datosDivisor:divisorCorrienteVoltaje = {
              Ib: parseFloat(this.Ib.value),
              Ic: parseFloat(this.Ic.value),
              Ie: parseFloat(this.Ie.value),
              Rth: 0,
              Vth: 0,
              Vce: parseFloat(this.Vce.value),
              Vrb: 0,
              Vrc: 0,
              Vre: 0,
              Vr2: 0,
              Vb: parseFloat(this.Vb.value),
              Ve: parseFloat(this.Ve.value),
              Vc: parseFloat(this.Vc.value)
            }
            this.divisorResistencias(this.Vcc, this.transistorActivo, datosDivisor);
            break;
          case "Retroalimentación":
            let datosRetroalimentacion:emisorCorrienteVoltaje = {
              Ib: parseFloat(this.Ib.value),
              Ic: parseFloat(this.Ie.value),
              Ie: parseFloat(this.Ie.value),
              Vce: parseFloat(this.Vce.value),
              Vrb: 0,
              Vrc: 0,
              Vre: 0,
              Vb: parseFloat(this.Vb.value),
              Ve: parseFloat(this.Ve.value),
              Vc: parseFloat(this.Vc.value),
            }
            this.retroalimentacionResistencias(this.Vcc, this.transistorActivo, datosRetroalimentacion);
            break;
          default:break;
         }
        break;
      case "VyC":
        switch(this.tipoConf){
          case "Fija":
            let datosFija:fijoResistencias = {
              Rb: parseFloat(this.Rb.value),
              Rc: parseFloat(this.Rc.value)
            }
            this.fijoCorrVolt(this.Vcc,this.transistorActivo,datosFija);
            break;
          case "Emisor":
            let datosEmisor:emisorResistencias ={
              Rb: parseFloat(this.Rb.value),
              Rc: parseFloat(this.Rc.value),
              Re: parseFloat(this.Re.value)
            }
            this.emisorCorrVolt(this.Vcc, this.transistorActivo, datosEmisor);
            break;
          case "Divisor de voltaje":
            let datosDivisor:divisorResistencias = {
              R1: parseFloat(this.Rb.value),
              R2: parseFloat(this.R2.value),
              Rc: parseFloat(this.Rc.value),
              Re: parseFloat(this.Re.value)
            }
            this.divisorCorrVolt(this.Vcc, this.transistorActivo, datosDivisor);
            break;
          case "Retroalimentación":
            let datosRetroalimentacion:emisorResistencias ={
              Rb: parseFloat(this.Rb.value),
              Rc: parseFloat(this.Rc.value),
              Re: parseFloat(this.Re.value)
            }
            this.retroalimentacionrCorrVolt(this.Vcc, this.transistorActivo, datosRetroalimentacion);
            break;
          default:break;
         }
        break;
     }
     this.transformarValores();
     this.copiar.removeAttribute("disabled");
  }

  divisorCorrVolt(Vcc:number, tran:transistor, Res:divisorResistencias){
    var data:divisorCorrienteVoltaje = {
      Ib: 0, //Listo
      Ic: 0,  //Listo
      Ie: 0, //Listo
      Vce: 0, //Listo
      Vrb: 0, //Listo
      Vrc: 0, //Listo
      Vre: 0, //Listo
      Vb: 0, //Listo
      Ve: 0, //Listo
      Vc: 0, //Listo
      Rth: 0, //Listo
      Vth: 0, //Listo
      Vr2: 0 //Listo
    }

    data.Rth = (Res.R1*Res.R2)/(Res.R1+Res.R2);
    data.Vth = (Vcc*Res.R2)/(Res.R1+Res.R2);
    data.Ib = (data.Vth-0.7)/(data.Rth+(Res.Re*(tran.beta+1)));
    data.Ic = data.Ib*tran.beta;
    data.Ie = data.Ib+data.Ic;
    data.Ve = data.Ie*Res.Re;
    data.Vb = data.Ve+0.7;
    data.Vrc = data.Ic*Res.Rc;
    data.Vre = data.Ie*Res.Re;
    data.Vrb = Vcc-data.Vth;
    data.Vr2 = data.Vth;
    data.Vce = Vcc-data.Vre-data.Vrc;
    data.Vc = Vcc-data.Vrc;

    if(data.Ic > tran.IcMax || data.Vce < 0 || data.Vce > tran.VceMax || tran.PMax < data.Vce*data.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }
    if(!this.revisarResultados([data.Ib,data.Ic,data.Ie,data.Vb,data.Vc,data.Vce,data.Vce,data.Ve,data.Vrb,data.Vrc,data.Vr2,data.Vth,data.Rth])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Vc.value = data.Vc.toFixed(8);
      this.Vb.value = data.Vb.toFixed(8);
      this.Ve.value = data.Ve.toFixed(8);
      this.Vce.value = data.Vce.toFixed(8);
      this.Ic.value = data.Ic.toFixed(8);
      this.Ib.value = data.Ib.toFixed(8);
      this.Ie.value = data.Ie.toFixed(8);
    }
  }

  divisorResistencias(Vcc:number, tran:transistor, CyV:divisorCorrienteVoltaje){
    var data:divisorResistencias = {
      R1: 0,
      R2: 0,
      Rc: 0,
      Re: 0
    };
    
    data.Rc = (Vcc-CyV.Vc)/CyV.Ic;
    data.Re = (CyV.Ve)/CyV.Ie;
    data.R2 = (tran.beta*data.Re)/10;
    let VR2 = CyV.Vb;
    let IR2 = VR2/data.R2;
    let IR1 = IR2+CyV.Ib;
    let VR1 = Vcc-VR2;
    data.R1 = VR1/IR1;
    CyV.Vce = (CyV.Vc-CyV.Ve);
    if(CyV.Ib*tran.beta > tran.IcMax || CyV.Vce < 0 || CyV.Vce > tran.VceMax || tran.PMax < CyV.Vce*CyV.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else if(tran.beta*data.Re < 10*data.R2){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        No se puede realizar el cálculo por aproximación
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }
    if(!this.revisarResultados([data.R1,data.R2,data.Rc,data.Re])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Rb.value = data.R1.toFixed(2);
      this.R2.value = data.R2.toFixed(2);
      this.Rc.value = data.Rc.toFixed(2);
      this.Re.value = data.Re.toFixed(2);
    }
  }

  emisorCorrVolt(Vcc:number, tran:transistor, Res:emisorResistencias){
    var data:emisorCorrienteVoltaje = {
      Ib: 0,
      Ic: 0,
      Ie: 0,
      Vce: 0,
      Vrb: 0,
      Vrc: 0,
      Vre: 0,
      Vb: 0,
      Ve: 0,
      Vc: 0
    }
    data.Ib = (Vcc-0.7)/(Res.Rb+Res.Re*(tran.beta+1));
    data.Ic = data.Ib*tran.beta;
    data.Ie = data.Ib+data.Ic;
    data.Vrb = data.Ib*Res.Rb;
    data.Vrc = data.Ic*Res.Rc;
    data.Vre = data.Ie*Res.Re;
    data.Vb = data.Vre + 0.7;
    data.Vce = Vcc-data.Vrc-data.Vre;
    data.Vc = data.Vce+data.Vre;
    data.Ve = data.Vre;
    if(data.Ic > tran.IcMax || data.Vce < 0 || data.Vce > tran.VceMax || tran.PMax < data.Vce*data.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }
    if(!this.revisarResultados([data.Ib,data.Ic,data.Ie,data.Vb,data.Vc,data.Vce,data.Vce,data.Ve,data.Vrb,data.Vrc])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Vc.value = data.Vc.toFixed(8);
      this.Vb.value = data.Vb.toFixed(8);
      this.Ve.value = data.Ve.toFixed(8);
      this.Vce.value = data.Vce.toFixed(8);
      this.Ic.value = data.Ic.toFixed(8);
      this.Ib.value = data.Ib.toFixed(8);
      this.Ie.value = data.Ie.toFixed(8);
    }
   
  }

  emisorResistencias(Vcc:number, tran:transistor, CyV:emisorCorrienteVoltaje){
    var data:emisorResistencias = {
      Rb: 0,
      Rc: 0,
      Re: 0
    };
    data.Rb = (Vcc-0.7-CyV.Ve)/CyV.Ib;
    data.Rc = (Vcc-CyV.Vc)/CyV.Ic;
    data.Re = (CyV.Ve)/CyV.Ie;
    CyV.Vce = (CyV.Vc-CyV.Ve);
    if(CyV.Ib*tran.beta > tran.IcMax || CyV.Vce < 0 || CyV.Vce > tran.VceMax || tran.PMax < CyV.Vce*CyV.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }
    if(!this.revisarResultados([data.Rb,data.Rc,data.Re])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Rb.value = data.Rb.toFixed(2);
      this.Rc.value = data.Rc.toFixed(2);
      this.Re.value = data.Re.toFixed(2);
    }
    
  }
  retroalimentacionResistencias(Vcc:number, tran:transistor, CyV:emisorCorrienteVoltaje){
    var data:emisorResistencias = {
      Rb: 0,
      Rc: 0,
      Re: 0
    };
    data.Rb = (CyV.Vc-0.7-CyV.Ve)/CyV.Ib;
    data.Rc = (Vcc-CyV.Vc)/CyV.Ie;
    data.Re = (CyV.Ve)/CyV.Ie;
    CyV.Vce = (CyV.Vc-CyV.Ve);
    if(CyV.Ib*tran.beta > tran.IcMax || CyV.Vce < 0 || CyV.Vce > tran.VceMax || tran.PMax < CyV.Vce*CyV.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }
    if(!this.revisarResultados([data.Rb,data.Rc,data.Re])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Rb.value = data.Rb.toFixed(2);
      this.Rc.value = data.Rc.toFixed(2);
      this.Re.value = data.Re.toFixed(2);
    }
    
  }
  retroalimentacionrCorrVolt(Vcc:number, tran:transistor, Res:emisorResistencias){
    var data:emisorCorrienteVoltaje = {
      Ib: 0,
      Ic: 0,
      Ie: 0,
      Vce: 0,
      Vrb: 0,
      Vrc: 0,
      Vre: 0,
      Vb: 0,
      Ve: 0,
      Vc: 0
    }
    data.Ib = (Vcc-0.7)/((Res.Rc*tran.beta)+Res.Rb+Res.Re*(tran.beta+1));
    data.Ic = data.Ib*tran.beta;
    data.Ie = data.Ib+data.Ic;
    data.Vrb = data.Ib*Res.Rb;
    data.Vrc = data.Ie*Res.Rc;
    data.Vre = data.Ie*Res.Re;
    data.Vb = data.Vre + 0.7;
    data.Vce = Vcc-data.Vrc-data.Vre;
    data.Vc = data.Vce+data.Vre;
    data.Ve = data.Vre;
    if(data.Ic > tran.IcMax || data.Vce < 0 || data.Vce > tran.VceMax || tran.PMax < data.Vce*data.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }
    if(!this.revisarResultados([data.Ib,data.Ic,data.Ie,data.Vb,data.Vc,data.Vce,data.Vce,data.Ve,data.Vrb,data.Vrc])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Vc.value = data.Vc.toFixed(8);
      this.Vb.value = data.Vb.toFixed(8);
      this.Ve.value = data.Ve.toFixed(8);
      this.Vce.value = data.Vce.toFixed(8);
      this.Ic.value = data.Ic.toFixed(8);
      this.Ib.value = data.Ib.toFixed(8);
      this.Ie.value = data.Ie.toFixed(8);
    }
    
  }

  fijoCorrVolt(Vcc:number, tran:transistor, Res:fijoResistencias){
    //Corrientes y voltajes
    var data:fijoCorrienteVoltaje = {
      Ib: 0,
      Ic: 0,
      Ie: 0,
      Vce: 0,
      Vrb: 0,
      Vrc: 0,
      Vb: 0,
      Ve: 0,
      Vc: 0
    };
    data.Ib = (Vcc-0.7)/Res.Rb;
    data.Ic = data.Ib*tran.beta;
    data.Ie = data.Ib+data.Ic;
    data.Vrb = data.Ib*Res.Rb;
    data.Vrc = data.Ic*Res.Rc;
    data.Vce = Vcc - data.Vrc;
    data.Vb = Vcc - data.Vrb;
    data.Ve = data.Vb - 0.7;
    data.Vc = Vcc - data.Vrc;
    if(data.Ic > tran.IcMax || data.Vce < 0 || data.Vce > tran.VceMax || tran.PMax < data.Vce*data.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }

    if(!this.revisarResultados([data.Ib,data.Ic,data.Ie,data.Vb,data.Vc,data.Vce,data.Vce,data.Ve,data.Vrb,data.Vrc])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Vc.value = data.Vc.toFixed(8);
      this.Vb.value = data.Vb.toFixed(8);
      this.Ve.value = data.Ve.toFixed(8);
      this.Vce.value = data.Vce.toFixed(8);
      this.Ic.value = data.Ic.toFixed(8);
      this.Ib.value = data.Ib.toFixed(8);
      this.Ie.value = data.Ie.toFixed(8);
    }  
  }

  fijoResistencias(Vcc:number, tran:transistor, CyV:fijoCorrienteVoltaje){
    var data:fijoResistencias = {
      Rb: 0,
      Rc: 0
    };
    data.Rb = (Vcc-0.7)/CyV.Ib;
    data.Rc = (Vcc-CyV.Vc)/(CyV.Ib*tran.beta);
    CyV.Vce = (CyV.Vc-CyV.Ve);
    if(CyV.Ib*tran.beta > tran.IcMax || CyV.Vce < 0 || CyV.Vce > tran.VceMax || tran.PMax < CyV.Vce*CyV.Ic){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Los valores resultan en un circuito con errores, revise los valores.
      </div>`;
      this.error.innerHTML = formatError;
    }else{
      this.error.innerHTML = "";
    }

    if(!this.revisarResultados([data.Rb,data.Rc])){
      let formatError = 
     `<div class="alert alert-danger" role="alert">
        Hay un error en los calculos. Hay al menos un valor indefinido.
      </div>`;
      this.error.innerHTML += formatError;
    }else{
      this.Rb.value = data.Rb.toString();
      this.Rc.value = data.Rc.toString();
    }
  }

  transformarValores(){ //Coloca los valores en el formato exponencial
    var resultados:HTMLElement = document.getElementById('resultados')!;
    var hijos = resultados.children;
    for (let i = 0; i < hijos.length; i++) { //Toma cada uno de los espacios de resultados
      const element = hijos.item(i);
      if(!element?.hasAttribute('hidden')){ 
        var input:Element = element?.children.item(0)!;
        input = input.children.item(1)!; //Obtiene el input donde se muestran los resultados
        var etiqueta:HTMLInputElement = <HTMLInputElement> document.getElementById(input.id);
        if(isNaN(parseFloat(etiqueta.value))) etiqueta.value = '0';
        //Trnasforma el valor con una expresión exponencial para que sea más facil de leer
        etiqueta.value = numeral(parseFloat(etiqueta.value)).format('0.00[000000]e+0'); 
      }
    }
  }

  revisarResultados(numbers:number[]){ //Revisa los valores caluclados
    for (let i = 0; i < numbers.length; i++) {
      const element = numbers[i];
      if(isNaN(element) || !isFinite(element)){ //Si alguno es nan o infinito retornara false
        return false;
      }
    }
    return true;
  }


  copiarEstructura(){
    var resultados:HTMLElement = document.getElementById('resultados')!;
    var hijos = resultados.children;
    var clipBoard:{[k:string]:number} = {};
    for (let i = 0; i < hijos.length; i++) { //Toma cada uno de los espacios de resultados
      const element = hijos.item(i);
      var padre:Element = element?.children.item(0)!;
      var txt = padre.children.item(0)!;
      var input = padre.children.item(1)!; //Obtiene el input donde se muestran los resultados
      var etiqueta:HTMLElement = <HTMLElement> document.getElementById(txt.id);
      var resultado:HTMLInputElement = <HTMLInputElement> document.getElementById(input.id);
      if(resultado.value.length > 0){
        clipBoard[etiqueta.innerHTML] = parseFloat(resultado.value);
      }
    }
    var json = JSON.stringify(clipBoard);
    navigator.clipboard.writeText(json);
  }

  pegarEstructura(){
    var resultados:HTMLElement = document.getElementById('resultados')!;
    var hijos = resultados.children;
    var clipBoard:{[k:string]:number} = {};
    navigator.clipboard.readText().then((object)=>{
      clipBoard = JSON.parse(object);
      for (let i = 0; i < hijos.length; i++) { //Toma cada uno de los espacios de resultados
        const element = hijos.item(i);
        var padre:Element = element?.children.item(0)!;
        var txt = padre.children.item(0)!;
        var input = padre.children.item(1)!; //Obtiene el input donde se muestran los resultados
        var etiqueta:HTMLElement = <HTMLElement> document.getElementById(txt.id);
        var resultado:HTMLInputElement = <HTMLInputElement> document.getElementById(input.id);
        if(clipBoard[etiqueta.innerHTML] && !resultado.hasAttribute('disabled')){
          resultado.value = clipBoard[etiqueta.innerHTML].toString();
        }
      }
    });
    
  }
  /*
  ValidarNumeros(){
    var resultados:HTMLElement = document.getElementById('resultados')!;
    var hijos = resultados.children;
    for (let i = 0; i < hijos.length; i++) { //Toma cada uno de los espacios de resultados
      const element = hijos.item(i);
      var padre:Element = element?.children.item(0)!;
      var input = padre.children.item(1)!; //Obtiene el input donde se muestran los resultados
      var resultado:HTMLInputElement = <HTMLInputElement> document.getElementById(input.id);
      resultado.addEventListener('change',function (){
        let out =""
        let filtro = '1234567890.'
        for (var i=0; i<this.value.length; i++)
        if (filtro.indexOf(this.value.charAt(i)) != -1) 
          //Se añaden a la salida los caracteres validos
	        out += this.value.charAt(i);
        this.value = out;
      });
    }
  } 
  */
}
interface fijoCorrienteVoltaje{
  Ib:number;
  Ic:number;
  Ie:number;
  Vce:number;
  Vrb:number;
  Vrc:number;
  Vb:number;
  Ve:number;
  Vc:number;
}
interface fijoResistencias{
  Rb:number;
  Rc:number;
}

interface emisorCorrienteVoltaje{
  Ib:number;
  Ic:number;
  Ie:number;
  Vce:number;
  Vrb:number;
  Vrc:number;
  Vre:number;
  Vb:number;
  Ve:number;
  Vc:number;
}

interface emisorResistencias{
  Rb:number;
  Rc:number;
  Re:number;
}

interface divisorCorrienteVoltaje{
  Ib:number;
  Ic:number;
  Ie:number;
  Rth:number;
  Vth:number;
  Vce:number;
  Vrb:number;
  Vrc:number;
  Vre:number;
  Vr2:number;
  Vb:number;
  Ve:number;
  Vc:number;
}

interface divisorResistencias{
  R1:number;
  R2:number;
  Rc:number;
  Re:number;
}