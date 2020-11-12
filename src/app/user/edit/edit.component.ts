import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountsService} from "../../shared/services/account.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  formMessage;
  id: number;

  constructor(private formBuilder: FormBuilder,
              private routes: Router,
              private route: ActivatedRoute,
              private accountService: AccountsService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      )
  }

  onChange() {
    this.submitted = true;
    this.accountService.adminChanges(this.editForm.value, this.id);
    this.formMessage = 'Your changes have been saved';
    this.routes.navigate(['../'], {relativeTo: this.route})
  }

  onCancel() {
    this.routes.navigate(['../'], {relativeTo: this.route});
  }
}
