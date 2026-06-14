import type { ClassicFlavor } from './types';

/** Hand-picked flavor for culturally notable classic targets (001–999). */
const CURATED: Record<string, ClassicFlavor> = {
  '001': {
    text: 'Your odyssey begins. Open the pod bay doors.',
    source: '2001: A Space Odyssey',
    category: 'pop-culture',
  },
  '007': {
    text: 'Bond. James Bond.',
    source: 'James Bond',
    category: 'pop-culture',
  },
  '014': {
    text: 'Be my Valentine — you found love on a license plate.',
    category: 'pop-culture',
  },
  '023': {
    text: 'His Airness. The GOAT wore 23.',
    source: 'Michael Jordan',
    category: 'pop-culture',
  },
  '042': {
    text: "Don't panic.",
    source: "The Hitchhiker's Guide to the Galaxy",
    category: 'pop-culture',
  },
  '066': {
    text: '1066 — Hastings changed everything.',
    category: 'history',
  },
  '069': {
    text: 'Nice.',
    category: 'pop-culture',
  },
  '077': {
    text: 'A long time ago, in a galaxy not far from this plate…',
    source: 'Star Wars (1977)',
    category: 'pop-culture',
  },
  '100': {
    text: 'Century mark. Perfect score energy.',
    category: 'pop-culture',
  },
  '101': {
    text: 'Intro to everything — and 101 spotted coats.',
    source: '101 Dalmatians',
    category: 'pop-culture',
  },
  '113': {
    text: 'THX-1138 approves this find.',
    source: 'THX 1138',
    category: 'pop-culture',
  },
  '119': {
    text: 'Call before you dig — or before you drive away proud.',
    category: 'pop-culture',
  },
  '123': {
    text: 'As easy as one, two, three.',
    category: 'pattern',
  },
  '127': {
    text: 'The biggest number a signed byte can hold. Nerd cred unlocked.',
    category: 'math',
  },
  '128': {
    text: '2⁷ — a byte-sized milestone.',
    category: 'math',
  },
  '138': {
    text: 'THX-1138 is pleased you noticed.',
    source: 'THX 1138',
    category: 'pop-culture',
  },
  '143': {
    text: 'I love you — pager-code classic.',
    category: 'pop-culture',
  },
  '149': {
    text: 'Boldly go — the final frontier of plate spotting.',
    source: 'Star Trek',
    category: 'pop-culture',
  },
  '166': {
    text: 'Get your kicks — Route 66 vibes.',
    source: 'Route 66',
    category: 'pop-culture',
  },
  '187': {
    text: 'Homicide — police code find.',
    category: 'pop-culture',
  },
  '191': {
    text: 'The war to end all wars — 1914 echoes.',
    category: 'history',
  },
  '198': {
    text: 'Big Brother is watching this plate.',
    source: '1984',
    category: 'pop-culture',
  },
  '200': {
    text: 'OK — the server approves this find.',
    category: 'internet',
  },
  '201': {
    text: 'Created — a sequel-worthy discovery.',
    category: 'internet',
  },
  '211': {
    text: 'Party rock is in the house tonight.',
    source: 'LMFAO',
    category: 'pop-culture',
  },
  '212': {
    text: 'Start spreading the news — NYC calling.',
    source: 'New York area code',
    category: 'pop-culture',
  },
  '213': {
    text: 'Welcome to LA — sunshine and traffic.',
    source: 'Los Angeles area code',
    category: 'pop-culture',
  },
  '214': {
    text: 'Everything is bigger, including this find.',
    source: 'Dallas area code',
    category: 'pop-culture',
  },
  '221': {
    text: 'Elementary, my dear Watson — 221B Baker Street.',
    source: 'Sherlock Holmes',
    category: 'pop-culture',
  },
  '256': {
    text: '2⁸ — another byte of glory.',
    category: 'math',
  },
  '300': {
    text: 'This is Sparta! …close enough.',
    source: '300',
    category: 'pop-culture',
  },
  '301': {
    text: 'Moved permanently — but this find stays with you.',
    category: 'internet',
  },
  '302': {
    text: 'Found — redirecting you to bragging rights.',
    category: 'internet',
  },
  '314': {
    text: 'Pi is jealous you found this one first.',
    category: 'math',
  },
  '321': {
    text: 'Blast off — countdown complete.',
    source: 'Launch countdown',
    category: 'pop-culture',
  },
  '333': {
    text: 'Halfway to the beast — still holy?',
    category: 'pop-culture',
  },
  '337': {
    text: 'LEET — elite find, h4x0r.',
    category: 'internet',
  },
  '400': {
    text: 'Bad request — but a great find.',
    category: 'internet',
  },
  '401': {
    text: 'Unauthorized — yet you spotted it anyway.',
    category: 'internet',
  },
  '403': {
    text: 'Forbidden plate. Legendary spotter.',
    category: 'internet',
  },
  '404': {
    text: 'Plate not found. …Wait, you found it.',
    category: 'internet',
  },
  '405': {
    text: 'Method not allowed — method: keep winning.',
    category: 'internet',
  },
  '406': {
    text: 'Not acceptable — except this find is perfect.',
    category: 'internet',
  },
  '408': {
    text: 'Request timeout — you were faster than the server.',
    category: 'internet',
  },
  '411': {
    text: 'Directory assistance — you had the info all along.',
    category: 'pop-culture',
  },
  '412': {
    text: 'Precondition failed — precondition: sharp eyes.',
    category: 'internet',
  },
  '415': {
    text: 'San Francisco — cable cars and cold plates.',
    source: 'San Francisco area code',
    category: 'pop-culture',
  },
  '418': {
    text: "I'm a teapot.",
    source: 'HTTP 418',
    category: 'internet',
  },
  '420': {
    text: 'Blaze it — high priority find.',
    category: 'pop-culture',
  },
  '451': {
    text: 'Temperature at which plates catch fire.',
    source: 'Fahrenheit 451',
    category: 'pop-culture',
  },
  '456': {
    text: 'The combination to every movie safe ever.',
    category: 'pop-culture',
  },
  '492': {
    text: '1492 — Columbus sailed, you spotted.',
    category: 'history',
  },
  '500': {
    text: 'Internal server error — externally, you nailed it.',
    category: 'internet',
  },
  '502': {
    text: 'Bad gateway — good eyes, though.',
    category: 'internet',
  },
  '503': {
    text: 'Service unavailable — your spotting service is not.',
    category: 'internet',
  },
  '511': {
    text: 'Travel info hotline — road trip approved.',
    category: 'pop-culture',
  },
  '512': {
    text: '2⁹ — keep doubling down.',
    category: 'math',
  },
  '555': {
    text: 'The phone number every movie uses.',
    category: 'pop-culture',
  },
  '666': {
    text: 'Number of the beast. \\m/',
    category: 'pop-culture',
  },
  '667': {
    text: 'Neighbor of the beast — still cursed with coolness.',
    category: 'pop-culture',
  },
  '707': {
    text: 'NorCal vibes — wine country find.',
    source: '707 area code',
    category: 'pop-culture',
  },
  '714': {
    text: '714 — the Babe Ruth of plate numbers.',
    source: 'Babe Ruth',
    category: 'pop-culture',
  },
  '718': {
    text: 'Brooklyn in the house.',
    source: '718 area code',
    category: 'pop-culture',
  },
  '737': {
    text: 'Max 737 — cleared for takeoff.',
    category: 'pop-culture',
  },
  '747': {
    text: 'Jumbo find — queen of the skies.',
    source: 'Boeing 747',
    category: 'pop-culture',
  },
  '776': {
    text: '1776 — life, liberty, and the pursuit of plates.',
    category: 'history',
  },
  '777': {
    text: 'Jackpot! The slots are with you.',
    source: 'Las Vegas',
    category: 'pop-culture',
  },
  '800': {
    text: 'Toll-free nostalgia — this find costs nothing extra.',
    category: 'pop-culture',
  },
  '808': {
    text: 'Beat detected — drop the bass.',
    category: 'pop-culture',
  },
  '811': {
    text: 'Know what’s below before you celebrate above.',
    category: 'pop-culture',
  },
  '867': {
    text: '867-5309 — Jenny, I got your number.',
    source: 'Tommy Tutone',
    category: 'pop-culture',
  },
  '888': {
    text: 'Triple fortune — luck is on your side.',
    category: 'pop-culture',
  },
  '902': {
    text: '90210 — Beverly Hills, plate capital of the world.',
    source: 'Beverly Hills 90210',
    category: 'pop-culture',
  },
  '911': {
    text: 'Emergency — this find is urgent-level awesome.',
    category: 'pop-culture',
  },
  '916': {
    text: 'Sacramento — state capital spotter.',
    category: 'pop-culture',
  },
  '925': {
    text: 'LANA! …Danger Zone adjacent.',
    source: 'Archer',
    category: 'pop-culture',
  },
  '999': {
    text: 'End of the line. You are a plate-spotting legend.',
    category: 'pop-culture',
  },
};

