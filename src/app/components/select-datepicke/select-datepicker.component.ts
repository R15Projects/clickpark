import {Component} from "@angular/core";
import {ModalDialogParams} from "@nativescript/angular";
import {EventData} from "@nativescript/core";

@Component({
    template: `
        <StackLayout width="280" height="100%" class="dialog">
            <DatePicker year="1980" month="4" day="20"
                        minDate="{{minDate}}" maxDate="{{maxDate}}"
                        (dateChange)="onDateChanged($event)"
            ></DatePicker>
            <Button text="Confirmar fecha" (tap)="close()"></Button>
        </StackLayout>
    `
})
export class SelectDatepickerComponent {
    minDate:Date = new Date(1975,0,29);
    maxDate:Date = new Date();
    dateResult = new Date();
    constructor(
        private _params: ModalDialogParams,
    ) {
    }

    onDateChanged(args) {
       this.dateResult = args.value;
    }

    close() {
        this._params.closeCallback(this.dateResult.toDateString())
    }
}
