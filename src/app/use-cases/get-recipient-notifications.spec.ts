import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'some-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'some-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'some-id-two' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'some-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'some-id' }),
        expect.objectContaining({ recipientId: 'some-id' }),
      ]),
    );
  });
});
