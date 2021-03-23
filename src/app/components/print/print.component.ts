import {Component, OnInit} from "@angular/core";
import {PrinterService} from "../../../services/app-settings/printer.service";
import {RouterExtensions} from "@nativescript/angular";
import {printModel} from "../../../models/print/print.model";
import {ObservableArray} from "@nativescript/core";

@Component({
    selector: "printer",
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.css'],
})
export class printComponent implements OnInit {

    list = new ObservableArray<printModel>();
    constructor(
        private router:RouterExtensions,
        private printService: PrinterService
    ) {
    }

    async ngOnInit() {

    }

    onBack() {
        this.router.back();
    }


   async searchPrinter() {
       this.list = new ObservableArray<printModel>();
       this.list.push(await this.printService.searchAparedDispositives());
    }
}
