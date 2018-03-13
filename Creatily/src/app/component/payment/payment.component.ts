import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../utils/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    price: number = 0;
    ordernumber: number;

    constructor(private confirmServ: NzModalService, private http: HttpService, private router: Router, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            // console.log(params);
            this.price = params['price'];
            this.ordernumber = params['ordernumber']

        });

    }

    showConfirm() {
        let $self = this;
        let location = this.location;
        this.confirmServ.confirm({
            title: '您是否确认退出支付',
            content: '<b>忍心离开吗？</b>',
            onOk() {
                $self.router.navigate(['/dingdan/2']);
            },
            onCancel() {
            }
        });
    }

    success = () => {
        let location = this.location;
        let price = this.price;
        this.confirmServ.confirm({
            title: '您已成功支付金额￥' + `${price}`,
            content: '<b>确认返回，取消停留在该页面</b>',
            onOk() {
                location.back();
            },
            onCancel() {
            }
        });
    }
    payment() {
        let price = this.price;
        let params;
        this.http.post('payment_order', params = { ordernumber: this.ordernumber }).then((res) => {
            this.confirmServ.success({
                title: '您已成功支付金额￥' + `${price}`,
                content: '返回商品页'
            });
            setTimeout(() => {
                this.router.navigate(['/dingdan/3']);
            }, 1000)
        })
    }

}