function isRepdigit(target: string): boolean {
  return target[0] === target[1] && target[1] === target[2];
}

function isPalindrome(target: string): boolean {
  return target[0] === target[2];
}

function isAscendingSequence(target: string): boolean {
  const a = Number(target[0]);
  const b = Number(target[1]);
  const c = Number(target[2]);
  return b === a + 1 && c === b + 1;
}

function isDescendingSequence(target: string): boolean {
  const a = Number(target[0]);
  const b = Number(target[1]);
  const c = Number(target[2]);
  return b === a - 1 && c === b - 1;
}

function getPerfectSquareFlavor(value: number): ClassicFlavor | null {
  const root = Math.sqrt(value);
  if (!Number.isInteger(root) || root < 2) {
    return null;
  }
  return {
    text: `${root} × ${root} — a perfect square.`,
    category: 'math',
  };
}

function getPatternFlavor(target: string, value: number): ClassicFlavor | null {
  if (isRepdigit(target)) {
    const digit = target[0];
    if (digit === '0') {
      return {
        text: 'Triple zero — rare air.',
        category: 'pattern',
      };
    }
    return {
      text: `Triple ${digit}s — repetition is destiny.`,
      category: 'pattern',
    };
  }

  if (isAscendingSequence(target)) {
    return {
      text: 'Digits marching upward — order in the chaos.',
      category: 'pattern',
    };
  }

  if (isDescendingSequence(target)) {
    return {
      text: 'Countdown complete — digits falling into place.',
      category: 'pattern',
    };
  }

  if (isPalindrome(target)) {
    return {
      text: 'Palindrome power — reads the same coming and going.',
      category: 'pattern',
    };
  }

  if (value >= 100 && value % 100 === 0) {
    return {
      text: `Round ${value} — century club.`,
      category: 'pattern',
    };
  }

  if (value % 25 === 0 && value > 0) {
    return {
      text: 'Divisible by 25 — quarter-century vibes.',
      category: 'pattern',
    };
  }

  if (value % 10 === 0 && value % 100 !== 0) {
    return {
      text: 'Ends in zero — satisfyingly round.',
      category: 'pattern',
    };
  }

  return getPerfectSquareFlavor(value);
}

/** Returns flavor for a classic target, or null if none applies. */
export function getClassicFlavor(target: string): ClassicFlavor | null {
  const curated = CURATED[target];
  if (curated) {
    return curated;
  }

  const value = Number.parseInt(target, 10);
  if (Number.isNaN(value) || value < 1 || value > 999) {
    return null;
  }

  return getPatternFlavor(target, value);
}

/** Count how many classic targets (001–999) have flavor — for sanity checks. */
export function countClassicFlavorCoverage(): number {
  let count = 0;
  for (let index = 0; index < 999; index += 1) {
    const target = String(index + 1).padStart(3, '0');
    if (getClassicFlavor(target)) {
      count += 1;
    }
  }
  return count;
}
