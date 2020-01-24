import * as CyptoJS from 'crypto-js';
import { NavigationEnd } from '@angular/router';

export class UtilFunctions {

    /**
     * Method to get property of an object
     * @param obj object
     * @param prop full path to property
     * @returns the value of the property
     */
    public static getProperty(obj: any, prop: string): any {
        if (obj == null) {
            return null;
        }
        const index = prop.indexOf('.');
        if (index > -1) {
            return this.getProperty(obj[prop.substring(0, index)], prop.substring(index + 1));
        }
        return obj[prop];
    }

    /**
     * Function to encrypt with AES, the mode is ECB
     * @param value Value to be encrypted
     * @param ker Key to be used during ecryptation
     * @returns value encrypted
     */
    public static encrypt(value: string, key: string): string {
        return CyptoJS.AES.encrypt(value, key, { mode: CyptoJS.mode.ECB }).toString();
    }

    /**
     * Function to download a Blob it changes between IE and other navigators
     * @param blob Blob to be downloaded
     * @param name Name of the file
     */
    public static downloadFile(blob: Blob, name: string) {
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, name);
        } else {
            UtilFunctions.downloadWithATag(blob, name);
        }
    }

    /**
     * Function to use a Tag A to download a file
     * @param blob Blob to be downloaded
     * @param name Name of the file
     */
    private static downloadWithATag(blob: Blob, name: string) {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', name);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Deep clone of an object without references
     */
    public static deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}
