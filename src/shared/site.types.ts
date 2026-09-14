export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

export interface BreadcrumbItem {
  readonly label: string;
  readonly href: string;
}

export interface ToolItem {
  readonly slug: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly category: 'academics' | 'study' | 'general' | 'developer';
  readonly path: string;
  readonly iconName: string;
  readonly isAvailable: boolean;
  readonly badge?: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}
