import { useId } from 'react';
import styles from './ComboInterstateBadge.module.css';

interface ComboInterstateBadgeProps {
  count: number;
}

/**
 * Interstate shield geometry from Wikimedia Commons (public domain):
 * https://commons.wikimedia.org/wiki/File:I-blank.svg
 */
const SHIELD_OUTLINE =
  'M 80.75293,0 C 115.42871,10.583496 152.23779,16.276856 190.37695,16.276856 C 228.51563,16.276856 265.32422,10.583496 300,0.0004883 C 334.67578,10.583496 371.48438,16.276856 409.62305,16.276856 C 447.76172,16.276856 484.57129,10.583496 519.24707,0 C 569.8125,63.908203 600,144.67822 600,232.5 C 600,413.92383 471.16992,565.25391 300,599.99902 C 128.83008,565.25391 0,413.92383 0,232.5 C 0,144.67822 30.187988,63.907715 80.75293,0 z';

const SHIELD_BLUE =
  'M 15,232.5 C 15,200.521 19.169434,169.51611 26.994629,139.99902 L 573.00586,139.99902 C 580.83008,169.51611 585,200.521 585,232.5 C 585,405.60547 462.82617,550.17188 300,584.67676 C 137.17432,550.17188 15,405.60547 15,232.5 z';

const SHIELD_RED =
  'M 31.324219,124.99902 C 43.579102,85.77832 62.362793,49.44043 86.402832,17.259766 C 119.50439,26.392578 154.37061,31.272461 190.37695,31.272461 C 228.4375,31.272461 265.22461,25.820801 300,15.654785 C 334.77539,25.820801 371.5625,31.272461 409.62305,31.272461 C 445.62891,31.272461 480.49609,26.392578 513.59766,17.259766 C 537.63672,49.44043 556.4209,85.77832 568.67578,124.99902 L 31.324219,124.99902 z';

const BLUE_TRANSFORM = 'matrix(1.0070935,0,0,1.0102847,-2.1280324,-3.66885)';
const RED_TRANSFORM = 'matrix(1.0125461,0,0,1.0271486,-3.7638021,-3.1017481)';

export function ComboInterstateBadge({ count }: ComboInterstateBadgeProps) {
  const clipId = `combo-shield-${useId().replace(/:/g, '')}`;
  const label = count === 1 ? '1 extra find' : `${count} extra finds`;
  const text = `+${count}`;
  const fontSize = count >= 100 ? 136 : count >= 10 ? 178 : 224;

  return (
    <svg
      className={styles.shield}
      viewBox="0 0 600 600"
      aria-label={label}
      role="img"
    >
      <title>{`+${count} extra ${count === 1 ? 'find' : 'finds'}`}</title>
      <defs>
        <clipPath id={clipId}>
          <path d={SHIELD_OUTLINE} />
        </clipPath>
      </defs>
      <path
        d={SHIELD_OUTLINE}
        fill="#fff"
        stroke="#fff"
        strokeWidth="24"
        strokeMiterlimit="4"
      />
      <g clipPath={`url(#${clipId})`}>
        <g transform={BLUE_TRANSFORM}>
          <path d={SHIELD_BLUE} fill="#003f87" />
        </g>
        <g transform={RED_TRANSFORM}>
          <path d={SHIELD_RED} fill="#af1e2d" />
        </g>
      </g>
      <text
        x="300"
        y="358"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="var(--font-mono), 'Highway Gothic', 'Arial Narrow', sans-serif"
        letterSpacing="-0.04em"
      >
        {text}
      </text>
    </svg>
  );
}
