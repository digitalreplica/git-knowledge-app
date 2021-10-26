import { Component, OnInit, Input } from '@angular/core';
import { KnowledgeService } from '../knowledge.service';

export interface NoteDetails {
  path: string;
  size: number;
  html_url: string
}

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input() noteName?: string;
  noteDetails: NoteDetails = {
    path: "",
    size: 0,
    html_url: ""
  }

  constructor(private knowledgeService: KnowledgeService) { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.getNoteDetails();
  }
  getNoteDetails() {
    if (this.noteName) {
      this.noteDetails = this.knowledgeService.getNote(this.noteName);
    }
  }
}
