import { ELEMENTS, ELEMENTS_TOTAL, getElementName } from '../sequences/elements';
import type { Flavor } from './types';

/** One blurb per element, in periodic-table order (H → Og). */
const ELEMENT_FLAVORS: readonly Flavor[] = [
  {
    text: 'The universe is mostly this — stars run on hydrogen fusion.',
    category: 'science',
  },
  {
    text: 'Party balloons, squeaky voices, and the second lightest element.',
    category: 'science',
  },
  {
    text: 'Powers phones and EVs — the lightest metal that packs a punch.',
    category: 'science',
  },
  {
    text: 'X-ray windows and aerospace alloys — strong but touch with care.',
    category: 'science',
  },
  {
    text: 'The fifth element — not Leeloo, but Boron still counts.',
    category: 'pop-culture',
  },
  {
    text: 'Diamonds, DNA, graphite, and life as we know it — all carbon.',
    category: 'science',
  },
  {
    text: 'Most of the air you breathe is this — and every protein needs it.',
    category: 'science',
  },
  {
    text: 'The element you literally cannot live without for five minutes.',
    category: 'science',
  },
  {
    text: 'Toothpaste, Teflon, and the most electronegative element on the table.',
    category: 'science',
  },
  {
    text: 'Neon signs, laser tubes, and a noble gas that never parties with others.',
    category: 'pop-culture',
  },
  {
    text: 'Table salt’s other half — and the reason your nerves can fire.',
    category: 'science',
  },
  {
    text: 'Chlorophyll’s core metal and the white flash in old photography.',
    category: 'science',
  },
  {
    text: 'Once more precious than gold — now holding your soda.',
    category: 'history',
  },
  {
    text: 'Sand, chips, and Silicon Valley — the digital age runs on this.',
    category: 'pop-culture',
  },
  {
    text: 'DNA, ATP, and match heads — phosphorus does the heavy lifting.',
    category: 'science',
  },
  {
    text: 'Brimstone. Rotten eggs. Also essential to proteins and gunpowder.',
    category: 'science',
  },
  {
    text: 'Pool smell (mostly), bleach, and a killer disinfectant.',
    category: 'science',
  },
  {
    text: 'Fill a bulb with this and it refuses to burn — perfect for lighting.',
    category: 'science',
  },
  {
    text: 'Bananas are famous for it — your cells need it to talk to each other.',
    category: 'science',
  },
  {
    text: 'Bones, chalk, milk, and the reason your skeleton isn’t rubber.',
    category: 'science',
  },
  {
    text: 'Named for Scandinavia — a lightweight metal for aerospace dreams.',
    category: 'history',
  },
  {
    text: 'Strong, light, hypoallergenic — titanium is the sci-fi metal that delivered.',
    category: 'pop-culture',
  },
  {
    text: 'Vanadium steel holds the edge — literally, in better tools.',
    category: 'science',
  },
  {
    text: 'Chrome plating, stainless steel, and that mirror shine.',
    category: 'science',
  },
  {
    text: 'Steel gets harder; biology needs a trace; purple permanganate is its flashy cousin.',
    category: 'science',
  },
  {
    text: 'Humanity’s favorite metal for millennia — blood, swords, and skyscrapers.',
    source: 'Iron Man adjacent',
    category: 'pop-culture',
  },
  {
    text: 'Blue glass in ancient Persia to modern battery cathodes.',
    category: 'history',
  },
  {
    text: 'Five-cent coins and stainless steel — nickel keeps things shiny.',
    category: 'science',
  },
  {
    text: 'Wiring civilization since the Bronze Age — still in your walls.',
    category: 'history',
  },
  {
    text: 'Galvanized steel, sunblock, and the penny’s former core.',
    category: 'science',
  },
  {
    text: 'Melts in your hand, not in your semiconductor.',
    category: 'science',
  },
  {
    text: 'The transistor era started here before silicon took the crown.',
    category: 'history',
  },
  {
    text: 'Arsenic and old lace — poison in fiction, useful in LEDs and lasers.',
    category: 'pop-culture',
  },
  {
    text: 'Photocopiers, glass, and the antioxidant in your shampoo.',
    category: 'science',
  },
  {
    text: 'A stinky red liquid and a classic flame-retardant element.',
    category: 'science',
  },
  {
    text: 'Superman’s home planet — inert, real, and glowing in some lamps.',
    source: 'Superman',
    category: 'pop-culture',
  },
  {
    text: 'Atomic clocks tick with rubidium — GPS owes it a thank-you.',
    category: 'science',
  },
  {
    text: 'Fireworks red and a workhorse in radiotherapy.',
    category: 'science',
  },
  {
    text: 'Red phosphors, superconductors, and a letter Y that isn’t why.',
    category: 'science',
  },
  {
    text: 'Fake diamonds, nuclear fuel cladding, and a tough ceramic star.',
    category: 'science',
  },
  {
    text: 'Superconducting magnets and steel that laughs at heat.',
    category: 'science',
  },
  {
    text: 'Enzymes in your body and cutlery that resists rust.',
    category: 'science',
  },
  {
    text: 'First artificial element — every isotope is radioactive, none found in nature.',
    category: 'history',
  },
  {
    text: 'Hardens platinum and hides in electronics you never see.',
    category: 'science',
  },
  {
    text: 'Catalytic converters and jewelry’s white-metal cousin to platinum.',
    category: 'science',
  },
  {
    text: 'Catalytic converters, hydrogen storage, and white gold vibes.',
    category: 'science',
  },
  {
    text: 'Second place never looked so shiny — photography, coins, cutlery.',
    category: 'history',
  },
  {
    text: 'Batteries, pigments, and a toxic tale told too often in history.',
    category: 'history',
  },
  {
    text: 'Touchscreens, low-melting alloys, and a soft metal with a high-tech job.',
    category: 'science',
  },
  {
    text: 'Bronze age classic, solder for electronics, and tin cans (well, steel with a tin coat).',
    category: 'history',
  },
  {
    text: 'Ancient kohl eyeliner to modern flame retardants.',
    category: 'history',
  },
  {
    text: 'Rare, brittle, and oddly important in tiny doses for electronics.',
    category: 'science',
  },
  {
    text: 'Throat medicine purple and the thyroid’s essential ingredient.',
    category: 'science',
  },
  {
    text: 'Headlights, anesthesia, and ion thrusters in space — xenon does it all.',
    category: 'science',
  },
  {
    text: 'Atomic clocks and the most dramatic water explosion in chemistry class.',
    category: 'science',
  },
  {
    text: 'Green fireworks and the contrast dye that helps your insides show on X-rays.',
    category: 'science',
  },
  {
    text: 'Camera lenses and the gateway to the whole lanthanide block.',
    category: 'science',
  },
  {
    text: 'Lighter flints, catalytic converters, and self-cleaning ovens.',
    category: 'science',
  },
  {
    text: 'Green glass and the magnets inside your headphones.',
    category: 'science',
  },
  {
    text: 'The strongest permanent magnets on the block — EVs love this.',
    category: 'science',
  },
  {
    text: 'The only radioactive lanthanide in the set — glows with cautious pride.',
    category: 'science',
  },
  {
    text: 'Magnets, masers, and samarium-cobalt era bragging rights.',
    category: 'science',
  },
  {
    text: 'Red and blue phosphors — old TVs owed europium a lot.',
    category: 'science',
  },
  {
    text: 'MRI contrast agent and neutron catcher in nuclear work.',
    category: 'science',
  },
  {
    text: 'Green phosphors and sonar equipment — terbium glows green for a living.',
    category: 'science',
  },
  {
    text: 'Magnets that keep working when things get hot.',
    category: 'science',
  },
  {
    text: 'Strongest magnetic moment of any naturally occurring element.',
    category: 'science',
  },
  {
    text: 'Pink glasses and the amplifiers that make fiber-optic internet possible.',
    category: 'science',
  },
  {
    text: 'Portable X-ray machines and lasers with a medical day job.',
    category: 'science',
  },
  {
    text: 'Atomic clocks, lasers, and the quiet workhorse of precision timing.',
    category: 'science',
  },
  {
    text: 'Last of the lanthanides — PET scans and the end of a long rare-earth road.',
    category: 'science',
  },
  {
    text: 'Control rods, Intel gate material, and nuclear engineering’s quiet hero.',
    category: 'science',
  },
  {
    text: 'Tiny capacitors in your phone — tantalum packs charge in a small package.',
    category: 'science',
  },
  {
    text: 'Highest melting point of any element — filaments, armor-piercing rounds, grit.',
    category: 'science',
  },
  {
    text: 'Jet engines and superalloys that laugh at red-hot exhaust.',
    category: 'science',
  },
  {
    text: 'Densest naturally occurring element — a kilo fits in a thimble.',
    category: 'science',
  },
  {
    text: 'The dinosaur-killer layer in Earth’s rock — iridium marks the boundary.',
    category: 'history',
  },
  {
    text: 'Catalytic converters, jewelry, and records that went platinum.',
    category: 'pop-culture',
  },
  {
    text: 'The standard against which other metals are judged — Au, naturally.',
    category: 'history',
  },
  {
    text: 'Liquid at room temperature — thermometers, switches, and a toxic past.',
    category: 'science',
  },
  {
    text: 'Poison with a bitter reputation — also used in infrared optics.',
    category: 'history',
  },
  {
    text: 'Romans piped it; we stopped — still in batteries and radiation shielding.',
    category: 'history',
  },
  {
    text: 'Pepto-Bismol pink and low-melting alloys that melt in hot water.',
    category: 'pop-culture',
  },
  {
    text: 'Marie Curie’s homeland namesake — intensely radioactive, fiercely rare.',
    category: 'history',
  },
  {
    text: 'Rarest naturally occurring element on Earth — astatine barely exists.',
    category: 'science',
  },
  {
    text: 'Basements, radon, and a good reason to test your home.',
    category: 'science',
  },
  {
    text: 'Last natural element discovered — exists for minutes before vanishing.',
    category: 'history',
  },
  {
    text: 'Marie Curie made it glow — radium’s fame outshone its danger for decades.',
    category: 'history',
  },
  {
    text: 'Glows blue in the dark — every isotope is radioactive, all the time.',
    category: 'science',
  },
  {
    text: 'A nuclear fuel candidate that almost had its moment in the sun.',
    category: 'science',
  },
  {
    text: 'Super rare, super radioactive — a stepping stone to uranium.',
    category: 'science',
  },
  {
    text: 'The split that changed history — power plants and a complicated legacy.',
    category: 'history',
  },
  {
    text: 'First transuranic element — trace amounts exist in nature, barely.',
    category: 'science',
  },
  {
    text: 'Power, propulsion, and a name that carries a lot of weight.',
    category: 'history',
  },
  {
    text: 'Your smoke detector beeps thanks to a tiny bit of americium.',
    category: 'science',
  },
  {
    text: 'Named for Marie and Pierre Curie — made in reactors, glows with history.',
    category: 'history',
  },
  {
    text: 'Berkeley’s element — born in nuclear explosions and particle accelerators.',
    category: 'history',
  },
  {
    text: 'Neutron sources for cancer treatment — californium earns its keep.',
    category: 'science',
  },
  {
    text: 'Named for Einstein — produced one atom at a time, vanishing quickly.',
    category: 'history',
  },
  {
    text: 'Fermi’s namesake — half-lives measured in milliseconds.',
    category: 'history',
  },
  {
    text: 'Honors Mendeleev — the table’s architect finally got an element.',
    category: 'history',
  },
  {
    text: 'Nobel’s element — discovery fought over by labs on two continents.',
    category: 'history',
  },
  {
    text: 'Last actinide — named for Ernest Lawrence and his cyclotron.',
    category: 'history',
  },
  {
    text: 'Rutherford’s element — half-lives so short you blink and miss it.',
    category: 'history',
  },
  {
    text: 'Named for Dubna, Russia — made in colliders, gone in seconds.',
    category: 'history',
  },
  {
    text: 'Seaborgium — Glenn Seaborg got an element while still alive. Rare honor.',
    category: 'history',
  },
  {
    text: 'Niels Bohr’s namesake — a fraction of a second in the spotlight.',
    category: 'history',
  },
  {
    text: 'Made in Darmstadt, Germany — hassium honors the state of Hesse.',
    category: 'history',
  },
  {
    text: 'Finally named for Lise Meitner — who deserved it long before.',
    category: 'history',
  },
  {
    text: 'Darmstadtium — another product of Germany’s heavy-element factory.',
    category: 'history',
  },
  {
    text: 'Wilhelm Röntgen and the X-rays that revolutionized medicine.',
    category: 'history',
  },
  {
    text: 'Copernicus — the element that puts the sun at the center.',
    category: 'history',
  },
  {
    text: 'Made in Japan — nihonium marks Asia’s first naming on the table.',
    category: 'history',
  },
  {
    text: 'Honors the Flerov Lab — years of searching, atoms that vanish instantly.',
    category: 'history',
  },
  {
    text: 'Moscovium — Moscow region pride in the periodic table.',
    category: 'history',
  },
  {
    text: 'Livermorium — named for the California lab that pushed the frontier.',
    category: 'history',
  },
  {
    text: 'Tennessine — Oak Ridge and Tennessee on the heaviest edge of chemistry.',
    category: 'history',
  },
  {
    text: 'Oganesson — heaviest element known; blink and the atom is gone.',
    category: 'science',
  },
] as const;

if (ELEMENT_FLAVORS.length !== ELEMENTS_TOTAL) {
  throw new Error(
    `Element flavor count (${ELEMENT_FLAVORS.length}) must match elements (${ELEMENTS_TOTAL}).`,
  );
}

/** Fun blurb for an element find — one entry for every element in the game. */
export function getElementFlavor(symbol: string): Flavor | null {
  const index = ELEMENTS.findIndex(
    (entry) => entry.toUpperCase() === symbol.toUpperCase(),
  );
  if (index < 0) {
    return null;
  }
  return ELEMENT_FLAVORS[index];
}

/** Returns flavor with element name attached for modal display context. */
export function getElementFlavorWithName(symbol: string): {
  flavor: Flavor;
  name: string;
} | null {
  const flavor = getElementFlavor(symbol);
  const name = getElementName(symbol);
  if (!flavor || !name) {
    return null;
  }
  return { flavor, name };
}
