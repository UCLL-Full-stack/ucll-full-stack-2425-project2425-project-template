import React from 'react';
import IngredientenOverzicht from "@/components/ingredienten/IngredientenOverzicht";
import { Type } from "@/types";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from "@testing-library/react";

window.React = React;
jest.mock('next/router', () => require('next-router-mock'));

const type: Type = 'Protein';
const type2: Type = 'Topping';
const type3: Type = 'Sauce';

const ingredienten =
    [
        {
            id: 1,
            naam: 'Salmon',
            type: type,
            aantal: 50,
            prijs: 3.61,
            ingredientLimit: 6
        },
        {
            id: 2,
            naam: 'Avocado',
            type: type2,
            aantal: 30,
            prijs: 2.78,
            ingredientLimit: 6
        }, {
            id: 3,
            naam: 'Spicy mayo',
            type: type3,
            aantal: 200,
            prijs: 1.32,
            ingredientLimit: 6
        }]

let ingredientenService: jest.Mock
ingredientenService = jest.fn();
const mockSelectIngredient = jest.fn();

test('given ingredienten, when you want to see all ingredienten, then view all ingredienten', async () => {
    render(<IngredientenOverzicht ingredienten={ingredienten} selectIngredient={mockSelectIngredient} />);

    expect(screen.getAllByText("Salmon")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Avocado")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Spicy mayo")[0]).toBeInTheDocument();
});

test('given pokebowls, when you want to see what is in the salmon pokebowl, then view all info of that pokebowl', async () => {
    render(<IngredientenOverzicht ingredienten={ingredienten} selectIngredient={mockSelectIngredient} />);
    const avocado = screen.getByText("Avocado");
    fireEvent.click(avocado);

    expect(mockSelectIngredient).toHaveBeenCalledWith(ingredienten[1]);
});