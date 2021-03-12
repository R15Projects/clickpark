import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {alert, Page} from '@nativescript/core';
import {VigilanteService} from "../../services/vigilantes/vigilante.service";
import {vigilante} from "../../models/vigilantes/vigilante.model";
import * as AppSetting from "@nativescript/core/application-settings";
import {RouterExtensions} from "@nativescript/angular";
@Component({
	selector: 'sign',
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.css']
})

export class SignComponent implements OnInit {
    userRecord: vigilante = { correo: "", numeroplaca: "" };
    listVigilante: vigilante[];
	recordUsPass: boolean = false;
	@ViewChild('placa') placa: ElementRef;
    @ViewChild('correo') correo: ElementRef;
	constructor(
	    page: Page,
        private vigilanteSvc: VigilanteService,
        private route: RouterExtensions
	) {
        page.actionBarHidden = true;
	}

	ngOnInit() {
        this.passRecord()
	    this.vigilanteSvc.Get('vigilantes').subscribe( resp => {
	       this.listVigilante = resp.getAll;
        });
    }

	sign() {
	    let correo = <string>this.correo.nativeElement.text;
	    let placa = <string>this.placa.nativeElement.text;
	    if(correo.length ==  0 || placa.length == 0) {
	        alert({ title: "Messge", message: "Ingrese sus datos para iniciar sesión.", okButtonText: "Ok"});
        } else {
            let vigilante = this.listVigilante.find(item => item.numeroplaca.toUpperCase().trim() == placa.toUpperCase().trim() && item.correo.toUpperCase().trim() == correo.toUpperCase().trim());

	        if(vigilante) {
                if(this.recordUsPass == true) {
                    AppSetting.setString("_recordUs", JSON.stringify(vigilante));
                }
	            AppSetting.setString("_userInfo", JSON.stringify(vigilante));
                this.route.navigateByUrl("/principal");
            } else {
	            alert({ title: "Click Park", message: "Revise su correo y numero de placa.", okButtonText: "Ok"})
            }
        }
    }

    passRecord() {
	    let data = JSON.parse(AppSetting.getString("_recordUs", null));
	    console.log(data);
	    if(data != null){
	        this.recordUsPass = true
	        this.userRecord = data;
        }
    }

    onCheckTerms(event: any) {
        this.recordUsPass = event.value;
    }
}
