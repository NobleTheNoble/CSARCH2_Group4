import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bin-input',
	templateUrl: './bin-input.component.html',
	styleUrls: ['./bin-input.component.css']
})
export class BinInputComponent implements OnInit {

	signbit = 0;

	combinationfield = [0, 0, 0, 0, 0]
	exponentcontinuation = [0, 0, 0, 0, 0]
	coefficientcontinuation = 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0]



	constructor() { }

	ngOnInit(): void {
	}

	test(){
		this.signbit = this.signbit == 0 ? 1 : 0;
	}

}
