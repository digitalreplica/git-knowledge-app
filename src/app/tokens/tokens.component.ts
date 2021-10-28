import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { KnowledgeService } from '../knowledge.service';
export interface TokenMap {
  [index: string]: string[];
}
export interface NoteDetails {
  path: string;
  size: number;
  html_url: string
}

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  step = 0;
  tokens: TokenMap = {};
  noteName: string = "";


  constructor(private knowledgeService: KnowledgeService) {
    console.log("Hello")
  }

  ngOnInit(): void {
    this.getTokens();
  }

  getTokens(): void {
    this.tokens = this.knowledgeService.getTokens();
  }

  getTokenFor(tokenName: string): string[] {
    return this.tokens[tokenName]
  }

  selectToken(): void {
    this.nextStep()
  }

  selectNote(noteName: any): void {
    this.noteName = noteName;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
