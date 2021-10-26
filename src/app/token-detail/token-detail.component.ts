import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-token-detail',
  templateUrl: './token-detail.component.html',
  styleUrls: ['./token-detail.component.css']
})
export class TokenDetailComponent implements OnInit {
  @Input() tokenName?: string[];
  @Output() selectNoteEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectNote(value: string) {
    console.log("emitting selected note " + value)
    this.selectNoteEvent.emit(value);
  }
}
