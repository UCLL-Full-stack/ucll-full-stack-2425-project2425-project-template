import nutritionlabelDb from '../../repository/nutritionlabel.db';
import nutritionlabelService from '../../service/nutritionlabel.service';
import { NutritionlabelInput } from '../../types';

let mockNutritionlabelDbGetAllNutritionlabels: jest.Mock;
let mockNutritionlabelDbCreate: jest.Mock;

beforeEach(() => {
    mockNutritionlabelDbGetAllNutritionlabels = jest.fn();
    mockNutritionlabelDbCreate = jest.fn();
});

test('given: a filled nutritionlabelDb, when: getting all nutritionlabels from nutritionlabelService, then: all nutritionlabels are returned', () => {
    // given a filled nutritionlabelDb
    const nutritionlabel1: NutritionlabelInput = {
        energy: 100,
        fat: 0.3,
        saturatedFats: 0.1,
        carbohydrates: 27,
        sugar: 14,
        protein: 1.3,
        salts: 0.01,
    };

    const nutritionlabels: NutritionlabelInput[] = [nutritionlabel1];

    nutritionlabelDb.getAll =
        mockNutritionlabelDbGetAllNutritionlabels.mockReturnValue(nutritionlabels);

    // when getting all nutritionlabels from nutritionlabelService
    nutritionlabelService.getAllNutritionlabels();

    // then all nutritionlabels are returned
    expect(mockNutritionlabelDbGetAllNutritionlabels).toHaveBeenCalled();
    expect(mockNutritionlabelDbGetAllNutritionlabels).toHaveReturnedWith(nutritionlabels);
});

test('given: a valid nutritionlabel, when: creating a nutritionlabel with nutritionlabelService, then: the nutritionlabel is created', () => {
    // given a valid nutritionlabel
    const nutritionlabel: NutritionlabelInput = {
        energy: 100,
        fat: 0.3,
        saturatedFats: 0.1,
        carbohydrates: 27,
        sugar: 14,
        protein: 1.3,
        salts: 0.01,
    };

    nutritionlabelDb.create =
        mockNutritionlabelDbCreate.mockReturnValue(nutritionlabel);

    // when creating a nutritionlabel with nutritionlabelService
    nutritionlabelService.createNutritionlabel(nutritionlabel);

    // then the nutritionlabel is created
    expect(mockNutritionlabelDbCreate).toHaveBeenCalled();
    expect(mockNutritionlabelDbCreate).toHaveReturnedWith(nutritionlabel);
})
