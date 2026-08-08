// Central content/config for the HillFord site.
// Editing content here updates nav, home, and service pages consistently.

export const site = {
  name: 'HillFord Partners',
  legalName: 'HillFord Partners LLP',
  domain: 'hillfordpartners.com',
  url: 'https://hillfordpartners.com',
  tagline: 'Outsourced accounting, bookkeeping & CA services for firms and businesses worldwide.',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'Contact@hillfordpartners.com',
  calendlyUrl: import.meta.env.PUBLIC_CALENDLY_URL ?? '#',
  formspreeId: import.meta.env.PUBLIC_FORMSPREE_ID ?? 'PLACEHOLDER',
  location: 'Dubai, UAE & India · Serving clients globally',
  responseTime: 'We respond within 1 business day.',
};

export interface Service {
  slug: string;
  title: string;
  /** Short punchy line shown under the title on the service detail page. */
  tagline: string;
  summary: string;
  /** Full overview paragraphs for the service detail page. */
  description: string[];
  included: string[];
  whoFor: string;
}

export const services: Service[] = [
  {
    slug: 'accounting',
    title: 'Accounting',
    tagline: 'Transforming Financial Data into Strategic Business Insight.',
    summary:
      'Reliable financial information, meaningful insights and comprehensive reporting to support growth and long-term success.',
    description: [
      'Accurate accounting is essential for understanding your business performance, meeting regulatory obligations, and making informed strategic decisions. Our accounting services provide businesses with reliable financial information, meaningful insights, and comprehensive reporting to support growth and long-term success.',
      'We work closely with management teams to transform financial data into actionable intelligence, helping businesses improve profitability, manage risks, and maintain compliance with applicable accounting and tax regulations.',
      'With a focus on accuracy, transparency, and business value, our accounting professionals provide the financial insight needed to support sound decision-making and sustainable growth.',
    ],
    included: [
      'Preparation of financial statements and management reports',
      'Financial analysis and performance monitoring',
      'Budgeting and forecasting',
      'Cash flow planning and management reporting',
      'General ledger review and reconciliations',
      'Tax accounting and compliance support',
      'Financial reporting in accordance with applicable standards',
      'Accounting policy development and implementation',
      'Management information systems and reporting dashboards',
    ],
    whoFor: 'Businesses and firms needing accurate, standards-aligned financial reporting without an in-house team.',
  },
  {
    slug: 'bookkeeping',
    title: 'Bookkeeping',
    tagline: 'Accurate Records. Stronger Financial Foundations.',
    summary:
      'Accurate, organised day-to-day financial records that give you a clear, up-to-date picture of your business finances.',
    description: [
      'Effective bookkeeping forms the foundation of a strong financial management system. Our bookkeeping services ensure that your day-to-day financial transactions are accurately recorded, organized, and maintained, providing a clear and up-to-date picture of your business finances.',
      'By outsourcing your bookkeeping function to our experienced team, you can reduce administrative burden, improve efficiency, and focus on running and growing your business with confidence.',
      'Leveraging modern accounting technologies and industry best practices, we ensure your financial records remain accurate, organized, and readily available to support compliance and future business planning.',
    ],
    included: [
      'Recording daily financial transactions',
      'Accounts payable and accounts receivable management',
      'Bank and credit card reconciliations',
      'Maintenance of accounting records and ledgers',
      'Payroll recording and reconciliations',
      'Fixed asset register maintenance',
      'Month-end and year-end bookkeeping support',
      'Cloud accounting software setup and maintenance',
      'Accounting system migration and data management',
    ],
    whoFor: 'Firms and SMEs that want their day-to-day books handled accurately and on schedule.',
  },
  {
    slug: 'audit-support',
    title: 'Audit Support',
    tagline: 'Ensuring Audit Readiness with Confidence and Compliance.',
    summary:
      'Professional, reliable and secure support across the entire audit lifecycle — audit readiness, compliance and high-quality financial reporting.',
    description: [
      'Our Audit Support Services provide professional, reliable, and secure assistance across the entire audit lifecycle. Backed by strong Big 4 experience and deep technical expertise, our team supports organizations in achieving audit readiness, regulatory compliance, and high-quality financial reporting with precision and efficiency.',
      'We operate with a strong focus on professionalism, confidentiality, and robust data security, ensuring that all sensitive financial information is handled with the highest level of protection and integrity.',
      'Our objective is to help organizations streamline audit processes, strengthen financial controls, and ensure successful audit outcomes through expert-led, secure, and professional support.',
    ],
    included: [
      'Audit readiness support and end-to-end audit preparation for statutory and internal audits',
      'Preparation and review of financial statements and supporting schedules in line with applicable accounting standards',
      'Evaluation of internal controls, governance structures, and risk management frameworks',
      'Review and enhancement of accounting policies and financial reporting processes',
      'Secure handling, organization, and validation of financial data and audit documentation',
      'Coordination with external auditors for smooth, timely, and efficient audit execution',
      'Assistance in addressing audit queries and resolving findings effectively',
      'Support for statutory, regulatory, and compliance requirements',
      'Post-audit review and implementation support for audit recommendations',
      'Advisory support on complex accounting and audit-related matters',
    ],
    whoFor: 'CPA/CA firms and businesses preparing for, or working through, an external audit.',
  },
  {
    slug: 'business-advisory',
    title: 'Business Advisory',
    tagline: 'Strategic Advice That Drives Sustainable Growth.',
    summary: 'Strategic guidance that enhances performance, strengthens financial management and supports informed decision-making.',
    description: [
      'Our Business Advisory Services help organizations navigate challenges, identify opportunities, and achieve long-term growth. We work closely with business owners, management teams, and stakeholders to provide strategic guidance that enhances performance, strengthens financial management, and supports informed decision-making.',
      'By combining financial expertise with practical business insight, we deliver actionable recommendations that drive value, improve profitability, and support sustainable success.',
    ],
    included: [
      'Financial due diligence',
      'Forensic accounting',
      'Business performance reviews',
      'Interim CFO support',
      'Restructuring',
      'Risk assessments',
      'Transaction advisory',
      'Strategic planning',
    ],
    whoFor: 'Growing businesses and firms needing senior financial insight on demand.',
  },
  {
    slug: 'payroll',
    title: 'Payroll',
    tagline: 'Accurate Payroll. Timely Compliance. Complete Confidence.',
    summary: 'End-to-end payroll administration — accurate, on time and fully compliant.',
    description: [
      'Managing payroll accurately and efficiently is essential for employee satisfaction, compliance, and operational effectiveness. Our Payroll Services provide end-to-end payroll administration, ensuring employees are paid correctly and on time while meeting all applicable regulatory requirements.',
      'Through efficient processes and robust payroll systems, we help businesses reduce administrative complexity, maintain confidentiality, and ensure payroll accuracy and compliance.',
    ],
    included: [
      'Salary processing',
      'Payroll calculations',
      'Allowances and deductions',
      'Statutory contributions',
      'Payroll reconciliations',
      'Reporting',
    ],
    whoFor: 'Employers wanting reliable, confidential payroll handled end to end.',
  },
  {
    slug: 'invoicing',
    title: 'Invoicing',
    tagline: 'Streamlining Billing to Strengthen Cash Flow.',
    summary: 'Streamlined billing that improves cash flow visibility and collection efficiency.',
    description: [
      'Effective invoicing plays a vital role in maintaining healthy cash flow and improving collection efficiency. Our Invoicing Services streamline the billing process by ensuring invoices are prepared, issued, and monitored accurately and on time.',
      'By implementing structured invoicing procedures and efficient workflows, we help businesses enhance cash flow visibility, reduce outstanding receivables, and strengthen financial control.',
    ],
    included: [
      'Invoice generation',
      'Billing administration',
      'Payment tracking',
      'Accounts receivable monitoring',
      'Reconciliations',
      'Reporting',
    ],
    whoFor: 'Businesses that want faster, cleaner billing and healthier cash flow.',
  },
  {
    slug: 'software-solutions',
    title: 'Accounting Software Solutions',
    tagline: 'Smart Accounting Technology for Smarter Businesses.',
    summary: 'Select, implement and get the most from the accounting systems that support your business.',
    description: [
      'Modern accounting technology can significantly improve efficiency, accuracy, and financial visibility. Our Accounting Software Solutions help businesses select, implement, optimize, and manage accounting systems that support their operational and financial objectives.',
      'Whether implementing a new platform or upgrading an existing system, we ensure a smooth transition, data integrity, and optimal system performance. By leveraging the right technology, businesses can streamline financial processes, enhance reporting capabilities, and make better-informed decisions.',
    ],
    included: [
      'Software selection',
      'System setup and customisation',
      'Data migration',
      'Process automation',
      'Integrations',
      'User training',
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
    designation: 'Chartered Accountant',
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
    bio: 'Chartered Accountant with expertise in audit, financial reporting, taxation and compliance, including EY experience. Neethu ensures engagements meet every regulatory expectation.',
    initials: 'NJ',
  },
];

export const valuePillars = [
  {
    title: 'Accuracy & Compliance',
    body: 'Work aligned with IFRS and ISA standards, reviewed for precision at every step.',
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

// Placeholder partner platforms — TODO: confirm supported tools with client.
export const softwarePartners = ['QuickBooks', 'Xero', 'Sage', 'Zoho Books', 'NetSuite', 'FreshBooks'];
