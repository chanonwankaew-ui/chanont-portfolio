export type SectionId =
  | 'home'
  | 'capabilities'
  | 'evidence'
  | 'timeline'
  | 'credentials'
  | 'terminal';

export const navigation: ReadonlyArray<{ id: Exclude<SectionId, 'home'>; label: string }> = [
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'evidence', label: 'Evidence Cases' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'terminal', label: 'AI Terminal' },
];

export const capabilities = [
  {
    number: '01',
    title: 'RAN & RF',
    subtitle: 'Planning · optimization · performance',
    details: ['3G / 4G LTE / 5G NR', 'Drive-test and layer analysis', 'Coverage, capacity and handover tuning'],
  },
  {
    number: '02',
    title: 'Network data',
    subtitle: 'From telemetry to usable insight',
    details: ['Python, Pandas and NumPy', 'SQL, BigQuery and PostgreSQL', 'Power BI, Power Query and Excel automation'],
  },
  {
    number: '03',
    title: 'Customer experience',
    subtitle: 'Connect radio signals to service quality',
    details: ['RAN KPI and customer KQI correlation', 'Root-cause analysis for service degradation', 'CEM-focused prioritization'],
  },
  {
    number: '04',
    title: 'Applied AI',
    subtitle: 'Practical tools for telecom workflows',
    details: ['LLM and RAG document retrieval', 'Time-series anomaly detection', 'FastAPI and Docker'],
  },
] as const;

export const evidenceCases = [
  {
    id: 'drive-test',
    category: 'Drive test',
    title: 'BMA Drive-Test Intelligence',
    context: 'Drive-test and network data across the Bangkok Metropolitan Area.',
    action: 'Connect RF measurements with service behavior and customer-impact signals.',
    value: 'Prioritize field recommendations by their likely effect on customer experience.',
    metrics: [
      { label: 'RRC success rate', value: '99.2%' },
      { label: 'Drop rate', value: '−18%' },
      { label: 'Downlink throughput', value: '+24%' },
    ],
  },
  {
    id: 'worst-cell',
    category: 'Optimization',
    title: 'Top 40 Worst-Cell Control',
    context: 'Recurring cell-level performance issues in a BMA 4G network.',
    action: 'Review KPIs, drive-test evidence, parameter configuration and physical factors.',
    value: 'Create a remediation loop focused on cells with the greatest service risk.',
    metrics: [
      { label: 'RRC success rate', value: '98.7%' },
      { label: 'Drop rate', value: '−22%' },
      { label: 'Issue resolution', value: '+31%' },
    ],
  },
  {
    id: 'volte',
    category: 'KPI control',
    title: 'Accessibility & VoLTE Performance',
    context: 'Primary service indicators include RRC, E-RAB and VoLTE drop rate.',
    action: 'Correlate counter data with RF conditions and optimization options.',
    value: 'Make KPI changes easier to explain and use in operational decisions.',
    metrics: [
      { label: 'RRC success rate', value: '99.4%' },
      { label: 'VoLTE drop rate', value: '−16%' },
      { label: 'E-RAB setup', value: '+8%' },
    ],
  },
  {
    id: 'consolidation',
    category: 'Network planning',
    title: 'Multi-Generation Network Consolidation',
    context: 'RF and service quality considerations across True and DTAC networks.',
    action: 'Apply 2G–5G knowledge to planning, validation and optimization.',
    value: 'Evaluate customer experience across technologies, not as isolated KPIs.',
    metrics: [
      { label: 'Handover success', value: '98.9%' },
      { label: 'Drop rate', value: '−14%' },
      { label: 'Coverage continuity', value: '+12%' },
    ],
  },
  {
    id: 'ibc',
    category: 'Operations',
    title: 'In-Building Coverage Support',
    context: 'Indoor coverage requires clear OSS visibility and coordinated response.',
    action: 'Support U2000 and iManager alarm and performance investigations.',
    value: 'Connect OSS evidence with practical responses to indoor network issues.',
    metrics: [
      { label: 'Alarm triage time', value: '−20%' },
      { label: 'Issue follow-up', value: '+18%' },
      { label: 'Service availability', value: '99.5%' },
    ],
  },
] as const;

export const careerTimeline = [
  {
    marker: '10+ years',
    title: 'Telecom engineering foundation',
    description: 'Hands-on RAN/RF planning and optimization experience across 3G, 4G LTE and 5G NR.',
  },
  {
    marker: 'Network delivery',
    title: 'Regional performance and readiness',
    description: 'BMA cluster delivery, drive-test analysis, VIP event readiness and multi-generation network work.',
  },
  {
    marker: 'Evidence-led',
    title: 'Analytics and customer experience',
    description: 'Turn network counters and RF evidence into clear priorities for service quality and CEM.',
  },
  {
    marker: '340+ days',
    title: 'Applied AI research',
    description: 'Continuous AI and data-science study focused on telecom analytics, retrieval and automation.',
  },
] as const;

export const credentials = [
  { title: 'Python for Data Science', issuer: 'Chulalongkorn University · Chula MOOC', date: 'May 2026' },
  { title: 'Foundation AI (Theory)', issuer: 'AIAT · Super AI Engineer Season 6', date: 'April 2026' },
  { title: 'AI Practitioner', issuer: 'AIAT · Super AI Engineer Season 6', date: 'April 2026' },
  { title: 'AI Online Hackathon (Practice)', issuer: 'AIAT · From Data to Insight', date: 'March 2026' },
  { title: 'AI Ready ASEAN · 15 Modules', issuer: 'ASEAN Foundation · Google.org', date: 'March 2026' },
  { title: 'Advanced Reports with Power BI', issuer: 'FutureSkill', date: 'February 2025' },
  { title: 'Data Storytelling', issuer: 'FutureSkill', date: 'January 2025' },
  { title: 'Data Analytics for Business', issuer: 'FutureSkill', date: 'January 2025' },
  { title: 'Excel for Business Professional', issuer: 'FutureSkill', date: 'January 2025' },
  { title: 'Power Query for Power BI', issuer: 'FutureSkill', date: 'December 2024' },
  { title: 'Excel Advance: Macro & VBA Automation', issuer: 'FutureSkill', date: 'December 2024' },
] as const;

export const profile = {
  name: 'Chanont Wankaew',
  role: 'Senior Telecom Data Analyst & AI Solutions Specialist',
  focus: 'CEM · RAN/RF · Applied AI',
  email: 'chanon.wankaew@icloud.com',
  phone: '+66 98-285-2659',
  location: 'Sattahip, Chonburi / Bangkok, Thailand',
  linkedin: 'https://www.linkedin.com/in/chanont-wankaew',
} as const;
