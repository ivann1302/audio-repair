import type { Service } from './types'

export const services: Service[] = [
  {
    id: '1',
    title: 'Усилители мощности',
    description:
      'Ремонт транзисторных и ламповых усилителей. Замена выходных каскадов, конденсаторов, настройка тока покоя.',
    priceFrom: 2500,
    icon: 'amplifier',
    slug: 'amplifiers',
  },
  {
    id: '2',
    title: 'AV-ресиверы',
    description:
      'Диагностика и ремонт AV-ресиверов Yamaha, Denon, Marantz, Pioneer. Восстановление HDMI-плат, усилительных секций.',
    priceFrom: 3000,
    icon: 'receiver',
    slug: 'receivers',
  },
  {
    id: '3',
    title: 'Виниловые проигрыватели',
    description:
      'Обслуживание и ремонт проигрывателей. Замена иглы, настройка тонарма, ремонт двигателя и фонокорректора.',
    priceFrom: 1500,
    icon: 'vinyl',
    slug: 'vinyl',
  },
  {
    id: '4',
    title: 'Акустические системы',
    description:
      'Перепайка кроссоверов, замена и перемотка динамиков, ремонт корпусов. Работаем с Hi-Fi и Hi-End акустикой.',
    priceFrom: 1200,
    icon: 'speaker',
    slug: 'speakers',
  },
  {
    id: '5',
    title: 'CD / SACD проигрыватели',
    description:
      'Замена лазерных головок, ремонт механики привода, восстановление ЦАП и аналоговых выходных каскадов.',
    priceFrom: 2000,
    icon: 'cd',
    slug: 'cd-players',
  },
  {
    id: '6',
    title: 'Магнитофоны',
    description:
      'Ремонт катушечных и кассетных магнитофонов. Замена пассиков, чистка головок, настройка скорости лентопротяжки.',
    priceFrom: 1800,
    icon: 'tape',
    slug: 'tape-recorders',
  },
]
