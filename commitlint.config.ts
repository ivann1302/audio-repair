import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // новая фича
        'fix', // баг-фикс
        'refactor', // рефакторинг
        'style', // стили, форматирование
        'test', // тесты
        'docs', // документация
        'chore', // служебные задачи
        'perf', // производительность
        'ci', // CI/CD
        'revert', // откат
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 72],
  },
}

export default config
