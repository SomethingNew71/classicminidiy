export interface PageDescription {
  route: string;
  title: string;
  description: string;
  functions: string[];
  category: 'home' | 'technical' | 'archive' | 'admin' | 'utility';
  starterQuestions: string[];
}

export const PAGE_DESCRIPTIONS: PageDescription[] = [
  // Home & Main Pages
  {
    route: '/',
    title: 'Home - Classic Mini DIY',
    description: 'The main landing page showcasing the Classic Mini DIY mission, channel statistics, recent videos, and information about supporting the channel through Patreon.',
    functions: [
      'Display channel mission and goals',
      'Show recent YouTube videos',
      'Present Patreon membership benefits',
      'Provide channel statistics and metrics',
      'Link to technical toolbox and other sections'
    ],
    category: 'home',
    starterQuestions: [
      'What is Classic Mini DIY and what does this channel offer?',
      'How can I support the Classic Mini DIY channel?',
      'What are the benefits of becoming a Patreon member?',
      'Where can I find the latest Classic Mini DIY videos?'
    ]
  },
  {
    route: '/maps',
    title: 'Interactive Maps',
    description: 'Interactive mapping system for locating Classic Mini related businesses, services, and points of interest worldwide.',
    functions: [
      'Display interactive world map',
      'Show Mini-related businesses and services',
      'Filter locations by type and region',
      'Provide contact information for businesses'
    ],
    category: 'utility',
    starterQuestions: [
      'How can I find Classic Mini specialists near me?',
      'What types of Mini-related businesses are shown on the map?',
      'Can I add my Mini business to the map?',
      'Are there any Classic Mini clubs or events in my area?'
    ]
  },
  {
    route: '/privacy',
    title: 'Privacy Policy',
    description: 'Legal privacy policy document outlining data collection, usage, and user rights for the Classic Mini DIY website.',
    functions: [
      'Display privacy policy terms',
      'Explain data collection practices',
      'Outline user rights and protections',
      'Provide contact information for privacy concerns'
    ],
    category: 'utility',
    starterQuestions: [
      'What personal data does Classic Mini DIY collect?',
      'How is my data used and protected?',
      'Can I request deletion of my personal data?',
      'Who can I contact about privacy concerns?'
    ]
  },

  // Technical Toolbox Pages
  {
    route: '/technical',
    title: 'Technical Toolbox',
    description: 'Main hub for all technical tools, calculators, and decoders designed to help Classic Mini owners with maintenance, restoration, and technical specifications.',
    functions: [
      'Provide overview of available technical tools',
      'Link to chassis and engine decoders',
      'Access compression ratio calculator',
      'Navigate to torque specifications and other tools'
    ],
    category: 'technical',
    starterQuestions: [
      'What technical tools are available for Classic Mini owners?',
      'How do I decode my Mini\'s chassis number?',
      'Where can I find torque specifications for my Mini?',
      'What calculators are available for engine modifications?'
    ]
  },
  {
    route: '/technical/chassis-decoder',
    title: 'Chassis Number Decoder',
    description: 'Comprehensive tool for decoding Classic Mini chassis numbers from 1959 onwards, providing detailed information about manufacturing year, body type, engine, and assembly plant.',
    functions: [
      'Decode chassis numbers by year range',
      'Validate chassis number format',
      'Provide position-by-position breakdown',
      'Show manufacturing specifications and details'
    ],
    category: 'technical',
    starterQuestions: [
      'How do I decode my Classic Mini\'s chassis number?',
      'What information can I learn from my chassis number?',
      'My chassis number seems invalid - what could be wrong?',
      'What year range should I select for my Mini?'
    ]
  },
  {
    route: '/technical/engine-decoder',
    title: 'Engine Number Decoder',
    description: 'Tool for decoding Classic Mini engine numbers to identify engine type, specifications, and manufacturing details.',
    functions: [
      'Decode engine numbers and prefixes',
      'Identify engine specifications',
      'Provide engine manufacturing information',
      'Validate engine number formats'
    ],
    category: 'technical',
    starterQuestions: [
      'How do I decode my Mini\'s engine number?',
      'What engine do I have in my Classic Mini?',
      'Where can I find my engine number?',
      'What do the letters and numbers in my engine code mean?'
    ]
  },
  {
    route: '/technical/compression',
    title: 'Compression Ratio Calculator',
    description: 'Advanced calculator for determining compression ratios when modifying Classic Mini engines, including head skimming and piston changes.',
    functions: [
      'Calculate compression ratios',
      'Account for head skimming modifications',
      'Consider different piston types',
      'Provide recommendations for fuel requirements'
    ],
    category: 'technical',
    starterQuestions: [
      'How do I calculate my engine\'s compression ratio?',
      'What compression ratio should I aim for with my modifications?',
      'How does head skimming affect compression ratio?',
      'What fuel octane do I need for my compression ratio?'
    ]
  },
  {
    route: '/technical/torque',
    title: 'Torque Specifications',
    description: 'Comprehensive database of torque specifications for Classic Mini components, organized by system and component type.',
    functions: [
      'Provide torque specifications by component',
      'Search torque values by system',
      'Display proper tightening sequences',
      'Include special notes and warnings'
    ],
    category: 'technical',
    starterQuestions: [
      'What are the torque specifications for my Mini\'s head bolts?',
      'How tight should I torque the wheel nuts?',
      'What\'s the proper torque sequence for the cylinder head?',
      'Where can I find torque specs for suspension components?'
    ]
  },
  {
    route: '/technical/gearing',
    title: 'Gearing Calculator',
    description: 'Tool for calculating gear ratios, final drive ratios, and speed/RPM relationships for different Classic Mini transmission setups.',
    functions: [
      'Calculate gear ratios',
      'Determine final drive ratios',
      'Show speed vs RPM relationships',
      'Compare different gearbox configurations'
    ],
    category: 'technical',
    starterQuestions: [
      'What gear ratios does my Mini have?',
      'How do I calculate my final drive ratio?',
      'What RPM will I be doing at highway speeds?',
      'Should I change my differential ratio?'
    ]
  },
  {
    route: '/technical/needles',
    title: 'SU Carb Needle Calculator',
    description: 'Interactive tool for selecting the correct SU carburetor needles based on engine modifications and performance requirements.',
    functions: [
      'Recommend needle profiles',
      'Account for engine modifications',
      'Provide tuning guidance',
      'Display needle characteristics charts'
    ],
    category: 'technical',
    starterQuestions: [
      'What SU needle should I use for my modified engine?',
      'How do I choose the right carburetor needle?',
      'My engine is running rich/lean - what needle should I try?',
      'What\'s the difference between needle profiles?'
    ]
  },
  {
    route: '/technical/clearance',
    title: 'Valve Clearance Specifications',
    description: 'Reference guide for valve clearance specifications across different Classic Mini engine types and configurations.',
    functions: [
      'Provide valve clearance specifications',
      'Show adjustment procedures',
      'List specifications by engine type',
      'Include measurement guidelines'
    ],
    category: 'technical',
    starterQuestions: [
      'What are the valve clearances for my Mini engine?',
      'How do I adjust valve clearances?',
      'What clearances should I use for a performance engine?',
      'How often should I check valve clearances?'
    ]
  },
  {
    route: '/technical/parts',
    title: 'Parts Cross-Reference',
    description: 'Cross-reference tool for finding equivalent parts across different suppliers and part numbering systems.',
    functions: [
      'Cross-reference part numbers',
      'Find equivalent parts from different suppliers',
      'Provide part compatibility information',
      'Link to supplier websites'
    ],
    category: 'technical',
    starterQuestions: [
      'What\'s the equivalent part number for this component?',
      'Where can I find this specific Mini part?',
      'Are there alternative suppliers for this part?',
      'Is this part compatible with my Mini model?'
    ]
  },

  // Archive Pages
  {
    route: '/archive',
    title: 'Classic Mini Archives',
    description: 'Central hub for historical Classic Mini documents, manuals, registries, and preserved digital resources for enthusiasts and restorers.',
    functions: [
      'Provide access to historical documents',
      'Navigate to different archive categories',
      'Search archived materials',
      'Submit new archive materials'
    ],
    category: 'archive',
    starterQuestions: [
      'What historical Mini documents are available in the archives?',
      'How can I access Classic Mini manuals and brochures?',
      'Can I contribute documents to the archive?',
      'Where can I find my Mini\'s original specifications?'
    ]
  },
  {
    route: '/archive/engines',
    title: 'Engine Archive',
    description: 'Historical database of Classic Mini engines with specifications, production numbers, and technical details.',
    functions: [
      'Display engine specifications by type',
      'Show production numbers and dates',
      'Provide technical specifications',
      'Include historical context and notes'
    ],
    category: 'archive',
    starterQuestions: [
      'What engines were available in my year Mini?',
      'How many of my engine type were produced?',
      'What are the specifications of the Cooper S engine?',
      'When did BMC change engine designs?'
    ]
  },
  {
    route: '/archive/electrical',
    title: 'Electrical Systems Archive',
    description: 'Historical reference for Classic Mini electrical systems, wiring diagrams, and component specifications across different model years.',
    functions: [
      'Provide wiring diagrams by year',
      'Show electrical component specifications',
      'Display system evolution over time',
      'Include troubleshooting guides'
    ],
    category: 'archive',
    starterQuestions: [
      'Where can I find a wiring diagram for my Mini?',
      'What electrical changes were made in different years?',
      'How do I troubleshoot electrical problems?',
      'What\'s the correct voltage for my Mini\'s system?'
    ]
  },
  {
    route: '/archive/weights',
    title: 'Weight Specifications Archive',
    description: 'Historical database of Classic Mini weight specifications including curb weight, distribution, and load capacities by model and year.',
    functions: [
      'Display weight specifications by model',
      'Show weight distribution data',
      'Provide load capacity information',
      'Compare weights across different years'
    ],
    category: 'archive',
    starterQuestions: [
      'How much does my Classic Mini weigh?',
      'What\'s the weight distribution of my Mini?',
      'How much weight can my Mini carry?',
      'Did Mini weights change over the years?'
    ]
  },
  {
    route: '/archive/colors',
    title: 'Paint Colors Archive',
    description: 'Comprehensive database of original Classic Mini paint colors with codes, names, and availability by year and model.',
    functions: [
      'Browse colors by year and model',
      'Search colors by name or code',
      'View color samples and descriptions',
      'Submit new color information'
    ],
    category: 'archive',
    starterQuestions: [
      'What colors were available for my year Mini?',
      'What\'s the paint code for my Mini\'s color?',
      'Can I see examples of original Mini colors?',
      'What was the most popular Mini color?'
    ]
  },
  {
    route: '/archive/colors/contribute',
    title: 'Contribute Paint Colors',
    description: 'Form for submitting new paint color information to expand the Classic Mini color database.',
    functions: [
      'Submit new color information',
      'Upload color photos and samples',
      'Provide color code verification',
      'Add historical context for colors'
    ],
    category: 'archive',
    starterQuestions: [
      'How can I add a missing color to the database?',
      'What information do you need for color submissions?',
      'Can I upload photos of my Mini\'s original color?',
      'How do I verify my Mini\'s original paint code?'
    ]
  },
  {
    route: '/archive/manuals',
    title: 'Manuals Archive',
    description: 'Collection of original Classic Mini owner\'s manuals, workshop manuals, and technical publications.',
    functions: [
      'Access digitized manuals by year',
      'Download PDF versions',
      'Search manual contents',
      'Submit missing manuals'
    ],
    category: 'archive',
    starterQuestions: [
      'Where can I find the owner\'s manual for my Mini?',
      'Are workshop manuals available for download?',
      'What technical publications are in the archive?',
      'Can I contribute manuals I have?'
    ]
  },
  {
    route: '/archive/registry',
    title: 'Mini Registry',
    description: 'Database of registered Classic Minis with owner information, specifications, and historical records.',
    functions: [
      'Search registered Minis',
      'Register your Mini',
      'View Mini histories and specifications',
      'Connect with other owners'
    ],
    category: 'archive',
    starterQuestions: [
      'How do I register my Classic Mini?',
      'Can I find the history of my Mini?',
      'Are there other Minis like mine registered?',
      'How can I connect with other Mini owners?'
    ]
  },
  {
    route: '/archive/registry/pending',
    title: 'Pending Registry Entries',
    description: 'Review queue for Classic Mini registry submissions awaiting approval and verification.',
    functions: [
      'Review pending submissions',
      'Verify Mini information',
      'Approve or reject entries',
      'Manage registry database'
    ],
    category: 'archive',
    starterQuestions: [
      'How long does registry approval take?',
      'What information is needed for registry approval?',
      'Can I update my pending registry submission?',
      'Why might a registry submission be rejected?'
    ]
  },
  {
    route: '/archive/wheels',
    title: 'Wheels Archive',
    description: 'Comprehensive database of Classic Mini wheels including original equipment, aftermarket options, and specifications.',
    functions: [
      'Browse wheels by type and era',
      'View wheel specifications and fitment',
      'Submit new wheel information',
      'Compare wheel options'
    ],
    category: 'archive',
    starterQuestions: [
      'What wheels came originally on my Mini?',
      'What aftermarket wheels fit my Classic Mini?',
      'Can I see examples of different Mini wheel styles?',
      'How do I determine proper wheel offset and size?'
    ]
  },
  {
    route: '/archive/wheels/submit',
    title: 'Submit Wheel Information',
    description: 'Form for contributing new wheel information and photos to expand the wheels database.',
    functions: [
      'Submit wheel specifications',
      'Upload wheel photos',
      'Provide fitment information',
      'Add historical context'
    ],
    category: 'archive',
    starterQuestions: [
      'How can I add wheels to the database?',
      'What photos should I include with my submission?',
      'What specifications are needed for wheel submissions?',
      'Can I submit rare or custom wheels?'
    ]
  },
  {
    route: '/archive/carbs',
    title: 'Carburetors Archive',
    description: 'Historical database of Classic Mini carburetors including SU, Weber, and other carburetor types with specifications and tuning information.',
    functions: [
      'Browse carburetors by type and application',
      'View carburetor specifications',
      'Access tuning information',
      'Compare different carburetor setups'
    ],
    category: 'archive',
    starterQuestions: [
      'What carburetors were used on my Mini?',
      'How do I identify my SU carburetor type?',
      'What\'s the difference between single and twin carb setups?',
      'Can I upgrade to Weber carburetors?'
    ]
  },
  {
    route: '/archive/adverts',
    title: 'Classic Advertisements',
    description: 'Collection of historical Classic Mini advertisements, brochures, and marketing materials from the BMC/British Leyland era.',
    functions: [
      'Browse historical advertisements',
      'View marketing materials by year',
      'Search ads by model or campaign',
      'Submit historical advertising materials'
    ],
    category: 'archive',
    starterQuestions: [
      'Can I see original Mini advertisements?',
      'What marketing campaigns featured the Mini?',
      'Are there brochures for my year Mini?',
      'How was the Mini marketed when it was new?'
    ]
  },

  // Admin Pages
  {
    route: '/admin/wheels/review',
    title: 'Wheels Review Admin',
    description: 'Administrative interface for reviewing and approving wheel submissions to the wheels database.',
    functions: [
      'Review pending wheel submissions',
      'Approve or reject wheel entries',
      'Edit wheel information',
      'Manage wheel database'
    ],
    category: 'admin',
    starterQuestions: [
      'How do I review wheel submissions?',
      'What criteria should I use for approval?',
      'Can I edit submitted wheel information?',
      'How do I manage duplicate wheel entries?'
    ]
  },
  {
    route: '/admin/registry/review',
    title: 'Registry Review Admin',
    description: 'Administrative interface for reviewing and managing Classic Mini registry submissions.',
    functions: [
      'Review registry submissions',
      'Verify Mini information',
      'Approve or reject entries',
      'Manage registry database'
    ],
    category: 'admin',
    starterQuestions: [
      'How do I verify registry submissions?',
      'What documentation is required for approval?',
      'Can I contact submitters for more information?',
      'How do I handle duplicate registry entries?'
    ]
  }
];

// Helper functions for working with page descriptions
export function getPageDescription(route: string): PageDescription | undefined {
  return PAGE_DESCRIPTIONS.find(page => page.route === route);
}

export function getPagesByCategory(category: PageDescription['category']): PageDescription[] {
  return PAGE_DESCRIPTIONS.filter(page => page.category === category);
}

export function getStarterQuestions(route: string): string[] {
  const page = getPageDescription(route);
  return page?.starterQuestions || [];
}

export function getAllStarterQuestions(): { route: string; questions: string[] }[] {
  return PAGE_DESCRIPTIONS.map(page => ({
    route: page.route,
    questions: page.starterQuestions
  }));
}

// Categories for filtering and organization
export const PAGE_CATEGORIES = {
  HOME: 'home' as const,
  TECHNICAL: 'technical' as const,
  ARCHIVE: 'archive' as const,
  ADMIN: 'admin' as const,
  UTILITY: 'utility' as const,
} as const;

export type PageCategory = typeof PAGE_CATEGORIES[keyof typeof PAGE_CATEGORIES];
