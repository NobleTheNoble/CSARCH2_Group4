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

	sign = '+'
	most_significant_digit = "0"
	exponent = "0"
	decimalvalue1 = "000"
	decimalvalue2 = "000"

	flag_infinity = false
	flag_NaN = false

	// from https://codegolf.stackexchange.com/questions/176371/densely-packed-decimal-dpd-to-decimal
	/*
		a = bin[0]
		b = 1
		c = 2
		d = 3
		e = 4
		f = 5
		g = 6
		h = 7
		i = 8
		j = 9

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
	*/

	setvalues(){
		if (this.bits[1] && this.bits[2] && this.bits[3] && this.bits[4] && this.bits[5]){
			this.flag_NaN = true
		}
		else if(this.bits[1] && this.bits[2] && this.bits[3] && this.bits[4]){
			this.flag_infinity = true
			this.sign = !this.bits[0] ? "+" : "-"
		}else{
			this.flag_NaN = false
			this.flag_infinity = false
			this.sign = !this.bits[0] ? "+" : "-"
			this.set_most_significant_digit()
			this.set_exponent()
			this.decimalvalue1 = this.densely_packed_bcd_to_decimal(this.bits.slice(12, 22)).join('')
			this.decimalvalue2 = this.densely_packed_bcd_to_decimal(this.bits.slice(22, 32)).join('')
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

	constructor(){
		this.bits = []
		for(let i=0; i < 32; i++) this.bits.push(0)

		//console.log(this.bits.slice(12,22))
		//console.log(this.bits.slice(22,32))
		//console.log(this.bits.slice(12))

	}
}
