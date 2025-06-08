export type Skill = {
  name: string
}

export type Group = {
  name: string
  type: "hard" | "soft"
  description?: string
  skills: Skill[]
}

export type Matrix = {
  id?: number
  title?: string
  groups: Group[]
}

export type MatrixSummary = {
  id: number
  title: string
  createdAt: string
}

export type Competency = {
  name: string;
  score: number;
  answers?: {
    question: string;
    text?: string;
    audioUrl?: string;
  }[];
};

export type Direction = {
  name: string;
  competencies: Competency[];
  average?: number;
};

export type Employee = {
  user_id: string;
  directions: Direction[];
};
