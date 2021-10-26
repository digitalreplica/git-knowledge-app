import { Injectable } from '@angular/core';
import KnowledgeData from '../assets/knowledge.json';

export interface TokenMap {
  [index: string]: string[];
}

export interface NoteDetails {
  path: string;
  size: number;
  html_url: string
}

export interface NoteMap {
  [index: string]: NoteDetails;
}

let tokens_data: TokenMap = KnowledgeData.tokens
let notes_data: NoteMap = KnowledgeData.files

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  //tokens: string[] = tokens_data
  constructor() { }

  getTokens() {
    return tokens_data;
  }

  getNote(noteName: string): NoteDetails {
    return notes_data[noteName]
  }
}
