# Angular-React Example & Demo

## Принцип

За счет того что React достаточно гибкий и имеет инструменты для рендеринга дерева компонентов и вставки их в DOM. По сути мы это и делаем только в рамках Angular компонента. Подробней о том как это сделать подробно описано в [статье](https://habr.com/ru/articles/468063/)

## Необходимые пакеты

```bash
npm i --save react react-dom @types/react @types/react-dom
```

## Подготовка

В первую очередь, важно понимать, что React по умолчанию не требует никаких особенных условий при сборке. Если не использовать JSX, а ограничиться вызовами createElement, то никаких шагов предпринимать не придется, все просто будет работать из коробки.

Но, конечно, мы привыкли использовать JSX и не хочется терять его. К счастью, по умолчанию Angular использует TypeScript, который умеет трансформировать JSX в вызовы функции. **Нужно просто добавить флаг компилятора --jsx=react или в tsconfig.json в разделе compilerOptions дописать строку "jsx": "react".**

> по умолчанию Angular использует TypeScript, который умеет трансформировать JSX в вызовы функции

## Запуск

```bash
npm run start
```

### Сборка и запуск в контейнере.

делаем билд контейнера командой:
```bash
docker build -t angular-react-example .
```
Проверяем командой docker image ls что образ нашего контейнера появился в списке доступных:

![alt text](/assets/image-4.png)

Запускаем команду:

```bash
docker run -d -p 8080:80 angular-react-example:latest
```


И проверяем запуск приложения по адресу http://localhost:8080/

#### Или же командой:

Сборка и запуск контейнера:

```bash
make run
```

Остановка контейнера:

```bash
make stop
```

# Интересное решение. Перенос интеграции React компонента в @Directive angular

По сути принцип тот же но сам процесс рендеринга в компонент выненсен в Директиву ангуляр. Как вариант универсального подхода.
[Статья источник](https://netbasal.com/using-react-in-angular-applications-1bb907ecac91)

*Direcitve code:*
```typescript
import { ComponentProps, createElement, ElementType } from 'react';
import { createRoot } from 'react-dom/client';

@Directive({
  selector: '[reactComponent]',
  standalone: true
})
export class ReactComponentDirective<Comp extends ElementType> {
  @Input() reactComponent: Comp;
  @Input() props: ComponentProps<Comp>;

  private root = createRoot(inject(ElementRef).nativeElement)

  ngOnChanges() {
    this.root.render(createElement(this.reactComponent, this.props))
  }

  ngOnDestroy() {
    this.root.unmount();
  }

}
```

*Using in component:*
```typescript
import Select from 'react-select';
import type { ComponentProps } from 'react';

@Component({
  standalone: true,
  imports: [CommonModule, ReactComponentDirective],
  template: `
    <h1>Todos page</h1>
    <button (click)="changeProps()">Change</button>
    <div [reactComponent]="Select" [props]="selectProps"></div>
  `
})
export class TodosPageComponent {
  Select = Select;
  selectProps: ComponentProps<Select> = {
    onChange(v) {
      console.log(v)
    },
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
  }
  
  changeProps() {
    this.selectProps = {
      ...this.selectProps,
      options: [{ value: 'changed', label: 'Changed' }]
    }
  }
}
```

## Ленивая загрузка всего бандла React 

Все так же из статьи пример Директивы под ленивую загрузку.

```typescript
import { Directive, ElementRef, Input } from '@angular/core';
import type { ComponentProps, ElementType } from 'react';
import type { Root } from 'react-dom/client';

@Directive({
  selector: '[lazyReactComponent]',
  standalone: true
})
export class LazyReactComponentDirective<Comp extends ElementType> {
  @Input() lazyReactComponent: () => Promise<Comp>;
  @Input() props: ComponentProps<Comp>;

  private root: Root | null = null;

  constructor(private host: ElementRef) { }

  async ngOnChanges() {
    const [{ createElement }, { createRoot }, Comp] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      this.lazyReactComponent()
    ]);

    if (!this.root) {
      this.root = createRoot(this.host.nativeElement);
    }

    this.root.render(createElement(Comp, this.props))
  }

  ngOnDestroy() {
    this.root?.unmount();
  }
}
```

![alt text](/assets/image.png)

Поисле реализации ленивой загрузки получилось отложить загрузку только одного файла размером 930kB

![подгрузка бандла реакт после попадания на страницу с комп.](/assets/image-1.png)

Еще собрал в образе продакшн бандл там такой результат:

![](./assets/Peek%202024-05-16%2017-36.gif)

![alt text](/assets/image-3.png)

Итого 134kB

# Где можно подсмотреть еще реализации и подходы к решению проблемы

## Microsoft package

В одной из указанных статей говориться о библиотеки Microsoft. После беглого анализа мало что понятно, документирована плохо, нужно больше усилий для понимания основной концепции.
[microsoft/angular-react](https://github.com/microsoft/angular-react/tree/master)

## PREACT

В одной из статей говориться об легковесной библиотеки способная работать с React кодом. [preact](https://preactjs.com/guide/v10/switching-to-preact/)

[git](https://github.com/preactjs/preact)

*Цитата из статьи:*
> Важно понимать, что при таком подходе к 85КБ Angular добавляется почти 40КБ кода react и react-dom. Это может оказать существенное влияние на скорость работы приложения. Я рекомендую рассмотреть использование миниатюрного Preact, который весит всего 3КБ. Его интеграция почти не отличается.

## Интеграция React и AngularJS через Webpack Module Federation

Есть еще статья глубокой интеграции. Понять до конца суть не смог, что то связанное со сборкой webpack верней его фичей [Module Federation](https://webpack.js.org/concepts/module-federation/)

# References

- [Простой пример взятый за основу](https://web-world.medium.com/how-to-use-react-web-components-in-angular-b3ac7e39fd17)
- [Статья на Habr с описание подхода реализованый в примере](https://habr.com/ru/articles/468063/)
- [Статья с пример Директивы](https://netbasal.com/using-react-in-angular-applications-1bb907ecac91)