import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InternsService } from 'src/app/core/service/interns.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
offers! :any []
temp! :any []
userId! :string
user!:any

constructor(private router:Router, private offerService:InternsService, private userService : UserServiceService){}


ngOnInit() :void{
  this.userId = localStorage.getItem('userId')!
  this.getUser()
  this.getOffers()
}
getOffers(){
  this.offerService.getOffers().subscribe((res:any) => {
    this.offers=res.data;
    
    this.offers.reverse()
    this.userService.getUserById(this.userId).subscribe(res=>{
      this.user = res
      this.offers = this.offers.filter(offer => offer.departement === this.user.departement);  
      this.temp =this.offers 
    })  
  });
}
updateFilter(event: any) {
  const val = event.target.value.toLowerCase();

  // filter our data
  const temp = this.temp.filter(function (d: any) {
    return d.departement.toLowerCase().indexOf(val) !== -1 || 
           d.title.toLowerCase().indexOf(val) !== -1 || 
           d.technologies.toLowerCase().indexOf(val) !== -1 ||  
           !val;
  });

  // update the rows
  this.offers = temp;
}
getUser(){
  
}

}
