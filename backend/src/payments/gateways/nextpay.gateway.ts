import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentGatewayInterface } from '../payments.service';

@Injectable()
export class NextpayGateway implements PaymentGatewayInterface {
  private apiKey: string;
  private baseUrl = 'https://nextpay.org/nx/gateway';

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('NEXTPAY_API_KEY', '');
  }

  async requestPayment(amount: number, description: string, callbackUrl: string) {
    const res = await fetch(`${this.baseUrl}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: this.apiKey,
        amount,
        callback_uri: callbackUrl,
        order_id: `order_${Date.now()}`,
      }),
    });
    const data = await res.json();
    return {
      authority: data.trans_id,
      paymentUrl: `https://nextpay.org/nx/gateway/payment/${data.trans_id}`,
    };
  }

  async verifyPayment(authority: string, amount: number) {
    const res = await fetch(`${this.baseUrl}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: this.apiKey,
        trans_id: authority,
        amount,
      }),
    });
    const data = await res.json();
    return {
      success: data.code === 0,
      refId: data.card_no ?? '',
    };
  }
}
