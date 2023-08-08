import { Component,ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {

  mobile:any;
  otpString1: any;
  otpString2: any;
  otpString3: any;
  otpString4: any;

  constructor(private api : ApiService,public router: Router){

  }

  ngOnInit(): void {
    this.mobile = this.api.getMobile();
  }

  move(e:any,p:any,c:any,n:any){
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if(length == maxlength){
      n.focus();
    }
  }

  verifyOtp(){
    let otp = this.otpString1 + this.otpString2 + this.otpString3 + this.otpString4
    this.api.verifyOtp(this.mobile,otp).subscribe((res:any)=>{
      if(res == true){
        this.router.navigate(['/details'])
      }else{
        console.log("notworking")
      }
    });
  }
  

}
