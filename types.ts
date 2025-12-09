export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  codeSnippet: string;
}

export interface NavItem {
  label: string;
  href: string;
}
