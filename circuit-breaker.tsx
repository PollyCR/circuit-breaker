export class CircuitBreaker {

  private state: CircuitState = CircuitState.closed;
  private counter: number = 0;

  public run(action: () => any): void {
    if (this.state === CircuitState.closed) 
        try {
            this.counter++;
            action();
        } catch {
            if (this.counter >= this.openAfter) {
                this.state = CircuitState.open;
                setTimeout(() => { this.state = CircuitState.closed}, this.resetTimeout)
            }

        }
  }

  constructor(
      private openAfter: number, 
      private resetTimeout: number = 0) {
  }
}

export enum CircuitState {
  closed,
  open,
  halfOpen
}
