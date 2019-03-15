import { brands } from './brands';

export default class Bead {

    /**
     * Construct a Bead used in Project.
     *
     * @param {!string} brand is the brand of the bead. This must be in brands.
     * @param {!string} color is the color of the bead.
     * @param {!string} name is the name of the bead.
     */
    constructor(brand, color, name) {
        if (!brand || !color || !name) {
            throw 'brand, color and name are all required.';
        }

        if (!brands[brand]) {
            throw 'brand must exist in brands.';
        }

        this._brand = brand;
        this._color = color;
        this._name = name;
    }

    /**
     * Get bead brand.
     * @returns {!string} brand of bead.
     */
    get brand() {
        return this._brand;
    }

    /**
     * Get bead color.
     * @returns {!string} color of bead.
     */
    get color() {
        return this._color;
    }

    /**
     * Get bead name.
     * @returns {!string} name of bead.
     */
    get name() {
        return this._name;
    }

    /**
     * Determine if specified bead is equal to this bead.
     * @param {!Bead} bead is the bead to compare to this bead.
     * @returns {!boolean} true if beads are equal.
     */
    equals(bead) {
        if (!bead) {
            return false;
        }

        if (this === bead) {
            return true;
        }

        if (!bead || !(bead instanceof Bead)) {
            return false;
        }

        if (this._brand !== bead._brand) {
            return false;
        }

        if (this._color !== bead._color) {
            return false;
        }

        if (this._name !== bead._name) {
            return false;
        }

        return true;
    }
}
