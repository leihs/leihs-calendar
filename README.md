# leihs-calendar

This is a UI component used internally in [leihs](https://github.com/leihs/leihs) _(via [leihs-ui](https://github.com/leihs/leihs-ui))_.

Docs and Examples: <https://leihs.github.io/leihs-calendar/>

It was forked from <https://github.com/hypeserver/react-date-range> (version 1.4), go there for more information.

## Additional features of this fork

### Custom CSS class names per day cell

Prop `dayConfigGetter`: a callback function with `day` (`Date` object) argument, must return an object of shape `{ customClassNames: "my-custom-class"}`. 

### Month lazy loading

Prop `maxDateLoaded`: When given, any month beyond this date will show a loading indicator instead of the calendar. 

Prop `loadingIndicator`: Content of the loading indicator (defaults to "loading…")

## Getting Started

Install [Node.js](https://nodejs.org/en/download) and [Yarn](https://yarnpkg.com/lang/en/).

Run `yarn` to install the dependencies.

Run `yarn run start` to start development server.

Run `yarn run test` and `yarn run lint` for make sure tests passes and linter doesn't throw any error.

Run `yarn run build` compile the library and demo source.


