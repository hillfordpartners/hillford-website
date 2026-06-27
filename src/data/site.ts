// Central content/config for the HillFord site.
// Editing content here updates nav, home, and service pages consistently.

export const site = {
  name: 'HillFord Partners',
  legalName: 'HillFord Partners LLP',
  domain: 'hillfordpartners.com',
  url: 'https://hillfordpartners.com',
  tagline: 'Outsourced accounting, bookkeeping & CA services for firms and businesses worldwide.',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'hello@hillfordpartners.com',
  calendlyUrl: import.meta.env.PUBLIC_CALENDLY_URL ?? '#',
  formspreeId: import.meta.env.PUBLIC_FORMSPREE_ID ?? 'PLACEHOLDER',
  location: 'India · Serving clients globally',
  responseTime: 'We respond within 1 business day.',
};

export interface Service {
  slug: string;
  title: string;
  summary: string;
  included: string[];
  whoFor: string;
}

export const services: Service[] = [
  {
    slug: 'accounting',
    title: 'Accounting',
    summary: 'Financial statements, management reporting and the numbers leadership relies on.',
    included: [
      'Financial statements & management reports',
      'Performance monitoring & analysis',
      'Budgeting & forecasting',
      'Cash-flow planning',
      'General ledger review & reconciliations',
      'Tax accounting support',
      'Reporting to applicable standards',
      'Accounting policy development',
      'MIS dashboards',
    ],
    whoFor: 'Businesses and firms needing accurate, standards-aligned financial reporting without an in-house team.',
  },
  {
    slug: 'bookkeeping',
    title: 'Bookkeeping',
    summary: 'Clean, current books — every transaction recorded, reconciled and ready.',
    included: [
      'Daily transaction recording',
      'Accounts payable & receivable management',
      'Bank & card reconciliations',
      'Ledger maintenance',
      'Payroll recording',
      'Fixed-asset register',
      'Month-end & year-end support',
      'Cloud-software setup',
      'System migration',
    ],
    whoFor: 'Firms and SMEs that want their day-to-day books handled accurately and on schedule.',
  },
  {
    slug: 'audit-support',
    title: 'Audit Support',
    summary: 'Audit-ready files, controls review and seamless coordination with your auditors.',
    included: [
      'Audit readiness preparation',
      'Financial-statement preparation & review',
      'Internal-controls evaluation',
      'Accounting policy review',
      'Secure data handling',
      'Auditor coordination',
      'Query resolution',
      'Post-audit implementation',
    ],
    whoFor: 'CPA/CA firms and businesses preparing for, or working through, an external audit.',
  },
  {
    slug: 'business-advisory',
    title: 'Business Advisory',
    summary: 'Strategic finance support — from due diligence to interim CFO leadership.',
    included: [
      'Due diligence',
      'Forensic accounting',
      'Performance reviews',
      'Interim CFO services',
      'Restructuring',
      'Risk assessment',
      'Transaction advisory',
      'Strategic planning',
    ],
    whoFor: 'Growing businesses and firms needing senior financial insight on demand.',
  },
  {
    slug: 'payroll',
    title: 'Payroll',
    summary: 'Accurate, compliant payroll processing your people can count on.',
    included: [
      'Salary processing',
      'Calculations',
      'Allowances & deductions',
      'Statutory contributions',
      'Reconciliations',
      'Reporting',
    ],
    whoFor: 'Employers wanting reliable, confidential payroll handled end to end.',
  },
  {
    slug: 'invoicing',
    title: 'Invoicing',
    summary: 'Billing, payment tracking and receivables — managed and reconciled.',
    included: [
      'Invoice generation',
      'Billing administration',
      'Payment tracking',
      'Accounts-receivable monitoring',
      'Reconciliations',
      'Reporting',
    ],
    whoFor: 'Businesses that want faster, cleaner billing and healthier cash flow.',
  },
  {
    slug: 'software-solutions',
    title: 'Accounting Software Solutions',
    summary: 'Choose, set up and get the most from your accounting platform.',
    included: [
      'Software selection',
      'Setup & customisation',
      'Data migration',
      'Automation',
      'Integrations',
      'Training',
      'Ongoing support',
    ],
    whoFor: 'Teams adopting or optimising cloud accounting tools such as QuickBooks, Xero or Sage.',
  },
];

export interface TeamMember {
  slug: string;
  name: string;
  designation: string;
  bio: string;
  initials: string;
}

export const team: TeamMember[] = [
  {
    slug: 'sandhra-tom',
    name: 'CA Sandhra Tom',
    designation: 'Chartered Accountant (ICAI)',
    bio: 'Chartered Accountant with deep expertise in audit, assurance and financial reporting, including Big Four experience. Sandhra leads engagements with a focus on technical accuracy and rigorous standards.',
    initials: 'ST',
  },
  {
    slug: 'jithin-jose',
    name: 'CA Jithin Jose',
    designation: 'Chartered Accountant',
    bio: 'Chartered Accountant specialising in strategic finance, corporate reporting, FP&A, treasury and advisory. Jithin helps clients turn financial data into clear decisions.',
    initials: 'JJ',
  },
  {
    slug: 'neethu-jose',
    name: 'CA Neethu Jose',
    designation: 'Chartered Accountant',
    bio: 'Chartered Accountant (qualified 2016) with expertise in audit, financial reporting, taxation and compliance, including EY experience. Neethu ensures engagements meet every regulatory expectation.',
    initials: 'NJ',
  },
];

export const valuePillars = [
  {
    title: 'Accuracy & Compliance',
    body: 'Work delivered to IFRS / ISA standards, reviewed for precision at every step.',
  },
  {
    title: 'Data Security & Confidentiality',
    body: 'Sensitive financial information handled with strict, secure protocols.',
  },
  {
    title: 'Cost Efficiency',
    body: 'A high-calibre finance function at a fraction of in-house cost.',
  },
  {
    title: 'Scalable Capacity',
    body: 'Flex your team up or down as workload and seasons demand.',
  },
];

// Placeholder figures — TODO: confirm with client before launch.
export const stats = [
  { value: 25, suffix: '+', label: 'Years Combined Experience' },
  { value: 8, suffix: '', label: 'Chartered Accountants' },
  { value: 50, suffix: '+', label: 'Industries Served' },
  { value: 1000, suffix: '+', label: 'Client Engagements' },
];

export const whyOutsource = [
  {
    title: 'Focus on growth',
    body: 'Hand off the finance back-office and free your team to serve clients and scale.',
  },
  {
    title: 'Senior expertise on tap',
    body: 'Access chartered accountants with Big Four and multinational pedigree.',
  },
  {
    title: 'Predictable, lower cost',
    body: 'Replace fixed overheads with flexible, transparent outsourced capacity.',
  },
  {
    title: 'Trusted data stewardship',
    body: 'Governance and confidentiality built into every engagement.',
  },
];

// Placeholder testimonials — TODO: replace with real client quotes.
export const testimonials = [
  {
    quote:
      'HillFord became a genuine extension of our practice — accurate, responsive and completely reliable through our busiest season.',
    author: 'Managing Partner',
    company: 'CPA Firm (placeholder)',
  },
  {
    quote:
      'Outsourcing our bookkeeping to HillFord gave us clean books and real-time clarity. We finally trust our numbers.',
    author: 'Finance Director',
    company: 'SME (placeholder)',
  },
];

// Placeholder partner platforms — TODO: confirm supported tools with client.
export const softwarePartners = ['QuickBooks', 'Xero', 'Sage', 'Zoho Books', 'NetSuite', 'FreshBooks'];
