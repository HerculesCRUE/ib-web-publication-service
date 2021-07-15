import { DataImporterError } from "./dataImporterError";

/**
 *
 * @export
 * @class DataImporter
 */
export class DataImporter {

    /**
     * The id
     */
    id: string;

    /**
     * The date
     */
    startTime: string;

    /**
     * The user
     */
    user: string;

    /**
    * The type
    */
    type: string;

    /**
     * The cron
     */
    cron: string;

    /**
     * The params
     */
    param: string;

    /**
     * The errors
     */
    importerErrors: DataImporterError;
}
