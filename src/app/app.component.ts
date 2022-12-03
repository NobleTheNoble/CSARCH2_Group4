import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'group4arch2';
	bits: number[] = []
	errormessage = ""

	output_type = "fixed"

	sign = '+'
	most_significant_digit = "0"
	decimalvalue1 = "000"
	decimalvalue2 = "000"
	exponent = "0"
	
	full_decimal_value1 = 0
	exponent1 = 0

	flag_infinity = false
	flag_NaN = false

	full_decimal_value2 = 0
	exponent2 = 0

	setvalues(){
		if (this.bits[1] && this.bits[2] && this.bits[3] && this.bits[4] && this.bits[5]){
			this.flag_infinity = false
			this.flag_NaN = true
		}
		else if(this.bits[1] && this.bits[2] && this.bits[3] && this.bits[4]){
			this.flag_NaN = false
			this.flag_infinity = true
			this.sign = !this.bits[0] ? "+" : "-"
		}else{
			
			this.flag_NaN = false
			this.flag_infinity = false
			
			//get values as string
			this.sign = !this.bits[0] ? "+" : "-"
			this.set_most_significant_digit()
			this.set_exponent()
			this.decimalvalue1 = this.densely_packed_bcd_to_decimal(this.bits.slice(12, 22)).join('')
			this.decimalvalue2 = this.densely_packed_bcd_to_decimal(this.bits.slice(22, 32)).join('')


			//first type
			this.full_decimal_value1 = parseInt(this.most_significant_digit.concat(this.decimalvalue1.concat(this.decimalvalue2)))
			this.exponent1 = parseInt(this.exponent)

			//second type
			let dec_value_string = this.full_decimal_value1.toString()
			console.log(dec_value_string)
			dec_value_string = [...dec_value_string[0], ".", ...dec_value_string.slice(1)].join('')
			console.log(dec_value_string)
			this.full_decimal_value2 = parseFloat(dec_value_string)
			this.exponent2 = Number(this.exponent1) + (this.full_decimal_value1.toString().length - 1)

			while(this.full_decimal_value2 > 10){
				this.full_decimal_value2 /= 10
				this.exponent2++
			}
			 

		}		
	}
	
	set_exponent = () => {
		let exp_bin = []

		exp_bin = !this.bits[1] ? [this.bits[1],this.bits[2]] : [this.bits[3], this.bits[4]]
		this.exponent = (parseInt(exp_bin.concat(this.bits.slice(6, 12)).join(''), 2) - 101).toString(10)
	}

	set_most_significant_digit = () => {
		let msd_bin = []

		if(!this.bits[1]){
			msd_bin = [0, this.bits[3], this.bits[4], this.bits[5]]
		}
		else{
			msd_bin = [1, 0, 0, this.bits[5]]
		}

		this.most_significant_digit = parseInt(msd_bin.join(''), 2).toString(10)
	}

	densely_packed_bcd_to_decimal = (bin: number[]) => {
		return this.G(
			bin[0],
			bin[1],
			bin[2],
			bin[3],
			bin[4],
			bin[5],
			bin[6],
			bin[7],
			bin[8],
			bin[9],
		)
	}

	G(a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number) {
		if (!g) return [a*4+b*2+c,d*4+e*2+f,h*4+i*2+j];
		else if (g && !h && !i) return [a*4+b*2+c,d*4+e*2+f,8+j];
		else if (g &&!h &&i) return [a*4+b*2+c,8+f,d*4+e*2+j];
		else if (g && h && !i) return [8+c,d*4+e*2+f,a*4+b*2+j];
		else if (!d && !e && g && h && i) return [8+c,8+f,a*4+b*2+j];
		else if (!d && e && g && h && i) return [8+c,a*4+b*2+f,8+j];
		else if (d && !e && g && h && i) return [a*4+b*2+c,8+f,8+j];
		else if (d && e && g && h && i) return [8+c,8+f,8+j];
		return [0,0,0]
	}

	recieve_error(message: any){
		this.errormessage = message
	}

	save_output(){
		//https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link/19328891#19328891
		let file_text!: object

		let section1 = {
			"sign bit" : this.bits[0].toString(),
			"combination field" : this.bits.slice(1, 6).join(''),
			"exponent continuation" : this.bits.slice(6, 12).join(''),
			"coefficient continuation 1" : this.bits.slice(12, 22).join(''),
			"coefficient continuation 2" : this.bits.slice(22, 32).join(''),	
		}

		if (this.flag_infinity){
			let section2 = {
				"is infinity" : this.flag_infinity,
				"answer" : [this.bits[0] == 1 ? "negative" : "positive", "infinity"].join(' ')
			}

			file_text = {
				"input" : section1,
				"answer" : section2
			}
		}
		else if(this.flag_NaN){
			let section2 = {
				"is NaN" : this.flag_NaN,
				"answer" : "NaN"
			}

			file_text = {
				"input" : section1,
				"answer" : section2
			}
		}
		else{
			let section2 = {
				"coefficient continuation 1 in decimal" : this.decimalvalue1,
				"coefficient continuation 2 in decimal" : this.decimalvalue2,
				"most significant digit" : this.most_significant_digit,
				"exponent if using fixed notation" : this.exponent1.toString(),
				"exponent if using floating point notation" : this.exponent2.toString()
			}
	
			let section3 = {
				"answer in fixed notation" : [this.sign,this.full_decimal_value1,"x10^",this.exponent1].join(''),
				"answer in floating point notation" : [this.sign,this.full_decimal_value2,"x10^",this.exponent2].join('')
			}

			file_text = {
				"input" : section1,
				"conversions" : section2,
				"answer" : section3
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

	constructor(){
		this.bits = []
		for(let i=0; i < 32; i++) this.bits.push(0)

		//console.log(this.bits.slice(12,22))
		//console.log(this.bits.slice(22,32))
		//console.log(this.bits.slice(12))

	}
}
