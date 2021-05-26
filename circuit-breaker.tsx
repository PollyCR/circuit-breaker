export class CircuitBreaker {
    
    public state: CircuitState = CircuitState.closed;

    public run(action: (n: void) => any) : void {
        action();
    }

}

export enum CircuitState {
    closed
}