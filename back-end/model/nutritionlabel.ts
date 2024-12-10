import { Nutritionlabel as NutritionlabelPrisma } from '@prisma/client';

export class Nutritionlabel {
    private id?: number | undefined;
    private energy: number;
    private fat: number;
    private saturatedFats: number;
    private carbohydrates: number;
    private sugar: number;
    private protein: number;
    private salts: number;

    constructor(nutritionlabel: {
        id?: number;
        energy: number;
        fat: number;
        saturatedFats: number;
        carbohydrates: number;
        sugar: number;
        protein: number;
        salts: number;
    }) {
        this.validate(nutritionlabel);
        this.id = nutritionlabel.id;
        this.energy = nutritionlabel.energy;
        this.fat = nutritionlabel.fat;
        this.saturatedFats = nutritionlabel.saturatedFats;
        this.carbohydrates = nutritionlabel.carbohydrates;
        this.sugar = nutritionlabel.sugar;
        this.protein = nutritionlabel.protein;
        this.salts = nutritionlabel.salts;
    }

    setId(id: number) {
        this.id = id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getEnergy(): number {
        return this.energy;
    }

    getFat(): number {
        return this.fat;
    }

    getSaturatedFats(): number {
        return this.saturatedFats;
    }

    getCarbohydrates(): number {
        return this.carbohydrates;
    }

    getSugar(): number {
        return this.sugar;
    }

    getProtein(): number {
        return this.protein;
    }

    getSalts(): number {
        return this.salts;
    }

    validate(nutritionlabel: {
        energy: number;
        fat: number;
        saturatedFats: number;
        carbohydrates: number;
        sugar: number;
        protein: number;
        salts: number;
    }) {
        if (nutritionlabel.energy == null) throw new Error('Energy is required');
        if (nutritionlabel.fat == null) throw new Error('Fat is required');
        if (nutritionlabel.saturatedFats == null) throw new Error('Saturated fats are required'); // Update here if optional
        if (nutritionlabel.carbohydrates == null) throw new Error('Carbohydrates are required');
        if (nutritionlabel.sugar == null) throw new Error('Sugar is required');
        if (nutritionlabel.protein == null) throw new Error('Protein is required');
        if (nutritionlabel.salts == null) throw new Error('Salts are required');
    }

    equals(nutritionlabel: Nutritionlabel): boolean {
        return (
            this.energy === nutritionlabel.getEnergy() &&
            this.fat === nutritionlabel.getFat() &&
            this.saturatedFats === nutritionlabel.getSaturatedFats() &&
            this.carbohydrates === nutritionlabel.getCarbohydrates() &&
            this.sugar === nutritionlabel.getSugar() &&
            this.protein === nutritionlabel.getProtein() &&
            this.salts === nutritionlabel.getSalts()
        );
    }

    static from({
        id,
        energy,
        fat,
        saturatedFats,
        carbohydrates,
        sugar,
        protein,
        salts,
    }: NutritionlabelPrisma) {
        return new Nutritionlabel({
            id,
            energy,
            fat,
            saturatedFats,
            carbohydrates,
            sugar,
            protein,
            salts,
        });
    }
}
