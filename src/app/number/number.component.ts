import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent {

  number:any

  constructor(private api : ApiService, public router: Router){

  }

  ngOnInit(){

  }

  check(){
    this.api.getOtpLogin(this.number).subscribe((res:any)=>{  
      console.log('sent Otp', res);
      if(res == true){
        this.router.navigate(['/otp']);
        this.api.setMobile(this.number)
        console.log("working")
      }else{
        console.log("not working")
      }
    });
  }

}
