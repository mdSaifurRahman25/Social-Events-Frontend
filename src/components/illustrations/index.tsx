import type { SVGProps } from "react";

/**
 * Original flat-vector artwork for the Kindred homepage.
 *
 * These illustrations are drawn from scratch (no stock photography) so the
 * site ships with imagery that is fully ours to license, scales cleanly, and
 * stays on-brand in both light and dark themes.
 *
 * Every scene is drawn on a 400x300 canvas.
 */

export type IllustrationProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

const SKIN = "#F0C3A0";
const SKIN_DARK = "#D9A57C";

type FigureProps = {
  x: number;
  y: number;
  scale?: number;
  shirt: string;
  skin?: string;
  pants?: string;
};

/** A simple flat human silhouette standing on the given ground point. */
const Figure = ({
  x,
  y,
  scale = 1,
  shirt,
  skin = SKIN,
  pants = "#334155",
}: FigureProps) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x="-17" y="-58" width="8" height="26" rx="4" fill={shirt} />
    <rect x="9" y="-58" width="8" height="26" rx="4" fill={shirt} />
    <rect x="-12" y="-24" width="9" height="24" rx="4.5" fill={pants} />
    <rect x="3" y="-24" width="9" height="24" rx="4.5" fill={pants} />
    <rect x="-14" y="-64" width="28" height="42" rx="13" fill={shirt} />
    <circle cx="0" cy="-74" r="10" fill={skin} />
    <path d="M-10 -78a10 10 0 0 1 20 0c0 2-1 3-2 3-4-2-12-2-16 0-1 0-2-1-2-3Z" fill="#2F2A26" />
  </g>
);

const Frame = ({
  bg,
  blob,
  blobX = 322,
  blobY = 62,
  blobR = 62,
}: {
  bg: string;
  blob: string;
  blobX?: number;
  blobY?: number;
  blobR?: number;
}) => (
  <>
    <rect width="400" height="300" fill={bg} />
    <circle cx={blobX} cy={blobY} r={blobR} fill={blob} />
  </>
);

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */

export const BloodDonationArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#FFF1F2" blob="#FECDD3" />

    <rect y="238" width="400" height="62" fill="#FFE4E6" />

    {/* wall clock */}
    <circle cx="64" cy="60" r="24" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="4" />
    <path d="M64 46v15l10 6" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* heart + pulse */}
    <path
      d="M150 96c-9-12-27-9-27 6 0 12 15 20 27 30 12-10 27-18 27-30 0-15-18-18-27-6Z"
      fill="#E11D48"
    />
    <path d="M134 102h10l5-9 7 20 6-11h9" stroke="#FFF1F2" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* IV bag on a stand */}
    <rect x="252" y="96" width="30" height="40" rx="7" fill="#FFFFFF" stroke="#E11D48" strokeWidth="3" />
    <rect x="257" y="104" width="20" height="22" rx="5" fill="#FECDD3" />
    <path d="M267 136v22c0 8-10 8-10 20v18" stroke="#E11D48" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="248" y="66" width="38" height="6" rx="3" fill="#94A3B8" />
    <rect x="264" y="66" width="6" height="34" rx="3" fill="#94A3B8" />

    {/* bed */}
    <rect x="56" y="196" width="184" height="14" rx="7" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="3" />
    <rect x="66" y="210" width="9" height="30" rx="4" fill="#94A3B8" />
    <rect x="222" y="210" width="9" height="30" rx="4" fill="#94A3B8" />

    {/* patient lying down */}
    <circle cx="88" cy="182" r="12" fill={SKIN_DARK} />
    <rect x="102" y="172" width="120" height="24" rx="12" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="3" />
    <rect x="196" y="166" width="30" height="18" rx="7" fill="#FBCFE8" />

    {/* nurse */}
    <Figure x={318} y={238} scale={0.92} shirt="#0F766E" />
    <path d="M306 168h24v18a12 12 0 0 1-24 0z" fill="#FFFFFF" />
    <path d="M313 172h10v4h4v10h-4v4h-10v-4h-4v-10h4z" fill="#14B8A6" />
  </svg>
);

