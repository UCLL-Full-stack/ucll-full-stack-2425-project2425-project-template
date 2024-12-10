import { Location } from '../../model/location';
import locationDb from '../../repository/location.db';
import locationService from '../../service/location.service';

let mockLocationDbGetLocationByAddress: jest.Mock;
let mockLocationDbAddLocation: jest.Mock;

beforeEach(() => {
    mockLocationDbAddLocation = jest.fn();
    mockLocationDbGetLocationByAddress = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

const locationInput = { street: 'Teststreet', number: 5, city: 'Brussel', country: 'Belgium' };

const location = new Location({ id: 1, ...locationInput });
test('Given a valid location, when adding new location, then location is created.', async () => {
    locationDb.getLocationByAddress = mockLocationDbGetLocationByAddress.mockReturnValue(null);
    locationDb.addLocation = mockLocationDbAddLocation.mockReturnValue(location);
    const result = await locationService.addLocation(locationInput);

    expect(mockLocationDbGetLocationByAddress).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationByAddress).toHaveBeenCalledWith(
        locationInput.street,
        locationInput.number,
        locationInput.city,
        locationInput.country
    );
    expect(mockLocationDbAddLocation).toHaveBeenCalledTimes(1);
    expect(mockLocationDbAddLocation).toHaveBeenCalledWith(new Location(locationInput));

    expect(result.getId()).toBe(1);
    expect(result.getStreet()).toBe(locationInput.street);
    expect(result.getNumber()).toBe(locationInput.number);
    expect(result.getCity()).toBe(locationInput.city);
    expect(result.getCountry()).toBe(locationInput.country);
});

test('Given already existing location, when adding location, then that location is returned.', async () => {
    //given
    locationDb.getLocationByAddress = mockLocationDbGetLocationByAddress.mockReturnValue(location);
    locationDb.addLocation = mockLocationDbAddLocation.mockReturnValue(null);
    //when
    const result = await locationService.addLocation(locationInput);
    //then
    expect(mockLocationDbGetLocationByAddress).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationByAddress).toHaveBeenCalledWith(
        locationInput.street,
        locationInput.number,
        locationInput.city,
        locationInput.country
    );
    expect(mockLocationDbAddLocation).toHaveBeenCalledTimes(0);

    expect(result.getId()).toBe(1);
    expect(result.getStreet()).toBe(locationInput.street);
    expect(result.getNumber()).toBe(locationInput.number);
    expect(result.getCity()).toBe(locationInput.city);
    expect(result.getCountry()).toBe(locationInput.country);
});
