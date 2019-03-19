import { perlerBrand, perlerBeads } from './beads/perler';
import { hamaBrand, hamaBeads } from './beads/hama';
import { nabbiBrand, nabbiBeads } from './beads/nabbi';

/**
 * @typedef {Object} Bead
 * @property {string} brand - the bead brand
 * @property {string} code - the bead code
 * @property {string} name - the bead name
 * @property {string} type - the bead type
 * @property {string} color - the bead color
 */

/**
 * Class to manage beads for the various brands.
 */
export default class BeadManager {

    /**
     * Construct an instance.
     */
    constructor() {
        this._beadBrandMap = {
            [perlerBrand]: perlerBeads,
            [hamaBrand]: hamaBeads,
            [nabbiBrand]: nabbiBeads
        };
    }

    /**
     * Get the list of brands.
     *
     * @returns {string[]} array of brands
     */
    getBrands() {
        return Object.keys(this._beadBrandMap);
    }

    /**
     * Get the beads for the specified brand.
     *
     * @param {!string} brand - the brand to get the beads for
     * @returns {Bead[]} array of beads
     */
    getBeads(brand) {
        return this._beadBrandMap[brand];
    }
}
