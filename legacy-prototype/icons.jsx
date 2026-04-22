// Icons — minimal line icons with currentColor
// All icons use stroke="currentColor" so they inherit color from parent

const Icon = ({ children, size = 22, strokeWidth = 1.75, style = {}, ...props }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block', ...style }}
    {...props}
  >{children}</svg>
);

const IconHome = (p) => <Icon {...p}><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11z"/></Icon>;
const IconDumbbell = (p) => <Icon {...p}><path d="M6.5 6.5v11M17.5 6.5v11M4 9v6M20 9v6M6.5 12h11"/></Icon>;
const IconTrendingUp = (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></Icon>;
const IconTrophy = (p) => <Icon {...p}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 4H4v2a3 3 0 0 0 3 3M17 4h3v2a3 3 0 0 1-3 3"/></Icon>;
const IconUser = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></Icon>;

const IconFlame = (p) => <Icon {...p}><path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-6 1-9z"/></Icon>;
const IconCalendar = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Icon>;
const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconChevronRight = (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>;
const IconChevronDown = (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>;
const IconChevronLeft = (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>;
const IconPlus = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="M5 12l5 5L20 7"/></Icon>;
const IconX = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>;
const IconPlay = (p) => <Icon {...p}><path d="M7 5v14l12-7z" fill="currentColor"/></Icon>;
const IconPause = (p) => <Icon {...p}><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></Icon>;
const IconTarget = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></Icon>;
const IconArrowUp = (p) => <Icon {...p}><path d="M12 19V5M5 12l7-7 7 7"/></Icon>;
const IconArrowDown = (p) => <Icon {...p}><path d="M12 5v14M5 12l7 7 7-7"/></Icon>;
const IconMore = (p) => <Icon {...p}><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></Icon>;
const IconLock = (p) => <Icon {...p}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Icon>;
const IconBolt = (p) => <Icon {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none"/></Icon>;
const IconScale = (p) => <Icon {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12h8M12 10v4"/></Icon>;
const IconRuler = (p) => <Icon {...p}><path d="M3 15l9-9 6 6-9 9-6-6zM7 13l2 2M9 11l2 2M11 9l2 2M13 7l2 2"/></Icon>;
const IconDroplet = (p) => <Icon {...p}><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></Icon>;
const IconMedal = (p) => <Icon {...p}><circle cx="12" cy="15" r="6"/><path d="M8 11L5 3h4l3 6M16 11l3-8h-4l-3 6"/></Icon>;
const IconSettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.2.6.8 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>;
const IconBell = (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/></Icon>;
const IconMessage = (p) => <Icon {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></Icon>;
const IconShare = (p) => <Icon {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></Icon>;
const IconFire = IconFlame;

Object.assign(window, {
  IconHome, IconDumbbell, IconTrendingUp, IconTrophy, IconUser,
  IconFlame, IconFire, IconCalendar, IconClock, IconChevronRight, IconChevronDown, IconChevronLeft,
  IconPlus, IconCheck, IconX, IconPlay, IconPause, IconTarget,
  IconArrowUp, IconArrowDown, IconMore, IconLock, IconBolt,
  IconScale, IconRuler, IconDroplet, IconMedal, IconSettings, IconBell, IconMessage, IconShare,
});
