import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentGatewayInterface } from '../payments.service';

@Injectable()
export class IdpayGateway implements PaymentGatewayInterface {
  private apiKey: string;
  private baseUrl = 'https://idpay.ir/api/v1.1';

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('IDPAY_API_KEY', '');
  }

  async requestPayment(amount: number, description: string, callbackUrl: string) {
    const res = await fetch(`${this.baseUrl}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
        'X-SANDBOX': '0',
      },
      body: JSON.stringify({ amount, description, callback: callbackUrl }),
    });
    const data = await res.json();
    return {
      authority: data.id,
      paymentUrl: `https://idpay.ir/p/${data.id}`,
    };
  }

  async verifyPayment(authority: string, amount: number) {
    const res = await fetch(`${this.baseUrl}/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      },
      body: JSON.stringify({ id: authority, amount }),
    });
    const data = await res.json();
    return {
      success: data.status === 100,
      refId: data.track_id?.toString() ?? '',
    };
  }
}
