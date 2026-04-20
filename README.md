# leihs-calendar

This is a UI component used internally in [leihs-admin](https://github.com/leihs/leihs-admin) and [leihs-admin](https://github.com/leihs/leihs-borrow).

It was forked from <https://github.com/hypeserver/react-date-range> (version 1.4), go there for more information.

## Additional features of this fork

### Custom CSS class names per day cell

Prop `dayConfigGetter`: a callback function with `day` (`Date` object) argument, must return an object of shape `{ customClassNames: "my-custom-class"}`.

### Month lazy loading

Prop `maxDateLoaded`: When given, any month beyond this date will show a loading indicator instead of the calendar.

Prop `loadingIndicator`: Content of the loading indicator (defaults to "loading…")

## Getting Started

Install [Node.js](https://nodejs.org/en/download).

Run `npm ci` to install the dependencies.

Run `npm run start` to start development server.

Run `npm run test` and `npm run lint` for make sure tests passes and linter doesn't throw any error.

Run `npm run build` compile the library and demo source.
