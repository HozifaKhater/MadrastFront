import { Component, ChangeDetectorRef,OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Definition } from '../../../../../Definitions.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-Definitions',
	templateUrl: './definition.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,

})

export class DefinitionComponent implements OnInit {

    def_id: number;
    def_name: string = "";
    s_code: string = "";
    s_code_arabic: string = "";

    selected: string;
    scodes: Definition[];
    selectedCode: any;
    form1: FormGroup;
    butDisabled: boolean;

    is_edit:boolean=false;
    constructor(
        private modalService: NgbModal,

        private cdRef:ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder, 
        private DefinitionService: DefinitionDataService) {
        this.form1 = this._fb.group({
            def_name_f: ['', [Validators.required]],
            s_code_arabic: ['', [Validators.required]],
            def_id: [{ value: '', disabled: true }]
        });

        this.DefinitionService.GetSCodes().subscribe(data => this.scodes = data,
            error => console.log());
    }
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

    add_definition() {

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        }else {
            var chck;
            
            if (this.butDisabled == true) {
                chck = Number(this.def_id);
            };

            var newDefinition = {
                def_name: this.def_name,
                s_code: this.scodes.find(e => e.s_code_arabic == this.selected).s_code,
                s_code_arabic: this.selected,
               
            };

            this.DefinitionService.addDefinition(newDefinition).subscribe(res => {
                alert("Added Succesfully");
               
                this.DefinitionService.BClicked("test");
            })

            this.form1.reset();

        }
    }

    update_definition() {

        var chck;

        if (this.butDisabled == false) {
            chck = Number(this.def_id);
        };

        var updatedDefinition = {
            def_name: this.def_name,
            s_code: this.scodes.find(e => e.s_code_arabic == this.selected).s_code,
            s_code_arabic: this.selected,
            def_id: Number(chck)

        };

        this.DefinitionService.updateDefinition(updatedDefinition).subscribe(res => {
            alert("Updated Succesfully");
            this.DefinitionService.BClicked("test");
            this.form1.reset();
            this.is_edit=false;
        })

    }

    cancel_definition() {
        this.form1.reset();
       
    }


    initModelForm(): FormGroup {
        return this._fb.group({
            otherControls: [''],
            // The formArray, empty 
            myChoices: new FormArray([]),
        })
    }
    myForm: FormGroup = this.initModelForm();

    priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();

			});

        this.butDisabled = true;
        

        this.DefinitionService.aClickedEvent
            .subscribe((data: string) => {
                if (Number(this.DefinitionService.def_id) != 0) {

                    this.butDisabled = false;

                    var selected_value = this.DefinitionService.def_id
                    this.selectedCode = this.scodes[this.scodes.findIndex(function (el) {
                        return el.def_id == selected_value
                    })];
                }
                this.is_edit=true;
                this.def_id = this.DefinitionService.def_id;
                this.def_name = this.DefinitionService.def_name;
                this.s_code = this.DefinitionService.s_code;
                this.s_code_arabic = this.DefinitionService.s_code_arabic;
                this.selected = this.DefinitionService.s_code_arabic;

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

            });
       
        
    }


}

