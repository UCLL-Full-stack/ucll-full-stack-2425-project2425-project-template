import { Nutritionlabel } from '../../model/nutritionlabel';
import nutritionlabelDb from '../../repository/nutritionlabel.db';
import nutritionlabelService from '../../service/nutritionlabel.service';

let mockNutritionlabelDbGetAllNutritionlabels: jest.Mock;

beforeEach(() => {
    mockNutritionlabelDbGetAllNutritionlabels = jest.fn();
});

test('given: a filled nutritionlabelDb, when: getting all nutritionlabels from nutritionlabelService, then: all nutritionlabels are returned', () => {
    // given a filled nutritionlabelDb
    const nutritionlabels = [
        new Nutritionlabel({
            energy: 100,
            fat: 0.3,
            saturatedFats: 0.1,
            carbohydrates: 27,
            sugar: 14,
            protein: 1.3,
            salts: 0.01,
        }),
    ];

    nutritionlabelDb.getAll =
        mockNutritionlabelDbGetAllNutritionlabels.mockReturnValue(nutritionlabels);

    // when getting all nutritionlabels from nutritionlabelService
    nutritionlabelService.getAllNutritionlabels();

    // then all nutritionlabels are returned
    expect(mockNutritionlabelDbGetAllNutritionlabels).toHaveBeenCalled();
    expect(mockNutritionlabelDbGetAllNutritionlabels).toHaveReturnedWith(nutritionlabels);
});
