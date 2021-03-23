import * as application  from "@nativescript/core/application"
import * as utils from "@nativescript/core/utils";
import * as permissions from "nativescript-permissions";

export class MustekPrinter {
    async SearchApaired() {
        let permiso = await permissions.requestPermissions([android.Manifest.permission.BLUETOOTH, android.Manifest.permission.BLUETOOTH_ADMIN]);
        if(permiso) {
            let bluetooth = new android.bluetooth.BluetoothAdapter;
            let listDispositives = bluetooth.getBondedDevices();
            console.log(listDispositives);
        }
    }
}
