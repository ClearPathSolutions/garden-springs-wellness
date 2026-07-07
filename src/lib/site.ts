// Central site configuration: contact info, brand, and navigation model.

export const site = {
  name: "Garden Springs Wellness",
  shortName: "Garden Springs",
  tagline: "Reconnect, Restore, & Renew",
  description:
    "Premier mental health treatment in Englewood, New Jersey. Partial Care (PHP), Intensive Outpatient (IOP), and Outpatient programs delivered with compassionate, evidence-based, whole-person care.",
  url: "https://gardenspringswellness.com",
  locale: "en_US",

  phone: {
    // Primary admissions / call-to-action line (used site-wide)
    primary: "(877) 537-7905",
    primaryHref: "tel:+18775377905",
    // Main business line
    office: "(866) 413-8877",
    officeHref: "tel:+18664138877",
  },
  email: "info@gardenspringswellness.com",
  address: {
    street: "285 Grand Avenue, Suite B",
    city: "Englewood",
    state: "NJ",
    zip: "07631",
    full: "285 Grand Avenue, Suite B, Englewood, NJ 07631",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=285+Grand+Avenue+Englewood+NJ+07631",
  },
  hours: {
    weekdays: "Mon–Fri: 8:00 AM – 10:00 PM",
    weekends: "Weekends: 10:00 AM – 4:00 PM",
    note: "Admissions inquiries welcome anytime",
  },

  social: {
    facebook: "https://www.facebook.com/p/Garden-Springs-Wellness-Center-61569918846961/",
    instagram: "https://www.instagram.com/gardenspringswellness",
    linkedin: "https://www.linkedin.com/company/garden-springs-wellness-center/",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// Curated primary navigation (mirrors the original site's information architecture).
export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about-us",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Meet Beth Rivera", href: "/about-us/beth-rivera" },
      { label: "Tour Our Facility", href: "/tour" },
    ],
  },
  {
    label: "Treatment",
    href: "/treatment",
    children: [
      { label: "All Programs", href: "/treatment" },
      { label: "Partial Hospitalization (PHP)", href: "/treatment/partial-hospitalization" },
      { label: "Intensive Outpatient (IOP)", href: "/treatment/intensive-outpatient-iop" },
      { label: "Outpatient Program", href: "/treatment/outpatient-program" },
      { label: "Psychiatry Services", href: "/treatment/psychiatry-services" },
      { label: "Aftercare Coordination", href: "/treatment/aftercare-coordination" },
      { label: "Inpatient Mental Health", href: "/treatment/inpatient-mental-health" },
    ],
  },
  {
    label: "Conditions",
    href: "/conditions",
    children: [
      { label: "All Conditions", href: "/conditions" },
      { label: "Depression", href: "/conditions/depression" },
      { label: "Anxiety", href: "/conditions/anxiety-treatment" },
      { label: "Bipolar Disorder", href: "/conditions/bipolar-disorder" },
      { label: "PTSD & Trauma", href: "/conditions/ptsd-trauma" },
      { label: "OCD", href: "/conditions/ocd" },
      { label: "Panic Disorder", href: "/conditions/panic-disorder" },
      { label: "Grief & Loss", href: "/conditions/grief-and-loss" },
    ],
  },
  {
    label: "Therapies",
    href: "/therapy",
    children: [
      { label: "All Therapies", href: "/therapy" },
      { label: "CBT", href: "/therapy/cbt" },
      { label: "DBT", href: "/therapy/dbt" },
      { label: "EMDR", href: "/therapy/emdr-therapy" },
      { label: "Trauma Therapy", href: "/therapy/trauma-therapy" },
      { label: "Family Therapy", href: "/therapy/family-therapy" },
      { label: "Group Therapy", href: "/therapy/group-therapy" },
      { label: "Holistic Therapy", href: "/therapy/holistic-therapy" },
      { label: "Mindfulness", href: "/therapy/mindfulness-based-therapy" },
      { label: "Art Therapy", href: "/therapy/art-therapy" },
    ],
  },
  {
    label: "Who We Help",
    href: "/who-we-help",
    children: [
      { label: "Overview", href: "/who-we-help" },
      { label: "Executives", href: "/who-we-help/executives" },
      { label: "Veterans", href: "/who-we-help/veterans" },
      { label: "Military Members", href: "/who-we-help/military-members" },
      { label: "First Responders", href: "/who-we-help/first-responders" },
    ],
  },
  {
    label: "Areas We Serve",
    href: "/areas-we-serve",
    children: [
      { label: "Overview", href: "/areas-we-serve" },
      { label: "Fort Lee, NJ", href: "/areas-we-serve/fort-lee-nj" },
      { label: "Hackensack, NJ", href: "/areas-we-serve/hackensack-nj" },
      { label: "Teaneck, NJ", href: "/areas-we-serve/teaneck-nj" },
      { label: "Bogota, NJ", href: "/areas-we-serve/bogota-nj" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];
