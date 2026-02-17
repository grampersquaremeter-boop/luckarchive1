
export interface UserData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  focusArea: 'career' | 'love' | 'wealth';
}

export interface SajuAnalysis {
  archetype: string;
  elements: {
    fire: number;
    earth: number;
    metal: number;
    water: number;
    wood: number;
  };
  competencies: {
    strategy: number;
    leadership: number;
    innovation: number;
    outcome: number;
    interpersonal: number;
    communication: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
