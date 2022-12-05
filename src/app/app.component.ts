import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { count } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
  	title = 'group4arch2';
	bits: number[] = []
	errormessage = ""
	output_type = "floatingpoint"

	//er_indices = [1, 2, 3, 4, 5, 6, 7, 8]
	//fp_indices = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

	flag = ""
	sign = ""
	_1f = ""
	//output in floatingpoint...
	exponent: any
	decimal_value: number = 0
	fixed_decimal_value: any = 0
	floating_point_decimal_value : any = 0

	mantissa: number = 0

	setvalues(){
		
		if(parseInt(this.bits.slice(1, 9).join(''), 2) == 0 && parseInt(this.bits.slice(9, 32).join(''), 2) == 0){
			this.flag = "zero"
			this.fixed_decimal_value = 0
			this.floating_point_decimal_value = 0
			return
		}
	
		// sNaN
		if (parseInt(this.bits.slice(1, 9).join(''), 2) == 255 && this.bits[9] == 0 && this.bits[10] == 1 ){
			this.flag = "sNaN"
			this.sign = ""
			this.fixed_decimal_value = "sNaN"
			this.floating_point_decimal_value = "sNaN"
			return
		}

		// qNaN
		if (parseInt(this.bits.slice(1, 9).join(''), 2) == 255 && this.bits[9] == 1){
			this.flag = "qNaN"
			this.sign = ""
			this.fixed_decimal_value = "qNaN"
			this.floating_point_decimal_value = "qNaN"
			return
		}


		//infinity test case
		if (parseInt(this.bits.slice(1, 9).join(''), 2) == 255){
			this.flag = "infinity"
			this.fixed_decimal_value = this.bits[0] == 1 ? "-Infinity" : "+Infinity"
			this.floating_point_decimal_value = this.bits[0] == 1 ? "-Infinity" : "+Infinity"
			return
		}

		this.flag = ""

		this.exponent = (parseInt(this.bits.slice(1, 9).join(''), 2) - 127).toString(10)
		this.decimal_value = 0

		this.bits.slice(9,32).forEach((value, index) =>{
			this.decimal_value += Math.pow(2, (index + 1) * -1) * value
			//
			//console.log(this.decimal_value, (index + 1) * -1, Math.pow(2, (index + 1) * -1))
		})

		this.mantissa = this.decimal_value

		if (parseInt(this.bits.slice(1, 9).join(''), 2) == 0){
			this.decimal_value = (this.decimal_value) * Math.pow(2, -126)
		}else{
			this.decimal_value = (1 + this.decimal_value) * Math.pow(2, this.exponent)
		}
		this.decimal_value = this.bits[0] == 1 ? this.decimal_value * -1 : this.decimal_value * 1
		this.fixed_decimal_value = this.decimal_value
		this.floating_point_decimal_value = this.decimal_value.toExponential()

	}

	saveoutput(){
		

		let file_text: outputfile = {
			"input" : {
				"sign bit" : this.bits[0],
				"exponent" : this.bits.slice(1, 9).join(''),
				"mantissa" : this.bits.slice(9,32).join('')
			},
			
		}

		

		if (this.flag != ""){
			file_text['flag'] = this.flag
			file_text['value'] = this.fixed_decimal_value
		}else{
			file_text['conversions'] = {
				"exponent in decimal (with -127)" : this.exponent,
				"mantissa in decimal" : this.mantissa,
				"fixed decimal value" :  this.fixed_decimal_value,
				"floating point decimal value" : this.floating_point_decimal_value
			}
		}




		let file = new Blob([JSON.stringify(file_text, null, 2)], {type : ".txt"})

		var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "Output"
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
	}

	recieve_error(message: any){
		this.errormessage = message
	}

	constructor(){
		this.bits = []
		for(let i=0; i < 32; i++) this.bits.push(0)

		//console.log(this.bits.slice(12,22))
		//console.log(this.bits.slice(22,32))
		//console.log(this.bits.slice(12))

	}
}

export interface outputfile{
	[key: string] : any
}
