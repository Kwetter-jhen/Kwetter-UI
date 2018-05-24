import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../domain/payment';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  @Input() billingId: string;
  newAmount = 0;
  payments: Payment[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPayments(this.billingId).subscribe(
      (payments: Payment[]) => {
        this.payments = payments;
      });
  }

  pay() {
    this.userService.addPayment(this.billingId, this.newAmount).subscribe();
  }
}
