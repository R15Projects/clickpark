import { Component, OnInit } from '@angular/core';
import {RouterExtensions} from "@nativescript/angular";
import {SanzionesService} from "../../services/sanziones/sanziones.service";
import {sanzionModel} from "../../models/sanziones/sanzion.model";
import {ObservableArray, SearchBar} from "@nativescript/core";

@Component({
	moduleId: module.id,
	selector: 'sanziones',
	templateUrl: './sanziones.component.html',
	styleUrls: ['./sanziones.component.css']
})
export class SanzionesComponent implements OnInit {
    filterString = '';
    source: sanzionModel[];
    listSanzion = new ObservableArray<sanzionModel>();
    busy = true;
	constructor(
	    private routeExt: RouterExtensions,
        private sanzionSvc: SanzionesService
    ) { }

	ngOnInit() {
	    this.onLoadData();
    }

	onBack() {
	    this.routeExt.back();
    }

    onLoadData() {
	    this.sanzionSvc.Get('sanziones').subscribe(resp => {
	        this.source = resp.getAll;
            this.listSanzion = new ObservableArray<sanzionModel>();
            this.listSanzion.push(resp.getAll);
            this.busy = false;
        }, error => {
	        console.log(error);
        });
    }

    public onSubmit(args){
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.trim();
        this.filterString = searchValue.toLowerCase();

        this.listSanzion = new ObservableArray<sanzionModel>();
        if(searchValue !== ""){
            for (const i in this.source) {
                if(this.source[i].lugar.toLowerCase().indexOf(this.filterString) !== -1 ||
                    this.source[i].via.toLowerCase().indexOf(this.filterString) !== -1  ||
                    this.source[i].hecho.toLowerCase().indexOf(this.filterString) !== -1 ||
                    this.source[i].vehiculo.marca.toLowerCase().indexOf(this.filterString) !== -1 ||
                    this.source[i].vehiculo.matricula.toLowerCase().indexOf(this.filterString) !== -1
                ){
                    this.listSanzion.push(this.source[i]);
                }
            }
        }else{
            this.listSanzion.push(this.source);
        }
    }

    public onTextChange(args){
        this.onSubmit(args);
    }
}
