import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

interface QueueJob {
  id: string;
  name: string;
  data: any;
  createdAt: number;
}

@Injectable()
export class QueueService implements OnModuleInit {
  private client: Redis;
  private processor: Redis;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const opts = {
      host: this.config.get('REDIS_HOST', 'localhost'),
      port: this.config.get('REDIS_PORT', 6379),
    };
    this.client = new Redis(opts);
    this.processor = new Redis(opts);
  }

  async enqueue(queueName: string, jobName: string, data: any): Promise<string> {
    const job: QueueJob = {
      id: `job:${Date.now()}:${Math.random().toString(36).slice(2)}`,
      name: jobName,
      data,
      createdAt: Date.now(),
    };
    await this.client.rpush(`queue:${queueName}`, JSON.stringify(job));
    return job.id;
  }

  async dequeue(queueName: string): Promise<QueueJob | null> {
    const result = await this.processor.blpop(`queue:${queueName}`, 0);
    if (!result) return null;
    return JSON.parse(result[1]);
  }

  async getQueueLength(queueName: string): Promise<number> {
    return this.client.llen(`queue:${queueName}`);
  }
}

// Job handlers
export const QUEUE_NAMES = {
  SEO_GENERATION: 'seo:generation',
  RANKING_UPDATE: 'ranking:update',
  SPAM_DETECTION: 'spam:detection',
  EMAIL_SEND: 'email:send',
  ANALYTICS_AGGREGATE: 'analytics:aggregate',
  NOTIFICATION: 'notification',
} as const;
