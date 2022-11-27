import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bin-input',
	templateUrl: './bin-input.component.html',
	styleUrls: ['./bin-input.component.css']
})
export class BinInputComponent implements OnInit {

	
	
	cf_indices: number[] = []
	ec_indices: number[] = []
	cc_indices: number[] = []
	bits: number[] = []
	regex_binary = "^[0-1]{32}$"

	onkey_parseinput(e : any){
		//console.log(e.target.value.match(this.regex_binary))
		if (e.target.value.match(this.regex_binary) == null){
			this.zeroallbits()
			e.target.value = this.bits.join('')
			return
		}

		

	}

	zeroallbits(){
		this.bits = []
		this.cf_indices = []
		this.ec_indices = []
		this.cc_indices = []

		this.bits.push(0)
		for (let i = 1; i <= 5; i++){this.bits.push(0), this.cf_indices.push(i)}
		for (let i = 6; i <= 11; i++){this.bits.push(0), this.ec_indices.push(i)}
		for (let i = 12; i <= 31; i++){this.bits.push(0), this.cc_indices.push(i)}


	}

	constructor() { 

	}

	ngOnInit(): void {
		this.zeroallbits()
		//console.log(this.bits);
		//console.log(this.cf_indices)
		//console.log(this.ec_indices)
		//console.log(this.cc_indices)
	}



}
