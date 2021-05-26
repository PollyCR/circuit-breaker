# Create a Circuit Breaker
![Circuit Breaker Diagram](./../img/circuit-breaker.png)
From [Martin Fowler](https://martinfowler.com/bliki/CircuitBreaker.html):
> The basic idea behind the circuit breaker is very simple. You wrap a protected function call in a circuit breaker object, which monitors for failures. Once the failures reach a certain threshold, the circuit breaker trips, and all further calls to the circuit breaker return with an error, without the protected call being made at all. Usually you'll also want some kind of monitor alert if the circuit breaker trips.
>
> This simple circuit breaker avoids making the protected call when the circuit is open, but would need an external intervention to reset it when things are well again. This is a reasonable approach with electrical circuit breakers in buildings, but for software circuit breakers we can have the breaker itself detect if the underlying calls are working again. We can implement this self-resetting behavior by trying the protected call again after a suitable interval, and resetting the breaker should it succeed.
>
> Creating this kind of breaker means adding a threshold for trying the reset and setting up a variable to hold the time of the last error.
> There is now a third state present - half open - meaning the circuit is ready to make a real call as trial to see if the problem is fixed.
> Asked to call in the half-open state results in a trial call, which will either reset the breaker if successful or restart the timeout if not.
So, essentially:
1. Make a thing that wraps an action.
2. If that action fails _n_ times, prevent further calls to that action.
3. Wait a period of time (or manually close it).
4. While open - calls immediately rejected.
4. Perform the action again - if it succeeds - continued calls are permitted, otherwise - reset the clock.
5. Optimise by adding the "half-open" state to tentatively try a single call.
## Why is the Circuit Breaker Important?
Now - more than ever - many of our calls are remote calls to (often) HTTP services. There's _many_ reasons why these can fail (infrastructure as well as software issues).
Generally, most systems work well - with perhaps a few sprinkles of errors - but within tolerances.
However, when they go down - they can go down hard. Particularly at scale this causes two main problems:
1. Lots of calls to a clearly failing service - wasting resources, time and reputation.
2. Servers may struggle to get back online and users contunally refresh/retry operations.
## The Kata
_This is a suggested progression. Feel free to deviate if you wish!_ 😊
1. Create a Circuit Breaker that simply has open/closed states, that must be manually closed once open. The tolerance should be configurable.
2. Add automation of closing by adding a timer.
3. Add the 'half-open' state to send only a single request, if that succeeds - we completely reset and close the breaker.
4. Add real-world usage with a mock HTTP server, such as [Sandbox](https://getsandbox.com/).
---
## Patterns
🚧
* Esp. BFFs!