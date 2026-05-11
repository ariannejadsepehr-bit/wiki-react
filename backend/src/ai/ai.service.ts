import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AiService {
  private apiKey: string;
  private model = 'gpt-4o-mini';

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.apiKey = this.config.get('AI_API_KEY', '');
  }

  async generateSeoDescription(entityType: string, entityId: string, context: string) {
    const prompt = `یک توضیح SEO حرفه‌ای و جذاب به زبان فارسی برای ${entityType} زیر بنویسید. توضیح باید بین ۱۵۰ تا ۳۰۰ کاراکتر باشد و شامل کلمات کلیدی مرتبط باشد:\n\n${context}`;

    const content = await this.callAi(prompt);
    await this.prisma.aiContent.create({
      data: {
        entityType,
        entityId,
        contentType: 'description',
        content,
        model: this.model,
        isApproved: false,
      },
    });
    return { content };
  }

  async generateFaq(entityType: string, entityId: string, context: string) {
    const prompt = `۵ سوال متداول به زبان فارسی با پاسخ‌های کامل برای ${entityType} زیر تولید کنید. فرمت JSON:\n[{"q":"سوال","a":"پاسخ"}]\n\n${context}`;

    const content = await this.callAi(prompt);
    await this.prisma.aiContent.create({
      data: {
        entityType,
        entityId,
        contentType: 'faq',
        content,
        model: this.model,
        isApproved: false,
      },
    });
    return { content: JSON.parse(content) };
  }

  async generateSeoPage(categoryName: string, cityName: string) {
    const prompt = `یک صفحه SEO کامل به زبان فارسی برای دسته "${categoryName}" در شهر "${cityName}" تولید کنید. شامل:\n1. عنوان H1\n2. متا تایتل (حداکثر ۶۰ کاراکتر)\n3. متا دیسکریپشن (حداکثر ۱۶۰ کاراکتر)\n4. مقدمه (۲ پاراگراف)\n5. ۳ سوال متداول با پاسخ\nفرمت JSON`;

    const content = await this.callAi(prompt);
    return { content: JSON.parse(content) };
  }

  async detectSpam(reviewText: string): Promise<{ isSpam: boolean; score: number }> {
    const prompt = `آیا این نظر اسپم یا توهین‌آمیز است؟ فقط با true/false و عدد ۰ تا ۱ پاسخ دهید. فرمت JSON: {"isSpam":boolean,"score":number}\n\nنظر: "${reviewText}"`;

    const content = await this.callAi(prompt);
    try {
      return JSON.parse(content);
    } catch {
      return { isSpam: false, score: 0 };
    }
  }

  async calculateRankingScore(businessId: string) {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { reviews: { where: { isApproved: true, isSpam: false } } },
    });
    if (!business) return;

    const reviewScore = Math.min(business.reviewCount / 50, 1) * 25;
    const ratingScore = (business.avgRating.toNumber() / 5) * 25;
    const planScore = { free: 0, basic: 10, premium: 20, enterprise: 25 }[business.subscriptionPlan] ?? 0;
    const completenessScore = this.calculateCompleteness(business) * 25;

    const rankingScore = reviewScore + ratingScore + planScore + completenessScore;

    await this.prisma.business.update({
      where: { id: businessId },
      data: { rankingScore, aiScore: rankingScore / 4 },
    });
  }

  private calculateCompleteness(business: any): number {
    let score = 0;
    const fields = ['description', 'phone', 'address', 'logoUrl', 'coverUrl', 'website', 'email'];
    fields.forEach((f) => { if (business[f]) score += 0.1; });
    if (business.categories?.length > 0) score += 0.1;
    if (business.hours?.length > 0) score += 0.1;
    if (business.gallery?.length > 0) score += 0.1;
    return Math.min(score, 1);
  }

  private async callAi(prompt: string): Promise<string> {
    if (!this.apiKey) {
      return JSON.stringify({ note: 'AI not configured - set AI_API_KEY' });
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: 'شما یک متخصص SEO و تولید محتوای فارسی هستید. فقط محتوای باکیفیت و حرفه‌ای تولید کنید.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? '';
  }
}
