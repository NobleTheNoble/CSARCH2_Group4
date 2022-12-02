import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
	
	@Input() bits!: number[];
	@Output() send_error = new EventEmitter()
	@Output() calculate = new EventEmitter()

	cf_indices = [1, 2, 3, 4, 5]
	ec_indices = [6, 7, 8, 9, 10, 11]
	cc_indices_1 = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
	cc_indices_2 = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
	regex_bin = "^[0-1]{32}$"
	regex_hex = "^[0-9A-Fa-f]{8}$"

	resetallbits(){
		this.bits.length = 0
		for(let i=0; i < 32; i++) this.bits.push(0)
	}

	update(){
		this.calculate.emit()
	}

	onkey_parseinput(e: any, type: any){
		if (type == 'bin'){
			if ((e.target.value).match(this.regex_bin) == null){
				this.resetallbits()
				e.target.value = this.bits.join('')
				this.send_error.emit("Binary input must be only 0 and 1, and must be 32 digits.")
			}else{
				for (let i = 0; i < this.bits.length; i++){
					this.bits[i] = parseInt(e.target.value[i])
				}

				this.calculate.emit()
			}
		}

		if (type == 'hex'){
			if ((e.target.value).match(this.regex_hex) == null){	
				this.resetallbits()
				e.target.value = "00000000"
				this.send_error.emit("Hex input must be only be 0-9, A-F, and must be 8 digits.")
			}else{
				e.target.value = (e.target.value).toUpperCase()
				for (let i = 0; i < e.target.value.length; i++){
					let bin_token = ('0000' + parseInt(e.target.value[i].toString(), 16).toString(2)).slice(-4).split('')
					for (let j = 0; j < 4; j++){
						this.bits[(i * 4) + j] = parseInt(bin_token[j])
					}
				}

				this.calculate.emit()
			}
		}
	}

	bin_to_hex_string(){
		let final_hex_value = []
		for(let i = 0; i < this.bits.length; i+=4){
			//let token = this.bits.slice(i, 4)
			//todo: compartmentalize
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

}
