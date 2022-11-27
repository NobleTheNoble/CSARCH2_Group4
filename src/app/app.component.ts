import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'group4arch2';
	input?: any;
	input_type?: string
	error_message?: string
	regex_hex = "^(0[xX][a-fA-F0-9]{0,8})$"
	regex_binary = "^[0-1]{0,32}$"

	textarea_input(e: any){
		this.input = e.target.value
	}

	button_start(){
		if (this.input == undefined) return

		if (this.input.match(this.regex_hex)){
			this.error_message = "8 digit hex"
		}

		

		
	}
}