export const TreePlantationArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#F0FDF4" blob="#BBF7D0" blobX={330} blobY={58} blobR={54} />

    <rect y="228" width="400" height="72" fill="#DCFCE7" />

    {/* saplings */}
    <g>
      <rect x="70" y="188" width="9" height="42" rx="4" fill="#A16207" />
      <circle cx="74" cy="176" r="26" fill="#10B981" />
      <circle cx="56" cy="190" r="17" fill="#059669" />
      <circle cx="93" cy="190" r="16" fill="#34D399" />
    </g>
    <g>
      <rect x="300" y="196" width="8" height="36" rx="4" fill="#A16207" />
      <circle cx="304" cy="186" r="21" fill="#10B981" />
      <circle cx="289" cy="198" r="14" fill="#059669" />
    </g>

    {/* mound of soil */}
    <ellipse cx="186" cy="252" rx="62" ry="14" fill="#B45309" />
    <ellipse cx="186" cy="248" rx="44" ry="9" fill="#92400E" />

    {/* sapling being planted */}
    <rect x="182" y="196" width="7" height="52" rx="3.5" fill="#A16207" />
    <circle cx="185" cy="186" r="20" fill="#22C55E" />
    <circle cx="172" cy="196" r="13" fill="#16A34A" />

    {/* volunteer kneeling */}
    <Figure x={262} y={252} scale={0.78} shirt="#F97316" />
    <rect x="228" y="196" width="8" height="40" rx="4" fill="#F97316" />

    {/* shovel */}
    <path d="M238 196 218 244" stroke="#92400E" strokeWidth="7" strokeLinecap="round" />
    <path d="M204 244h30l-8 26h-14z" fill="#94A3B8" />

    {/* birds */}
    <path d="M112 62c6-7 11-7 15 0 4-7 9-7 15 0" stroke="#34D399" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M150 40c5-6 9-6 12 0 3-6 7-6 12 0" stroke="#6EE7B7" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const RiverCleanupArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#EFF6FF" blob="#DBEAFE" blobX={336} blobY={52} blobR={50} />

    <rect y="196" width="400" height="30" fill="#DBEAFE" />
    <path d="M0 212c34-12 66 12 100 0s66-12 100 0 66 12 100 0 66-12 100 0v88H0z" fill="#93C5FD" />
    <path d="M0 244c34-12 66 12 100 0s66-12 100 0 66 12 100 0 66-12 100 0v56H0z" fill="#60A5FA" />
    <path d="M60 268c30-9 54 9 84 0" stroke="#BFDBFE" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M240 274c30-9 54 9 84 0" stroke="#BFDBFE" strokeWidth="4" fill="none" strokeLinecap="round" />

    {/* floating litter */}
    <rect x="150" y="234" width="26" height="9" rx="4" fill="#FDE047" transform="rotate(-12 163 238)" />
    <rect x="292" y="252" width="20" height="7" rx="3" fill="#FCA5A5" transform="rotate(9 302 255)" />

    {/* volunteer with a sack */}
    <Figure x={112} y={196} scale={0.86} shirt="#0EA5E9" />
    <path d="M138 156c14 4 22 16 22 30 0 10-8 16-18 16s-16-6-16-16c0-14 4-26 12-30Z" fill="#F59E0B" />

    {/* second volunteer */}
    <Figure x={258} y={196} scale={0.8} shirt="#16A34A" />

    {/* birds */}
    <path d="M60 72c6-7 11-7 15 0 4-7 9-7 15 0" stroke="#93C5FD" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const FoodReliefArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#FFFBEB" blob="#FEF3C7" blobX={330} blobY={58} blobR={56} />

    <rect y="234" width="400" height="66" fill="#FEF3C7" />

    {/* crates */}
    <g>
      <rect x="46" y="176" width="88" height="58" rx="8" fill="#B45309" />
      <rect x="54" y="188" width="72" height="8" rx="4" fill="#D97706" />
      <rect x="54" y="206" width="72" height="8" rx="4" fill="#D97706" />
    </g>
    <g>
      <rect x="60" y="122" width="60" height="48" rx="7" fill="#D97706" />
      <rect x="67" y="133" width="46" height="7" rx="3.5" fill="#F59E0B" />
    </g>

    {/* rice sacks */}
    <path d="M182 234c-14-8-16-30 0-40 4-16 28-16 32 0 16 10 14 32 0 40z" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
    <path d="M182 194h32" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    <path d="M232 234c-12-8-14-26 0-34 4-14 24-14 28 0 14 8 12 26 0 34z" fill="#FEF9C3" stroke="#D97706" strokeWidth="3" />

    {/* volunteer handing a sack */}
    <Figure x={318} y={234} scale={0.94} shirt="#DB2777" />
    <rect x="272" y="170" width="8" height="34" rx="4" fill="#DB2777" transform="rotate(-28 276 186)" />
    <rect x="248" y="164" width="30" height="24" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />

    {/* measuring scoop */}
    <circle cx="150" cy="120" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
    <path d="M162 110 182 92" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const HealthCampArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#F0FDFA" blob="#CCFBF1" blobX={328} blobY={56} blobR={54} />

    <rect y="238" width="400" height="62" fill="#D1FAE5" />

    {/* canopy */}
    <path d="M40 150 150 76l110 74z" fill="#14B8A6" />
    <path d="M40 150 150 76l110 74z" fill="#0D9488" opacity="0.35" />
    <rect x="52" y="150" width="10" height="88" rx="5" fill="#0F766E" />
    <rect x="248" y="150" width="10" height="88" rx="5" fill="#0F766E" />

    {/* cross badge */}
    <circle cx="150" cy="152" r="34" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="4" />
    <path d="M142 132h16v12h12v16h-12v12h-16v-12h-12v-16h12z" fill="#0D9488" />

    {/* table */}
    <rect x="86" y="206" width="150" height="12" rx="6" fill="#FFFFFF" stroke="#5EEAD4" strokeWidth="3" />
    <rect x="98" y="218" width="8" height="20" rx="4" fill="#0F766E" />
    <rect x="216" y="218" width="8" height="20" rx="4" fill="#0F766E" />

    {/* kit on the table */}
    <rect x="106" y="182" width="34" height="24" rx="5" fill="#FFFFFF" stroke="#5EEAD4" strokeWidth="3" />
    <path d="M123 182v-8a6 6 0 0 1 12 0v8" stroke="#5EEAD4" strokeWidth="3" fill="none" />
    <rect x="160" y="188" width="44" height="18" rx="5" fill="#99F6E4" />

    {/* doctor */}
    <Figure x={300} y={238} scale={0.9} shirt="#0F766E" />
    <circle cx="300" cy="152" r="11" fill="#FDE68A" />
    <path d="M292 152h16" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />

    {/* stethoscope hint */}
    <path d="M116 130c-14 6-18 22-8 32 8 8 22 4 24-6" stroke="#5EEAD4" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="130" cy="158" r="7" fill="#0D9488" />
  </svg>
);

