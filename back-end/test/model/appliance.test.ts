import { Appliance } from '../../model/appliance';

let applianceId: number | undefined;
let name: string;
let description: string;
let createdAt: Date;
let updatedAt: Date | undefined;

beforeEach(() => {
    applianceId = undefined;
    name = 'cooking robot';
    description = 'Automated smart kitchen assistant robot';
    createdAt = new Date();
    updatedAt = undefined;
});

test(`given: valid values for appliance, when: appliance is created, then: appliance is created with those values`, () => {
    // when
    const appliance: Appliance = new Appliance({applianceId, name,description, created_at: createdAt, updated_at: updatedAt})

    // then
    expect(appliance.getApplianceId()).toBe(applianceId);
    expect(appliance.getName()).toBe(name);
    expect(appliance.getDescription()).toBe(description);
    expect(appliance.getCreatedAt()).toEqual(createdAt);
    expect(appliance.getUpdatedAt()).toEqual(updatedAt);
});

test(`given: two equal appliances, when: the appliance.equals method is called, then: the method will return true`, () => {
    // given
    const appliance1:Appliance = new Appliance({applianceId, name ,description, created_at: createdAt, updated_at: updatedAt});

    // when
    const isEqual = appliance1.equals(appliance1);

    // then
    expect(isEqual).toBe(true);
});

test(`given: two different appliances, when: the appliance.equals method is called, then: the method will return false`, () => {
    // given
    const appliance1:Appliance = new Appliance({applianceId, name ,description, created_at: createdAt, updated_at: updatedAt});
    const appliance2:Appliance = new Appliance({applianceId, name: "differentAppliance" ,description, created_at: createdAt, updated_at: updatedAt});

    // when
    const isEqual = appliance1.equals(appliance2);

    // then
    expect(isEqual).toBe(false);
});