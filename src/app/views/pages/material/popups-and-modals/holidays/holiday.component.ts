import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';





const basic = {
	beforeCodeTitle: 'Dialog Overview',
	htmlCode: `
		<h1 mat-dialog-title>Hi {{data.name}}</h1>
		<div mat-dialog-content>
		  <p>What's your favorite animal?</p>
		  <mat-form-field>
			<input matInput [(ngModel)]="data.animal">
		  </mat-form-field>
		</div>
		<div mat-dialog-actions>
		  <button mat-button (click)="onNoClick()">No Thanks</button>
		  <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
		</div>
`,
	tsCode: `
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';\n
/**
* @title Dialog Overview
*/
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  styleUrls: ['dialog-overview-example.css'],
})
export class DialogOverviewExample {\n
  animal: string;
  name: string;\n
  constructor(public dialog: MatDialog) {}\n
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });\n
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}\n
@Component({
  selector: 'dialog-overview-example-dialog',
  template: \`
    <h1 mat-dialog-title>Hi {{data.name}}</h1>
    <div mat-dialog-content>
      <p>What's your favorite animal?</p>
      <mat-form-field>
        <input matInput [(ngModel)]="data.animal">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
    </div>\`
})
export class DialogOverviewExampleDialog {\n
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }\n
  onNoClick(): void {
    this.dialogRef.close();
  }\n
}
`,
	cssCode: ``,
	viewCode: ``,
	isCodeVisible: false,
	isExampleExpanded: true
};

const injecting = {
	beforeCodeTitle: 'Injecting data when opening a dialog',
	htmlCode: '<button mat-button (click)="openDialog()">Open dialog</button>',
	tsCode: `
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';\n
/**
* @title Injecting data when opening a dialog
*/
@Component({
  selector: 'dialog-data-example',
  templateUrl: 'dialog-data-example.html',
  styleUrls: ['dialog-data-example.css']
})
export class DialogDataExample {
  constructor(public dialog: MatDialog) {}\n
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
     }
    });
  }
}\n
@Component({
  selector: 'dialog-data-example-dialog',
  template: \`
    <h1 mat-dialog-title>Favorite Animal</h1>
    <div mat-dialog-content>
      My favorite animal is:
      <ul>
        <li>
          <span *ngIf="data.animal === 'panda'">&#10003;</span> Panda
        </li>
        <li>
          <span *ngIf="data.animal === 'unicorn'">&#10003;</span> Unicorn
        </li>
        <li>
          <span *ngIf="data.animal === 'lion'">&#10003;</span> Lion
        </li>
      </ul>
    </div>
	\`,
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
`,
	cssCode: ``,
	viewCode: ``,
	isCodeVisible: false,
	isExampleExpanded: true
};


const header = {
	beforeCodeTitle: 'Dialog with header, scrollable content and actions',
	htmlCode: `
<button mat-button (click)="openDialog()">Open dialog</button>
`,
	tsCode: `
import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';\n
/**
* @title Dialog with header, scrollable content and actions
*/
@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
  styleUrls: ['dialog-content-example.css'],
})
export class DialogContentExample {
  constructor(public dialog: MatDialog) {}\n
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: '350px'
    });\n
    dialogRef.afterClosed().subscribe(result => {
      console.log(\`Dialog result: \${result}\`);
    });
  }
}\n
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
`,
	cssCode: ``,
	viewCode: ``,
	isCodeVisible: false,
	isExampleExpanded: true
};

export interface DialogData {
	animal: string;
	name: string;
}

@Component({
	selector: 'kt-holiday',
	templateUrl: './holiday.component.html',
	changeDetection: ChangeDetectionStrategy.Default,

})
export class holidayComponent implements OnInit {
    dates = [
        { date: '' }

    ];
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.dates.push({ date: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    remove(fruit: any): void {
        const index = this.dates.indexOf(fruit);
        if (index >= 0) {
            this.dates.splice(index, 1);
        }
    }
	animal2: string = '';
	animalSubject = new BehaviorSubject<string>('');
	animal$: Observable<string>;
	animal: string;
	name: string;

	exampleBasic;
	exampleInjecting;
	examplHeader;

	constructor(public dialog: MatDialog) {
	}

	ngOnInit() {
		this.animal$ = this.animalSubject.asObservable();
		this.animal$.subscribe(result => {
			this.animal = result;
		});
		this.exampleBasic = basic;
		this.exampleInjecting = injecting;
		this.examplHeader = header;
	}




}
