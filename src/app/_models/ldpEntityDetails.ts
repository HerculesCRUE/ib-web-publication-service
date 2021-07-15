import { LdpEntityDetail } from "./LdpEntityDetail";

/**
 *
 * @export
 * @class LdpEntityDetails
 */
export class LdpEntityDetails {

    uri: string;

    properties: LdpEntityDetail[];

    relations: LdpEntityDetails[];
}