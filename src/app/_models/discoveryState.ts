import { DataDiscoveryState } from './dataDiscoveryState'
/**
 *
 *
 * @export
 * @class DiscoveryState
 */
export class DiscoveryState {

    /**
     * The App State
     */
    appState: string;

    /**
     * The Redis Data State
     */
    redisDataState: DataDiscoveryState;

    /**
     * The Elasticsearch Data State
     */
    elasticDataState: DataDiscoveryState;

    /**
    * The Discovery Data State
    */
    discoveryDataState: DataDiscoveryState;
}