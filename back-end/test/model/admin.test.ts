import { Admin } from "../../model/admin";
import { Expense } from "../../model/expense";
import { User } from "../../model/user";

const user1 = new User({
    username: 'user1',
    password: 'password1',
    role: 'admin'
});


const expense1 = new Expense({ 
    totalCost: 1000,
    month: '01-2021',
});

test("given: valid values for Admin, when: Admin is created, then: Admin is created with those values", () => {
    const admin = new Admin({
        name: 'admin1',
        user: user1,
        expenses: [expense1]
    });
    expect(admin.getUser()).toEqual(user1);
    expect(admin.getExpenses()).toEqual([expense1]);
});
    