import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
  
import html2canvas from 'html2canvas'; 
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  UserSession :string;
  currentUser:any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private data: ApiService
  ) { }

  ngOnInit() {

    this.UserSession = JSON.parse(localStorage.getItem('UserSession'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

years=['2019',]
//'2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2031','2032',

//public captureScreen()  
  //{  
   // var data = document.getElementById('contentToConvert');  
   // html2canvas(data).then(canvas => {  
      // Few necessary setting options  
     // var imgWidth = 208;   
     // var pageHeight = 295;    
     // var imgHeight = canvas.height * imgWidth / canvas.width;  
     // var heightLeft = imgHeight;  
  
     // const contentDataURL = canvas.toDataURL('image/png')  
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      //var position = 0;  
     // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
     // pdf.save('MYPdf.pdf'); // Generated PDF   
   // });  
 // } 

 onSubmitReportForm(reportForm:any){
  console.log("reportForm ="+JSON.stringify(reportForm));
  
  console.log(reportForm.startdate)

  this.data.getSummaryReport(reportForm,this.currentUser.nrcUId)
  .subscribe(
    (res) => {
      FileSaver.saveAs(res, "myPDF.pdf"); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver

  var fileURL = URL.createObjectURL(res);
  window.open(fileURL); // if you want to open it in new tab
  

  }
      );

    



  
}


onSubmitMothlyreportForm(MothlyreportForm:any){
  console.log("MothlyreportForm ="+JSON.stringify(MothlyreportForm));
  


  this.data.getMonthlyReport(MothlyreportForm,this.currentUser.nrcUId)
  .subscribe(
    (res) => {
      FileSaver.saveAs(res, "myPDF.pdf"); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver

  var fileURL = URL.createObjectURL(res);
  window.open(fileURL); // if you want to open it in new tab

  }
      );

    



  
}


  

}
