import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from '../knowledge.service';
export interface TokenMap {
  [index: string]: string[];
}

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  tokens: TokenMap = {};

  constructor(private knowledgeService: KnowledgeService) {
    console.log("Hello")
  }

  ngOnInit(): void {
    this.getTokens();
  }

  getTokens(): void {
    this.tokens = this.knowledgeService.getTokens();
  }

}
