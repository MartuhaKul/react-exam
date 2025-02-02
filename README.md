# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
https://dummyjson.com/docs

Сайт на якому знаходиться акумульована інформація з dummyjson.com про користувачів та рецепти.

Обов'язкові компоненти:
Меню - містить лінки на сторінки та лого залогіненого користувача.У випадку, якщо меню показується не аутентифікованому користувачеві - тов меню пристунє лише лінка на сторінгу аутентифікації.
Пошук - шукає той чи інший рецепт/користувача в залежності від сторінки. Один Текстовий інпут та кнопка за бажанням. Через пошук можна знайти когось/щось за стрінговим значенням, згідно документації, або за ід!!!
Пагінація - пагінує данні.

Головна сторінка (ГС):
За замовчуванням передбачаємо, що користувач не залогінений
При контакті з ГС на ній є повідомлення, що вам потрібно аутентифікуватисьі в меню відповідна лінка.

Сторінка aутентифікації (САФ):
Містить форму з інпутами необхідними для аутентифікацї через dummyjson. Данні для аутентифікацї брати з dummyjson, з будь-якого користувача.
Після завершення процесу аутентифікації в меню з'являються лінки на сторінку всіх рецептів та сторінку вісх користувачів, та лого користувача (брати з об'єкта)




Сторінка з користувачами:
Містить меню, пошук, список користувачів з мінімальною інфою на 3 поля з об'єкту
При кліку на користувача перехід на сторіку з більш детальною інфою про цього користувача (на 7-10 полів, за вашим бажанням) та список його рецептів. При кліку на рецепт - перехід на детальну сторінку рецепту

Сторінка з рецептами:
Мість меню, пошук, список рецептів (лише назва+ теги)
при кліку на рецепт - перехід на сторінку рецепту з детальною інформацією, та лінкою на сторінку користувача, який його зробив.
При кліку на тег - фільтрація/пошук всіх рецептів з таким самим тегом

Дизайн довільний

Всі данні ,які відображаються списком - пагіновані.

Стейтом керуємо через редакс і тільки черз нього.