export const LiteracyClassArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#FAF5FF" blob="#E9D5FF" blobX={330} blobY={54} blobR={54} />

    <rect y="236" width="400" height="64" fill="#F3E8FF" />

    {/* blackboard */}
    <rect x="42" y="56" width="176" height="118" rx="10" fill="#334155" />
    <rect x="52" y="66" width="156" height="98" rx="6" fill="#1E293B" />
    <path d="M84 96h20l10 22 14-40 12 30h20" stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M78 140h120" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
    <path d="M78 154h76" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
    <rect x="56" y="174" width="150" height="8" rx="4" fill="#92400E" />

    {/* bookshelf */}
    <rect x="248" y="140" width="118" height="98" rx="8" fill="#A16207" />
    <rect x="256" y="150" width="102" height="30" rx="4" fill="#78350F" />
    <rect x="262" y="152" width="10" height="26" rx="2" fill="#F472B6" />
    <rect x="276" y="152" width="8" height="26" rx="2" fill="#38BDF8" />
    <rect x="288" y="152" width="12" height="26" rx="2" fill="#FBBF24" />
    <rect x="304" y="152" width="8" height="26" rx="2" fill="#A78BFA" />
    <rect x="316" y="152" width="11" height="26" rx="2" fill="#34D399" />
    <rect x="331" y="152" width="8" height="26" rx="2" fill="#FB7185" />
    <rect x="256" y="192" width="102" height="30" rx="4" fill="#78350F" />
    <rect x="262" y="194" width="12" height="26" rx="2" fill="#34D399" />
    <rect x="278" y="194" width="9" height="26" rx="2" fill="#FBBF24" />
    <rect x="291" y="194" width="12" height="26" rx="2" fill="#F472B6" />
    <rect x="307" y="194" width="8" height="26" rx="2" fill="#60A5FA" />
    <rect x="319" y="194" width="11" height="26" rx="2" fill="#A78BFA" />
    <rect x="334" y="194" width="8" height="26" rx="2" fill="#FDE047" />

    {/* student reading */}
    <Figure x={130} y={236} scale={0.84} shirt="#7C3AED" />
    <path d="M100 178c14-8 30-8 42 0v22c-12-8-28-8-42 0z" fill="#FFFFFF" stroke="#A78BFA" strokeWidth="3" />
    <path d="M142 178c12-8 28-8 40 0v22c-12-8-26-8-40 0z" fill="#F5F3FF" stroke="#A78BFA" strokeWidth="3" />

    {/* desk */}
    <rect x="70" y="204" width="128" height="10" rx="5" fill="#92400E" />
  </svg>
);

