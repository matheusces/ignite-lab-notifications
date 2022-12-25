import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
    static toPrisma(notification: Notification): RawNotification {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            cancelAt: notification.cancelAt,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        }
    }

    static toDomain(raw: RawNotification): Notification {
        return new Notification({
            category: raw.category,
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            readAt: raw.readAt,
            cancelAt: raw.cancelAt,
            createdAt: raw.createdAt,
        }, raw.id);
    }
}