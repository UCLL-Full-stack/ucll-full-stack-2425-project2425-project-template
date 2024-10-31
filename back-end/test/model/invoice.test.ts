import { Invoice } from "../../model/invoice";
import { ISP } from "../../model/isp";
import { Student } from "../../model/student";
// Mock Student and ISP instance for testing

const mockStudent = new Student({
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password123",
    nationality: "Belgian",
    startYear: 2022,
    passedCourses: []
})

const mockISP = new ISP({
    id: 1,
    status: "active",
    totalCredits: 30,
    year: 2022,
    courses: [],
    student: mockStudent
});

test("given: valid values for Invoice, when: Invoice is created, then: Invoice is created with those values", () => {
    // when
    const invoice = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    // then
    expect(invoice.id).toEqual(1);
    expect(invoice.totalAmount).toEqual(100);
    expect(invoice.deadline).toEqual(new Date("2024-12-31"));
    expect(invoice.paidAmount).toEqual(50);
    expect(invoice.isp).toEqual(mockISP);
});

test("given: negative totalAmount, when: Invoice is created, then: an error is thrown", () => {
    // when
    const createInvoice = () => new Invoice({
        id: 2,
        totalAmount: -100,
        deadline: new Date("2024-12-31"),
        paidAmount: 0,
        isp: mockISP
    });

    // then
    expect(createInvoice).toThrow("Total amount cannot be negative.");
});

test("given: missing deadline, when: Invoice is created, then: an error is thrown", () => {
    // when
    const createInvoice = () => new Invoice({
        id: 3,
        totalAmount: 100,
        deadline: undefined as any,
        paidAmount: 0,
        isp: mockISP
    });

    // then
    expect(createInvoice).toThrow("Deadline is required.");
});

test("given: negative paidAmount, when: Invoice is created, then: an error is thrown", () => {
    // when
    const createInvoice = () => new Invoice({
        id: 4,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: -20,
        isp: mockISP
    });

    // then
    expect(createInvoice).toThrow("Paid amount cannot be negative.");
});

test("given: missing ISP, when: Invoice is created, then: an error is thrown", () => {
    // when
    const createInvoice = () => new Invoice({
        id: 5,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 1,
        isp: undefined as any
    });

    // then
    expect(createInvoice).toThrow("ISP is required.");
});

test("given: two Invoices with the same properties, when: equals is called, then: returns true", () => {
    // given
    const invoice1 = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    const invoice2 = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    // then
    expect(invoice1.equals(invoice2)).toBe(true);
});

test("given: two Invoices with different properties, when: equals is called, then: returns false", () => {
    // given
    const invoice1 = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    const invoice2 = new Invoice({
        id: 2,
        totalAmount: 200,
        deadline: new Date("2025-12-31"),
        paidAmount: 60,
        isp: mockISP
    });

    // then
    expect(invoice1.equals(invoice2)).toBe(false);
});
