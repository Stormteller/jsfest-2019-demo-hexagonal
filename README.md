# Hexagonal architecture demo

This is practical example of hexagonal architecture in NodeJS with Typescript.

It's a super simple event management app.

## Structure

- `/core` - application core, all business logic lives here.
- `/primaryAdapters` - all adapters which are "use" our core to serve the user.
In this example we support only REST API.
- `/secondaryAdapters` - all driven adapters, which our core use via Ports. 
It is connection to 3rd party tools like DB, caches, notification service, SMS provider etc.

### Core

`/core` has 3 main parts:

- `/components` - actual app components with business logic. In DDD it usually called Bounded context. 
Each component is divided into `application` and `domain` layers. 
`application` is the layer with services which executes logic and communicates with outside world via Ports.
`domain` layer stores our entities, values objects, domain services etc.
Also component has `port` folder which stores component specific Ports. 
Common example of such port is Repository which communicates with DB (mostly with component specific tables).  

- `/port` - ports shared by components. 
It's an interfaces for 3rd party tools, like notification service, SMS service, search engine.

- `/sharedKernel` - code that is shared among components. Mostly some utility functions. 
It should be extractable to an installable module if needed. 


### Tests

Testing becomes much easier with hexagonal architecture.

I propose 3 types of test which suits different purposes:

- `unit` - good old unit tests. Test for the smallest parts of application - services. 
Test if your core works properly.

- `integration` - tests for secondary adapters to check if your integrations with 3rd part tools works.

- `acceptance` - kinda integration tests. This is type of test where you test whole app flow with mocked secondary adapters.
You start from primary adapter, e.g. sending http request and test how your components works together.
Mocking secondary adapters makes them fast to execute. They are harder to write, because you may need a lot of mocks,
so recommended to write them for core applications flows.
