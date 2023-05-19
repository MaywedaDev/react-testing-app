import { render, screen, fireEvent, waitFor, getByTestId } from "@testing-library/react";
import Game from "./Game";

test('username should be shown', () => {
    const user = 'John'
    render(<Game user={user}/>)

    const userText = screen.getByTestId('user')
    expect(userText.textContent).toBe(user)
})

test('There must be nine cells in tictactoe', () => {
    const user = 'John'
    render(<Game user={user}/>)

    const gameCells = screen.getAllByTestId('cell')

    expect(gameCells.length).toBe(9)
})

// test('Clicking on a cell will show X or O', () => {
//     const user = 'John'
//     render(<Game user={user}/>)

//     const gameCell = screen.getAllByTestId('parentCell')
//     fireEvent.click(gameCell[0])
//     //@ts-ignore
//     expect(gameCell[0]?.firstChild?.classlist).toContain('cross' || 'circle')
// })