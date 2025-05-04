import  { useState, useEffect } from 'react';
import { Bell, X, Check, Info, AlertTriangle } from 'lucide-react';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: any;
}

export const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        const notificationsQuery = query(
          collection(db, 'notifications'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const snapshot = await getDocs(notificationsQuery);
        const notificationsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Notification[];
        
        setNotifications(notificationsList);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [currentUser, isOpen]);
  
  const markAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: true });
      
      // Update local state
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  const markAllAsRead = async () => {
    try {
      const promises = notifications
        .filter(notification => !notification.read)
        .map(notification => {
          const notificationRef = doc(db, 'notifications', notification.id);
          return updateDoc(notificationRef, { read: true });
        });
      
      await Promise.all(promises);
      
      // Update local state
      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default: // info
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="relative">
      <button 
        className="p-2 rounded-full hover:bg-primary-light relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="p-3 bg-primary text-white flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="text-xs text-accent hover:text-accent-light"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mx-auto"></div>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.createdAt ? new Date(notification.createdAt.toDate()).toLocaleString() : 'Just now'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
 