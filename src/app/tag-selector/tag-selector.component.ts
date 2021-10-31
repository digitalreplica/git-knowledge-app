import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTable,MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { KnowledgeService, NoteDetails } from '../knowledge.service';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit {
  selectableChip = true;
  removableChip = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  selectedTags: string[] = [];
  allTags: string[] = [];
  //taggedNotes: string[] = [];
  taggedNotesDetails: NoteDetails[] = [];
  displayedColumns: string[] = ['path', 'size', 'repo', 'html_url'];
  dataSource = new MatTableDataSource(this.taggedNotesDetails);

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private knowledgeService: KnowledgeService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    this.allTags = this.knowledgeService.getTags();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  clear() {
    this.selectedTags = []
    //this.taggedNotes = []
    this.taggedNotesDetails = []
    this.dataSource.data = this.taggedNotesDetails
    //this.table.renderRows();

    // Clear the input value
    this.tagCtrl.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag if in list
    if (value) {
      if (this.allTags.indexOf(value) >= 0) {
        this.selectedTags.push(value);
        //this.taggedNotes = this.knowledgeService.getNotes(this.selectedTags);
        this.taggedNotesDetails = this.knowledgeService.getNotesDetails(this.selectedTags);
        this.dataSource.data = this.taggedNotesDetails
        //this.table.renderRows();
      }
    }

    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      //this.taggedNotes = this.knowledgeService.getNotes(this.selectedTags);
      this.taggedNotesDetails = this.knowledgeService.getNotesDetails(this.selectedTags);
      this.dataSource.data = this.taggedNotesDetails;
      //this.table.renderRows();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    //this.taggedNotes = this.knowledgeService.getNotes(this.selectedTags);
    this.taggedNotesDetails = this.knowledgeService.getNotesDetails(this.selectedTags);
    this.dataSource.data = this.taggedNotesDetails
    //this.table.renderRows();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
