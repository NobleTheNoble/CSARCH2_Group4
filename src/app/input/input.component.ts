import { HtmlTagDefinition } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

	@ViewChild('hex_input') hex_input!: ElementRef
	@ViewChild('bin_input') bin_input!: ElementRef

  	cf_indices: number[] = []
	ec_indices: number[] = []

	cc_indices_1 : number[] = []
	cc_indices_2 : number[] = []

	cc_indices: number[] = []
	bits: number[] = []
	regex_binary = "^[0-1]{32}$"
	regex_hex = "^[0-9A-Fa-f]{8}$"

	onkey_parseinput(e: any){
		let hex_value = this.hex_input.nativeElement.value
		let bin_value = this.bin_input.nativeElement.value

		if (hex_value.match(this.regex_hex) == null || bin_value.match(this.regex_binary) == null){
			this.zeroallbits()
		}

		console.log(hex_value, bin_value);
	}

	/*
	onkey_parseinput_bin(e : any){
		//console.log(e.target.value.match(this.regex_binary))
		if (e.target.value.match(this.regex_binary) == null){
			this.zeroallbits()
			e.target.value = this.bits.join('')
		}
		else{
			let newbits = e.target.value.split("")
			newbits.forEach((e: any, counter: any) => {
				this.bits[counter] = parseInt(e)
			})
		}
	}

	onkey_parseinput_hex(e: any){
		if (e.target.value.match(this.regex_hex) == null){
			this.zeroallbits()
			e.target.value = "00000000"
		}
	} 
	*/

	zeroallbits(){
		this.bits = []
		this.cf_indices = []
		this.ec_indices = []

		this.cc_indices_1 = []
		this.cc_indices_2 = []

		

		this.bits.push(0)
		for (let i = 1; i <= 5; i++){this.bits.push(0), this.cf_indices.push(i)}
		for (let i = 6; i <= 11; i++){this.bits.push(0), this.ec_indices.push(i)}
		for (let i = 12; i <= 21; i++){this.bits.push(0), this.cc_indices_1.push(i)}
		for (let i = 22; i <= 31; i++){this.bits.push(0), this.cc_indices_2.push(i)}
	}

	bin_to_hex_string(){
		let final_hex_value = []
		for(let i = 0; i < this.bits.length; i+=4){
			//let token = this.bits.slice(i, 4)
			let lower = i;
			let upper = i + 4
			let token = this.bits.slice(lower, upper).join('')
			let dec = parseInt(token, 2)
			let hex = dec.toString(16)
			
			final_hex_value.push(hex)
			//console.log('slice' + lower + ", " + upper + ": " + token + ": " + dec + ": " + hex)
		}
		return final_hex_value.join('').toUpperCase()
	}


	constructor() { }

	ngOnInit(): void {
		this.zeroallbits()
	}

}
