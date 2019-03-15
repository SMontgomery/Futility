import Bead from '../../scripts/project/bead';
import { brands } from '../../scripts/project/brands';


describe('Test Bead', () => {

    test('Should construct Bead.', () => {
        const brand = brands.PERLER;
        const color = '#0000ff';
        const name = 'Blue';

        const bead = new Bead(brand, color, name);
        expect(bead).toBeTruthy();
        expect(bead.brand).toBe(brand);
        expect(bead.color).toBe(color);
        expect(bead.name).toBe(name);
    });

    test('Should throw exception do to missing brand.', () => {
        const brand = undefined;
        const color = '#0000ff';
        const name = 'Blue';

        const createBead = () => new Bead(brand, color, name);

        expect(createBead).toThrow();
    });

    test('Should throw exception do to missing color.', () => {
        const brand = brands.PERLER;
        const color = undefined;
        const name = 'Blue';

        const createBead = () => new Bead(brand, color, name);

        expect(createBead).toThrow();
    });

    test('Should throw exception do to missing name.', () => {
        const brand = brands.PERLER;
        const color = '#0000ff';
        const name = undefined;

        const createBead = () => new Bead(brand, color, name);

        expect(createBead).toThrow();
    });

    test('Should show two beads are equal.', () => {
        const brand = brands.PERLER;
        const color = '#0000ff';
        const name = 'Blue';

        const bead1 = new Bead(brand, color, name);
        const bead2 = new Bead(brand, color, name);

        expect(bead1.equals(bead2)).toBe(true);
    });

    test('Should show two beads are not equal due to brand.', () => {
        const brand1 = brands.PERLER;
        const brand2 = brands.HAMA;
        const color = '#0000ff';
        const name = 'Blue';

        const bead1 = new Bead(brand1, color, name);
        const bead2 = new Bead(brand2, color, name);

        expect(bead1.equals(bead2)).toBe(false);
    });

    test('Should show two beads are not equal due to color.', () => {
        const brand = brands.PERLER;
        const color1 = '#0000ff';
        const color2 = '#0000ee';
        const name = 'Blue';

        const bead1 = new Bead(brand, color1, name);
        const bead2 = new Bead(brand, color2, name);

        expect(bead1.equals(bead2)).toBe(false);
    });

    test('Should show two beads are not equal due to name.', () => {
        const brand = brands.PERLER;
        const color = '#0000ff';
        const name1 = 'Blue';
        const name2 = 'Light Blue';

        const bead1 = new Bead(brand, color, name1);
        const bead2 = new Bead(brand, color, name2);

        expect(bead1.equals(bead2)).toBe(false);
    });

});