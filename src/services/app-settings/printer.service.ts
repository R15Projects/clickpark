import {Injectable} from "@angular/core";
import * as permissions from "nativescript-permissions";
import {printModel} from "../../models/print/print.model";

@Injectable({
    providedIn: 'root'
})
export class PrinterService {
    async searchAparedDispositives() {
        try {
            await permissions.requestPermissions([android.Manifest.permission.BLUETOOTH_ADMIN, android.Manifest.permission.BLUETOOTH]);
            console.log("permiso adquirido");
            let bluetoot = android.bluetooth.BluetoothAdapter.getDefaultAdapter();
            bluetoot.enable();
            const paired = bluetoot.getBondedDevices().toArray();
            let list: printModel[] = [];
            for (let i = 0; i < paired.length ; i++) {
                list.push({ printId: i,port: 2, printAddress: paired[i].getAddress(), printName: paired[i].getName() })
            }
            return list;
        } catch (e) {
            return [];
        }
    }

    async connectWithPrint() {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}
