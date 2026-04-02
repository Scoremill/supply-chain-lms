export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface QuizInput {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

export interface CheckpointQuestion {
  questionText: string;
  options: { label: string; text: string }[];
  correctLabel: string;
}

export interface EnhancedContent {
  html: string;
  toc: TocEntry[];
  enhanced: boolean;
}
