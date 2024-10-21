import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'chat_queue',
        queueOptions: {
            durable: false, // Change this to false
          },
      },
    });
  }

  async sendNotification(channel: string, notification: any) {
    return await this.client
      .send(channel, notification)
      .toPromise();
  }
}