export const SolarWorkshopArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#EFF6FF" blob="#FEF3C7" blobX={70} blobY={52} blobR={48} />

    {/* sun */}
    <circle cx="70" cy="52" r="26" fill="#FBBF24" />
    <path d="M70 12v-6M70 98v-6M30 52h-6M116 52h-6M42 24l-4-4M102 84l-4-4M98 24l4-4M38 84l4-4" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

    <rect y="238" width="400" height="62" fill="#DBEAFE" />

    {/* rooftop */}
    <rect x="30" y="196" width="340" height="44" rx="8" fill="#94A3B8" />
    <rect x="30" y="196" width="340" height="10" rx="5" fill="#CBD5E1" />

    {/* solar panels */}
    <g>
      <path d="M84 196 148 130l44 66z" fill="#1E3A8A" />
      <path d="M104 182 140 145M88 162h58M104 182l-16-17" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    </g>
    <g>
      <path d="M204 196 268 130l44 66z" fill="#1E3A8A" />
      <path d="M224 182 260 145M208 162h58M224 182l-16-17" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* installer */}
    <Figure x={340} y={238} scale={0.86} shirt="#EA580C" />
    <path d="M310 176 292 226" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />

    {/* inverter box */}
    <rect x="316" y="196" width="40" height="30" rx="6" fill="#475569" />
    <path d="M322 210h12" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const FloodReliefArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#F8FAFC" blob="#E2E8F0" blobX={330} blobY={54} blobR={54} />

    {/* water */}
    <path d="M0 196c34-12 66 12 100 0s66-12 100 0 66 12 100 0 66-12 100 0v104H0z" fill="#BAE6FD" />
    <path d="M0 232c34-12 66 12 100 0s66-12 100 0 66 12 100 0 66-12 100 0v68H0z" fill="#7DD3FC" />
    <path d="M52 258c30-9 54 9 84 0" stroke="#E0F2FE" strokeWidth="4" fill="none" strokeLinecap="round" />

    {/* half-submerged houses */}
    <rect x="252" y="176" width="62" height="46" rx="5" fill="#94A3B8" />
    <path d="M245 176h76l-38-28z" fill="#64748B" />
    <rect x="272" y="192" width="18" height="18" rx="3" fill="#E2E8F0" />

    {/* boat */}
    <path d="M52 224h108l-16 30H68z" fill="#B45309" />
    <rect x="96" y="150" width="8" height="76" rx="4" fill="#92400E" />
    <path d="M104 156l44 52h-44z" fill="#FDE68A" />

    {/* relief boxes */}
    <rect x="58" y="192" width="34" height="28" rx="5" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
    <rect x="88" y="200" width="30" height="24" rx="5" fill="#FCD34D" stroke="#D97706" strokeWidth="3" />

    {/* volunteer in a boat */}
    <Figure x={172} y={224} scale={0.6} shirt="#0EA5E9" />
  </svg>
);

