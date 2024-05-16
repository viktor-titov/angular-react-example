# AngularReactExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Необходимые пакеты

```bash
npm i --save -D react react-dom @types/react @types/react-dom
```

## Подготовка


В первую очередь, важно понимать, что React по умолчанию не требует никаких особенных условий при сборке. Если не использовать JSX, а ограничиться вызовами createElement, то никаких шагов предпринимать не придется, все просто будет работать из коробки.

Но, конечно, мы привыкли использовать JSX и не хочется терять его. К счастью, по умолчанию Angular использует TypeScript, который умеет трансформировать JSX в вызовы функции. **Нужно просто добавить флаг компилятора --jsx=react или в tsconfig.json в разделе compilerOptions дописать строку "jsx": "react".**

> по умолчанию Angular использует TypeScript, который умеет трансформировать JSX в вызовы функции