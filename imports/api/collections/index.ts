import { MessageCollection } from './messages';
import { UnReadMessageCollection } from './unread-message';
import { NotificationCollection } from './notification';


const Collections = {
    Message: MessageCollection,
    UnReadMessage: UnReadMessageCollection,
    Notification: NotificationCollection,
};


export default Collections;
