import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../model/dialogdata';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.css']
})
export class ShowDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:DialogData,private apiService: ApiService) {}
  title?: string;
  message?: string;
  entityType?:any;
  id?:number;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title=this.data.title;
    this.message=this.data.message;
    this.id=this.data.id;
    this.entityType=this.data.entityType;
  }
  deleteEntity(){
    this.apiService.deleteEntity(this.id!,this.entityType);
  }
  
  
}
