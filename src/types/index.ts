export type Industry = {
  name: string;
  subIndustries: string[];
};

export type ProjectFocus = 'problem' | 'market';

export type ProjectDocument = {
  introduction: string;
  abstract: string;
  tableOfContents: string[];
  overview: string;
  problemStatement?: string;
  marketAnalysis?: string;
  solution: string;
  conclusion: string;
};