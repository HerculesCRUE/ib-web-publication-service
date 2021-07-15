import { LdpEntityDetail } from "./LdpEntityDetail";

/**
 *
 * @export
 * @class LdpEntityDetails
 */
export class LdpEntityDetails {

    uri: string;

    jsonLd: string;

    properties: LdpEntityDetail[];

    relations: LdpEntityDetails[];
}