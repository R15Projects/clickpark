import {Component, OnInit} from "@angular/core";
import {PrinterService} from "../../../services/app-settings/printer.service";
import {RouterExtensions} from "@nativescript/angular";

@Component({
    selector: "printer",
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.css'],
})
export class printComponent implements OnInit {

    constructor(
        private router:RouterExtensions
    ) {
    }

    async ngOnInit() {

    }

    onBack() {
        this.router.back();
    }


    async searchPrinter() {
    }
}
