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
});


// ⬜ Able to have a closed circuit