import { Injectable } from '@angular/core';
import KnowledgeData from '../assets/knowledge.json';

export interface TokenMap {
  [index: string]: string[];
}

export interface NoteDetails {
  path: string;
  repo: string;
  size: number;
  last_modified: string;
  html_url: string;
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

  getNotes(tagNames: string[]): string[] {
    let notes: string[] = tokens_data[tagNames[0]]
    for(var i = 1;i<tagNames.length;i++) {
      notes = notes.filter(function(noteName){
        return (tokens_data[tagNames[i]].indexOf(noteName) >= 0);
      })
    }
    return notes
  }

  getNotesDetails(tagNames: string[]): NoteDetails[] {
    let notes: string[] = this.getNotes(tagNames);
    // Create an array the same size to hold notes details
    let notesDetails: NoteDetails[] = new Array(notes.length)

    // Look up details and add
    for(var i = 0;i<notes.length;i++) {
      notesDetails[i] = notes_data[notes[i]]
    }
    return notesDetails
  }
}
