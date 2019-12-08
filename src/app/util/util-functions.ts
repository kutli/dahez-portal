

export class UtilFunctions {

    /**
     * Deep clone of an object without references
     */
    public static deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}