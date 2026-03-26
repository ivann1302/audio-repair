// SVG-иконки как React-компоненты.
// Все используют currentColor — цвет наследуется от родителя через CSS.

type SvgProps = { size: number }

export const icons = {
  amplifier: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <rect x="2" y="6" width="20" height="12" />
      <circle cx="8" cy="12" r="2" />
      <line x1="14" y1="9" x2="14" y2="15" />
      <line x1="17" y1="9" x2="17" y2="15" />
      <line x1="20" y1="9" x2="20" y2="15" />
    </svg>
  ),

  receiver: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <rect x="2" y="5" width="20" height="14" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <circle cx="6" cy="7" r="0.5" fill="currentColor" />
      <circle cx="9" cy="7" r="0.5" fill="currentColor" />
      <rect x="5" y="12" width="14" height="4" />
    </svg>
  ),

  vinyl: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),

  speaker: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <rect x="4" y="2" width="16" height="20" />
      <circle cx="12" cy="9" r="3" />
      <circle cx="12" cy="17" r="2" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),

  cd: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <line x1="12" y1="2" x2="12" y2="5" />
    </svg>
  ),

  tape: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <rect x="2" y="4" width="20" height="16" />
      <circle cx="8" cy="12" r="3" />
      <circle cx="16" cy="12" r="3" />
      <path d="M8 15 Q12 18 16 15" />
    </svg>
  ),

  wrench: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),

  phone: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
    </svg>
  ),

  check: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),

  arrow: ({ size }: SvgProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
} as const

export type IconName = keyof typeof icons
