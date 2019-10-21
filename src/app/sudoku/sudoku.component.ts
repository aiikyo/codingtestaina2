import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  constructor() { }

  file: any;
  contents: any;
  readthis: any;
  arrayNumbers: any = [];
  arrayAnswers: any = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  lineNumbers: any = [];
  fileChanged(e) {
    this.file = e.target.files[0];
  }


  ngOnInit() {

  }


  uploadDocument() {

    let fileReader = new FileReader();
    fileReader.onload = (e) => {

      console.log(fileReader.result);
      this.contents = fileReader.result;
    }
    fileReader.readAsText(this.file);
    alert('File successfully read!');


  }

  viewNumbers() {
    this.contents = this.contents.replace(/,/g, '');
    console.log(this.contents);


    this.contents = this.contents.match(/.{9}|.{1,2}/g);
    console.log(this.contents);

    for (const line of this.contents) {
      console.log(line);
      this.lineNumbers.push(line);
    }

    for (var lines of this.lineNumbers) {
      var nums = lines.split("");
      console.log(nums);
    }

    for (var i: number = 0; i < this.lineNumbers.length; i++) {
      this.arrayNumbers[i] = [];

      for (var j: number = 0; j < this.lineNumbers[i].length; j++) {

        if (+this.lineNumbers[i].substring(j, j + 1) > 0) {
          this.arrayNumbers[i][j] = +this.lineNumbers[i].substring(j, j + 1);
          this.arrayAnswers[i][j] = this.arrayNumbers[i][j]
        } else {
          this.arrayNumbers[i][j] = '';
        }

      }
    }

    console.log(this.arrayNumbers);
  }

  clearBoard() {
    for (var i: number = 0; i < 9; i++) {
      this.arrayNumbers[i] = [];
      for (var j: number = 0; j < 9; j++) {
        this.arrayNumbers[i][j] = '';
      }
    }
  }

  resetBoard() {

    for (var i: number = 0; i < this.lineNumbers.length; i++) {
      this.arrayNumbers[i] = [];
      for (var j: number = 0; j < this.lineNumbers[i].length; j++) {

        if (+this.lineNumbers[i].substring(j, j + 1) > 0) {
          this.arrayNumbers[i][j] = +this.lineNumbers[i].substring(j, j + 1);
        } else {
          this.arrayNumbers[i][j] = '';
        }

      }
    }

    console.log(this.arrayNumbers);

  }

  changedValue(_i, _i2, _value) {
    console.log(_i, _i2, _value);
    this.arrayAnswers[_i][_i2] = +_value;
    console.log(_i + ' ' + _i2 + ': ' + this.arrayAnswers[_i][_i2]);

    console.log(this.arrayNumbers);
    console.log(this.arrayAnswers);


  }

  checkBoard() {

    var flag: boolean = false;

    for (var i: number = 0; i < 9; i++) {

      for (var j: number = 0; j < 9; j++) {

        if (this.arrayAnswers[i][j] == 0) {
          alert('Please fill all the empty fields!');
          flag = true;
        }

        if (flag) break;
      }
      if (flag) break;

    }

    console.log(this.arrayAnswers);
    if (flag == false) {
      this.checkResult(this.arrayAnswers);
    }


  }



  saveTextAsFile() {
    var textToWrite = this.arrayAnswers;

    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var fileNameToSaveAs = "newSudoku.txt";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    // if (window.webkitURL != null) {
    //   // Chrome allows the link to be clicked without actually adding it to the DOM.
    //   downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    // } else {
    //   // Firefox requires the link to be added to the DOM before it can be clicked.
    //   downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    //   // downloadLink.onclick = destroyClickedElement;
    //   downloadLink.style.display = "none";
    //   document.body.appendChild(downloadLink);
    // }

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    // downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
  }

  checkResult(_value) {
    var flag: boolean = false;
    var flag1: boolean = false;
    var GridA = [];
    var GridB = [];
    var GridC = [];
    var GridD = [];
    var GridE = [];
    var GridF = [];
    var GridG = [];
    var GridH = [];
    var GridI = [];


    for (var i: number = 0; i < 9; i++) {
      var inputtedRowNumber = [];
      var inputtedColNumber = [];

      for (var j: number = 0; j < 9; j++) {
        if (inputtedRowNumber.includes(_value[i][j])) {
          // alert('Wrongs answers!');
          flag = true;
        } else {
          inputtedRowNumber.push(_value[i][j]);
        }
        if (inputtedColNumber.includes(_value[j][i])) {
          // alert('Wrongs answers!');
          flag = true;
        } else {
          inputtedColNumber.push(_value[j][i]);
        }
        if ((i <= 2 && i >= 0) && (j <= 2 && j >= 0)) {
          if (GridA.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridA.push(_value[i][j]);
          }
        }
        if ((i <= 2 && i >= 0) && (j <= 5 && j >= 3)) {
          if (GridB.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridB.push(_value[i][j]);
          }
        }
        if ((i <= 2 && i >= 0) && (j <= 8 && j >= 6)) {
          if (GridC.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridC.push(_value[i][j]);
          }
        }

        if ((i <= 5 && i >= 3) && (j <= 2 && j >= 0)) {
          if (GridD.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridD.push(_value[i][j]);
          }
        }
        if ((i <= 5 && i >= 3) && (j <= 5 && j >= 3)) {
          if (GridE.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridE.push(_value[i][j]);
          }
        }
        if ((i <= 5 && i >= 3) && (j <= 8 && j >= 6)) {
          if (GridF.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridF.push(_value[i][j]);
          }
        }

        if ((i <= 8 && i >= 6) && (j <= 2 && j >= 0)) {
          if (GridG.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridG.push(_value[i][j]);
          }
        }
        if ((i <= 8 && i >= 6) && (j <= 5 && j >= 3)) {
          if (GridH.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridH.push(_value[i][j]);
          }
        }
        if ((i <= 8 && i >= 6) && (j <= 8 && j >= 6)) {
          if (GridI.includes(_value[i][j])) {
            // alert('Wrongs answers!');
            flag = true;
          } else {
            GridI.push(_value[i][j]);
          }
        }



        if (flag) {
          alert('Wrongs answers!');
          flag1 = true;
          break;
        }

      }

      if (flag) {
        if (!flag1) {
          alert('Wrongs answers!');
        }
        break;
      }
    }

    if (flag == false) {
      alert('Congrats! Correct answers!');
    }
  }



}
