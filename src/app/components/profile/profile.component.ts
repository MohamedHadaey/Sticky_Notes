import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotesService } from 'src/app/services/notes.service';
import jwt_decode from 'jwt-decode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  token: any;
  decoded: any;
  allNotes: any;
  Note_ID: any;
  msg: any;

  constructor(
    private spinner: NgxSpinnerService,
    private _NotesService: NotesService,
    private _Router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.token = localStorage.getItem('userToken');
    // H Y get el token and make decode to get the id and send it
    this.decoded = jwt_decode(this.token);
    this.getNotes();
  }

  // this form data to can add in reactive forms
  AddingNotesForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  });

  // this form data to can edit in reactive forms
  EdittingNotesForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  });

  // this function i make here to call in anywhere
  getNotes() {
    let data = {
      token: this.token,
      userID: this.decoded._id,
    };
    // H call el function  bta3et el notes
    this._NotesService.getAllNotes(data).subscribe((response) => {
      this.msg = response.message;
      // this if condition to check if token is true or false ( some one put it in local storage )
      this.allNotes = response.Notes;
      this.spinner.hide();
    });
  }

  addData() {
    this.spinner.show();
    let data = {
      title: this.AddingNotesForm.value.title,
      desc: this.AddingNotesForm.value.desc,
      citizenID: this.decoded._id,
      token: this.token,
    };
    // call this function from NoteService
    this._NotesService.addNotes(data).subscribe((response) => {
      if (response.message == 'success') {
        // to hide modal after submit
        $('#AddNote').modal('hide');
        // to reset inputs value after submit
        this.AddingNotesForm.reset();
        // here we must call this function to shoe new notes
        this.getNotes();
        this.spinner.hide();
      }
    });
  }

  // this function to get note id
  getNoteID(id: any) {
    this.Note_ID = id;
  }

  // this function or method to remove note
  removeNote() {
    this.spinner.show();
    let data = {
      NoteID: this.Note_ID,
      token: this.token,
    };
    this._NotesService.deleteNote(data).subscribe((response) => {
      if (response.message == 'deleted') {
        // to hide modal after submit
        $('#DeleteNote').modal('hide');
        // here we must call this function to shoe new notes
        this.getNotes();
        this.spinner.hide();
      }
    });
  }

  // this function or method to edit note
  setInputsValues() {
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i]._id == this.Note_ID) {
        this.EdittingNotesForm.controls['title'].setValue(
          this.allNotes[i].title
        );
        this.EdittingNotesForm.controls['desc'].setValue(this.allNotes[i].desc);
      }
    }
  }

  editData() {
    this.spinner.show();
    let data = {
      title: this.EdittingNotesForm.value.title,
      desc: this.EdittingNotesForm.value.desc,
      NoteID: this.Note_ID,
      token: this.token,
    };
    this._NotesService.updateNotes(data).subscribe((response) => {
      if (response.message == 'updated') {
        // to hide modal after submit
        $('#EditNote').modal('hide');
        // here we must call this function to shoe new notes
        this.getNotes();
        this.spinner.hide();
      }
    });
  }
}
