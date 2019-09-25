// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../_services/api.service';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  UserSession: string;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  currentUser: any;
  date = new Date();
  month = this.date.getMonth();
  year = this.date.getFullYear();

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

  years = ['2019',]

  onSubmitMothlyreportForm(MothlyreportForm: any) {
    console.log("MothlyreportForm =" + JSON.stringify(MothlyreportForm));
    this.data.getMonthlyReport(MothlyreportForm, this.currentUser.nrcUId)
      .subscribe(
        (res) => {
          FileSaver.saveAs(res, "myPDF.pdf"); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver
          var fileURL = URL.createObjectURL(res);
          window.open(fileURL); // if you want to open it in new tab
        });
  }

}
