import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogIn from "./LogIn";

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: {id:1, name: "John"}
        })
    }
}))

test('The Log In header exists on the page', () => {
    render(<LogIn initUser={null}/>)
    const headerText = screen.getByTestId('login')
    expect(headerText).toBeInTheDocument()
})

test('The Login header to contain the correct text', () => {
    render(<LogIn initUser={null}/>)
    const headerText = screen.getByTestId('login')
    expect(headerText.textContent).toBe('Log In To play TicTacToe')
})

test('The email input exists on the page', () => {
    render(<LogIn initUser={null}/>)
    const emailInput = screen.getByPlaceholderText('Your Email')
    expect(emailInput).toBeInTheDocument()
})

test('The password input exist on the page', () => {
    render(<LogIn initUser={null}/>)
    const passwordInput = screen.getByPlaceholderText('Your Password')
    expect(passwordInput).toBeInTheDocument()
})

test('The email input should be initialized with no value', () => {
    render(<LogIn initUser={null}/>)
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Your Email')
    expect(emailInput.value).toBe('')
})

test('The password input should be initialized with no value', () => {
    render(<LogIn initUser={null}/>)
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Your Password')
    expect(passwordInput.value).toBe('')
})

test('The email input should change as it recieves input', () => {
    render(<LogIn initUser={null}/>)
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Your Email')
    const testValue = 'test'
    fireEvent.change(emailInput, {target: {value: testValue}})
    expect(emailInput.value).toBe(testValue)
})

test('The password input should change as it recieves input', () => {
    render(<LogIn initUser={null}/>)
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Your Password')
    const testValue = 'test'
    fireEvent.change(passwordInput, {target: {value: testValue}})
    expect(passwordInput.value).toBe(testValue)
})


test('The Form on this page includes a button', () => {
    render(<LogIn initUser={null}/>)
    const loginBtn = screen.getByRole('button')
    expect(loginBtn).toBeInTheDocument()
})

test('The button is showing "Login"', () => {
    render(<LogIn initUser={null}/>)
    const loginBtn = screen.getByRole('button')
    expect(loginBtn.textContent).toBe('Log In')
})

test('The button to be disabled', () => {
    render(<LogIn initUser={null}/>)
    const loginBtn = screen.getByRole('button')
    expect(loginBtn).toBeDisabled()
})

test('The button to be not disabled', () => {
    render(<LogIn initUser={null}/>)
    const loginBtn = screen.getByRole('button')
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Your Email')
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Your Password')

    const testValue = 'test'

    fireEvent.change(emailInput, {target: {value: testValue}})
    fireEvent.change(passwordInput, {target: {value: testValue}})

    expect(loginBtn).not.toBeDisabled();
})

test('The button to render loading state when clicked', () => {
    render(<LogIn initUser={null}/>)
    const loginBtn = screen.getByRole('button')

    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Your Email')
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Your Password')

    const testValue = 'test'

    fireEvent.change(emailInput, {target: {value: testValue}})
    fireEvent.change(passwordInput, {target: {value: testValue}})

    fireEvent.click(loginBtn)

    expect(loginBtn).toHaveTextContent('Please wait...')
})


test('error is visible initially', () => {
    render(<LogIn initUser={null}/>)
    const errorText = screen.getByTestId('error')

    expect(errorText).not.toBeVisible();
})

test('The loading should not be rendered  when fetch complete ', async () => {
    render(<LogIn initUser={null}/>)
    const loginBtn = screen.getByRole('button')

    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Your Email')
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Your Password')

    const testValue = 'test'

    fireEvent.change(emailInput, {target: {value: testValue}})
    fireEvent.change(passwordInput, {target: {value: testValue}})

    fireEvent.click(loginBtn)

    await waitFor(() => expect(loginBtn).not.toHaveTextContent('Please wait...'))
})

