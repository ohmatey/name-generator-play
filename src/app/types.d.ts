export type DictionaryType = 'custom' | 'adjectives' | 'colors' | 'items' | 'numbers';

export type Dictionary = {
  words: string[];
  type: DictionaryType;
};

export interface FormValues {
  addAdjectives: boolean;
  separator: string;
  suffix: string;
  prefix: string;
  numberOfNames: number;
  names: string[];
  dictionaries: Dictionary[];
}