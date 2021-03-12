import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ModalDialogService, RouterExtensions, registerElement} from "@nativescript/angular";
import {ActivatedRoute} from "@angular/router";
import {vehiculos} from "../../../models/vehiculos/vehiculos.model";
import {VehiculosService} from "../../../services/vehiculos/vehiculos.service";
import {hecho, sanzionModel} from "../../../models/sanziones/sanzion.model";
import {SelectDatepickerComponent} from "../select-datepicke/select-datepicker.component";
import {alert, Image, Page} from "@nativescript/core";
import {SanzionesService} from "../../../services/sanziones/sanziones.service";
const RadImagepicker = require('@nstudio/nativescript-rad-imagepicker').RadImagepicker;
import * as app from "@nativescript/core/application"
@Component({
    moduleId: module.id,
    templateUrl: './register-sanzion.component.html',
    styleUrls: [ './register-sanzion.component.css']
})
export class RegisterSanzionComponent implements OnInit{
    vehiculo: vehiculos = { marca: '', matricula: ''};
    hechoOption: hecho = 'tiketOff';
    list: Image[];

    sanzion: sanzionModel = { via: '', observaciones: '',hecho: 'Carecer de Ticket', lugar: '', idVehiculo: 0, conductor: null, titular: null };
    constructor(
        private route: ActivatedRoute,
        private router: RouterExtensions,
        private vhcleSvce: VehiculosService,
        private modal: ModalDialogService,
        private viewRef: ViewContainerRef,
        private sanzionSvc: SanzionesService,
        page: Page
    ) {
        page.on("loaded", (args)=>{
            var window = app.android.startActivity.getWindow();
            window.setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        })
    }

    back() {
        this.router.back();
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.vhcleSvce.Get(`vehiculos/${id}`).subscribe(resp => {
               this.vehiculo = resp.getOne;
               this.sanzion.idVehiculo = this.vehiculo.id;
            });
        }
    }

    onSelectChange(select: hecho, value: string) {
        this.hechoOption = select;
        this.sanzion.hecho = value;
    }

    async onDateChanged() {
        this.sanzion.conductor.fechaNacimiento = await this.modal
            .showModal(SelectDatepickerComponent, {
                animated: true,
                viewContainerRef: this.viewRef,
                fullscreen: false
            });
    }

    async onSubmit() {
        if(this.sanzion.id) {
            this.sanzionSvc.Put('sanziones', this.sanzion).subscribe(resp => {
                if(resp.getOne.id) {
                    alert({title: "Message", message: `${resp.message} Puede imprimir esta sanzión`, okButtonText: "Ok"});
                    this.sanzion.id = resp.getOne.id
                } else {
                    alert({title: "Message", message: resp.message, okButtonText: "Ok"})
                }
            }, error => {
                console.log(error)
            });
        } else {
        if(this.sanzion.via.length == 0 || this.sanzion.lugar.length == 0) {
            alert({title: "Message", message: "Ingrese los datos del lugar.", okButtonText: "Ok"})
        }else {
            await this.searchVehiculo();
        }
        }
    }

    async searchVehiculo() {
        await this.registerVehicle();
        this.vhcleSvce.Get("vehiculos").subscribe(async resp => {
             let vehiculo = resp.getAll
                .find(item =>
                    item.matricula.toLowerCase().includes(this.vehiculo.matricula.toLowerCase())
                );

             if(!vehiculo) {
                 alert({ title: "Message", message: "Registre el vehiculo para realizar correctacmente este proceso.", okButtonText: "Ok"});
             }else{
                 this.vehiculo = vehiculo;
                 await this.registerSanzion(this.vehiculo.id);
             }
        });
    }

    async registerSanzion(idVehiculo : number) {
        this.sanzion.idVehiculo = idVehiculo;
        this.sanzionSvc.Post('sanziones', this.sanzion).subscribe(resp => {
            if(resp.getOne.id) {
                alert({title: "Message", message: `${resp.message} Puede imprimir esta sanzión`, okButtonText: "Ok"});
                this.sanzion.id = resp.getOne.id
            } else {
                alert({title: "Message", message: resp.message, okButtonText: "Ok"})
            }
        }, error => {
            console.log(error)
        });
    }

    async registerVehicle() {
        this.vehiculo.tipoVehiculo = 1;
        this.vehiculo.marca = this.vehiculo.marca.replace(/ /g,"");
        this.vehiculo.matricula = this.vehiculo.matricula.toUpperCase().replace(/ /g, "");
        console.log(this.vehiculo);
        this.vhcleSvce.Post('vehiculos',this.vehiculo).subscribe(resp => {
            console.log(resp.message);
        });
    }

    async openImagePicker(index: number) {
        try {
            this.takePicture();
            console.log('foto tomada.');
        } catch (e) {
            console.log('foto tomada.', e);
        }
    }

    takePicture() {
        this.list = [];
       try {
           RadImagepicker.prototype.pick({ allowVideoSelection: false, imageLimit: 3, doneButtonTitle: "Done", noImagesTitle:"no"}).then((selectedImages) => {
               if (selectedImages) {
                   selectedImages.forEach(async item => {
                       let image = new Image();
                       image.src = item;
                       console.log(item);
                       this.list.push(image);
                   });
               }
           });
       } catch (e) {
           console.log(e)
       }
    }

}
