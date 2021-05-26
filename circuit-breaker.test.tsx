import {
    CircuitBreaker,
    CircuitState,
} from './circuit-breaker'

// import from '@testing-library'

// is there such a thing as circuitbreaker?
describe('Circuit Breaker', () => { 
    
    test('circuit breaker exists', () => {
        const breakCircuit = new CircuitBreaker();
        expect(breakCircuit).toBeDefined();
    });

    test('circuit is closed', () => {
        const breakCircuit = new CircuitBreaker();
        expect(breakCircuit.state).toBe(CircuitState.closed);
    });

    test('executes function when closed', () => {
        const myFn = jest.fn();
        const breaker = new CircuitBreaker();
        breaker.run(myFn); 
        expect(myFn.mock.calls.length).toBe(1);
    });

    // breaks after one call
    test('opens circuit when function fails', () => {
        const myFn = () => {throw new Error('jestytestyfail')};
        const breaker = new CircuitBreaker(1);
        breaker.run(myFn); 
        expect(breaker.state).toBe(CircuitState.open);
    });

    test('only opens circuit when function fails n times', () => {
        const myFn = () => { throw new Error('jestytestyfail') };
        const breaker = new CircuitBreaker(2);
        breaker.run(myFn); 
        expect(breaker.state).toBe(CircuitState.closed);
        breaker.run(myFn); 
        expect(breaker.state).toBe(CircuitState.open);
    });

    
    test('executes function only if state is closed', () => {
        const myFn = jest.fn(() => { throw new Error('jestytestyfail') });
        const breaker = new CircuitBreaker(1);
        breaker.run(myFn); 
        breaker.run(myFn); 
        expect(myFn.mock.calls.length).toBe(1);
    });

    test('breaker closes the circuit after a configured time', () => {
        const badFn = jest.fn(() => { throw new Error('jestytestyfail') });
        const breaker = new CircuitBreaker(0, 100);
        breaker.run(badFn);
        setTimeout(() => {
            expect(breaker.state).toBe(CircuitState.closed);
        }, 150);
    });
    
    test('has a half-open state', async () => {
        jest.useFakeTimers();
        const badFn = jest.fn(() => { throw new Error('jestytestyfail') });
        const breaker = new CircuitBreaker(0, 100);
        breaker.run(badFn);
        setTimeout(() => {
            console.log(breaker.state);
            expect(breaker.state).toBe(CircuitState.halfOpen);
        }, 150);
    });
});


// TODO:
// ✅ Able to have a closed circuit
// ✅ open circuit on error
// ✅ open after n fails
// ✅ Don't call if circuit open
// ✅ Close after time
// ⬜ Half-open state after timeout
// ⬜ if success on halfopen - close the breaker
// ⬜ if fail on halfopen - we open again
// ⬜ Do we want to return the exception thrown? Caller needs to know there was a problem..
// ⬜ Circuit open Exception when calling if open
// Maybe add an interface later?