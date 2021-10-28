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

export interface Tag {
  name: string,
  notes: string[],
  count: number
}

let tokens_data: TokenMap = KnowledgeData.tokens
let notes_data: NoteMap = KnowledgeData.files
let tags_data: Tag[] = KnowledgeData.tags

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

  getTags(): string[] {
    return Object.keys(tokens_data).sort()
  }

  getNotes(tagNames: string[]): Set<string> {
    let notes: string[] = tokens_data[tagNames[0]]
    for(var i = 1;i<tagNames.length;i++) {
      notes = notes.filter(function(noteName){
        return (tokens_data[tagNames[i]].indexOf(noteName) >= 0);
      })
    }
    return new Set(notes)
  }
}
