import {Component, NgZone, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogService, RouterExtensions} from "@nativescript/angular";
import {RegisterVehicleComponent} from "../components/register-vehicle/register-vehicle.component";
import {confirm, ObservableArray, SearchBar} from "@nativescript/core";
import {vehiculos} from "../../models/vehiculos/vehiculos.model";
import {VehiculosService} from "../../services/vehiculos/vehiculos.service";

@Component({
	selector: 'vehicles',
	templateUrl: './vehicles.component.html',
	styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
    filterString = "";
    source:vehiculos[];
    listVehicles = new ObservableArray<vehiculos>();
    busy = true;
	constructor(
	   private router:RouterExtensions,
       private modalService: ModalDialogService,
       private viewContainerRef: ViewContainerRef,
       private vehiculosService: VehiculosService,
       private ngZone: NgZone
    ) { }

	ngOnInit() {
        this.loadVehicles();
    }

	back() {
	    this.router.back();
    }

    async addVehicle() {
	    await this.modalService.showModal(RegisterVehicleComponent, {
	        fullscreen: false,
            viewContainerRef: this.viewContainerRef,
            animated: true     });
	    this.loadVehicles();
    }

    loadVehicles() {
	    this.vehiculosService.Get("vehiculos").subscribe(resp => {
	        this.listVehicles = new ObservableArray<vehiculos>();
	        this.source = resp.getAll;
	        this.listVehicles.push(resp.getAll);
	        this.busy = false;
        });
    }

    public onSubmit(args){
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.trim();
        this.filterString = searchValue.toLowerCase();

        this.listVehicles = new ObservableArray<vehiculos>();
        if(searchValue !== ""){
            for (const i in this.source) {
                if(this.source[i].marca.toLowerCase().indexOf(this.filterString) !== -1 ||
                    this.source[i].matricula.toLowerCase().indexOf(this.filterString) !== -1){
                    this.listVehicles.push(this.source[i]);
                }
            }
        }else{
            this.listVehicles.push(this.source);
        }
    }

    public onTextChange(args){
        this.onSubmit(args);
    }


    async registerSanzion(id: number) {
	    let accept = await confirm({ okButtonText: "Si", cancelButtonText: "No", message: "Desea aplicar una sanzión a este vehiculo.", title: "Message"});
        if(accept) {
           this.ngZone.run(() => {
               this.router.navigate(['/vehicles/register', id]);
           });
        }
	}
}
