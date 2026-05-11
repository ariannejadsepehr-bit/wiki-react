import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentGatewayInterface } from '../payments.service';

@Injectable()
export class ZarinpalGateway implements PaymentGatewayInterface {
  private merchantId: string;
  private baseUrl = 'https://api.zarinpal.com/pg/v4';

  constructor(private config: ConfigService) {
    this.merchantId = this.config.get('ZARINPAL_MERCHANT_ID', '');
  }

  async requestPayment(amount: number, description: string, callbackUrl: string) {
    const res = await fetch(`${this.baseUrl}/payment/request.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: this.merchantId,
        amount,
        description,
        callback_url: callbackUrl,
      }),
    });
    const data = await res.json();
    if (data.data?.code !== 100) throw new Error('Zarinpal request failed');
    return {
      authority: data.data.authority,
      paymentUrl: `https://www.zarinpal.com/pg/StartPay/${data.data.authority}`,
    };
  }

  async verifyPayment(authority: string, amount: number) {
    const res = await fetch(`${this.baseUrl}/payment/verify.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: this.merchantId,
        amount,
        authority,
      }),
    });
    const data = await res.json();
    return {
      success: data.data?.code === 100 || data.data?.code === 101,
      refId: data.data?.ref_id?.toString() ?? '',
    };
  }
}