export const StreetLibraryArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#FFF7ED" blob="#FED7AA" blobX={326} blobY={58} blobR={54} />

    <rect y="240" width="400" height="60" fill="#FFEDD5" />

    {/* book box */}
    <rect x="52" y="112" width="128" height="118" rx="12" fill="#7C2D12" />
    <rect x="62" y="122" width="108" height="98" rx="8" fill="#92400E" />
    <rect x="70" y="132" width="92" height="34" rx="5" fill="#451A03" />
    <rect x="76" y="136" width="10" height="26" rx="2" fill="#FBBF24" />
    <rect x="90" y="136" width="8" height="26" rx="2" fill="#F472B6" />
    <rect x="102" y="136" width="11" height="26" rx="2" fill="#38BDF8" />
    <rect x="117" y="136" width="9" height="26" rx="2" fill="#A78BFA" />
    <rect x="130" y="136" width="12" height="26" rx="2" fill="#34D399" />
    <rect x="70" y="176" width="92" height="34" rx="5" fill="#451A03" />
    <rect x="76" y="180" width="11" height="26" rx="2" fill="#34D399" />
    <rect x="91" y="180" width="9" height="26" rx="2" fill="#FBBF24" />
    <rect x="104" y="180" width="12" height="26" rx="2" fill="#FB7185" />
    <rect x="120" y="180" width="8" height="26" rx="2" fill="#60A5FA" />
    <rect x="132" y="180" width="11" height="26" rx="2" fill="#C084FC" />
    <rect x="42" y="102" width="148" height="16" rx="8" fill="#B45309" />

    {/* readers */}
    <Figure x={266} y={240} scale={0.9} shirt="#0D9488" />
    <path d="M242 186c13-7 27-7 38 0v20c-11-7-25-7-38 0z" fill="#FFFFFF" stroke="#5EEAD4" strokeWidth="3" />
    <path d="M280 186c11-7 25-7 36 0v20c-11-7-23-7-36 0z" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="3" />

    {/* lamp post */}
    <rect x="336" y="150" width="8" height="90" rx="4" fill="#57534E" />
    <circle cx="340" cy="142" r="16" fill="#FDE68A" />
    <path d="M340 158v82" stroke="#57534E" strokeWidth="8" strokeLinecap="round" />

    {/* bench */}
    <rect x="204" y="222" width="88" height="10" rx="5" fill="#B45309" />
    <rect x="214" y="232" width="8" height="10" rx="4" fill="#92400E" />
    <rect x="274" y="232" width="8" height="10" rx="4" fill="#92400E" />
  </svg>
);

export const KindredMarkArt = ({ title, ...props }: IllustrationProps) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={title}
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <Frame bg="#FDF4FF" blob="#FAE8FF" blobX={330} blobY={58} blobR={54} />

    {/* three figures joining hands in a circle */}
    <circle cx="200" cy="158" r="86" fill="none" stroke="#E879F9" strokeWidth="5" strokeDasharray="14 12" />
    <Figure x={200} y={112} scale={0.86} shirt="#DB2777" />
    <Figure x={132} y={206} scale={0.86} shirt="#9333EA" />
    <Figure x={268} y={206} scale={0.86} shirt="#0D9488" />

    <circle cx="200" cy="150" r="20" fill="#FDF4FF" stroke="#DB2777" strokeWidth="4" />
    <path d="M192 150h4l3-7 5 14 3-7h3" stroke="#DB2777" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
