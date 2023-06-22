import { Notification, NotificationType } from '@components/Notification';
import React, { useState, useCallback, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
  notificationWrapper: {
    position: 'absolute',
    top: 24,
    alignSelf: 'center',
  },
});

const NotificationsContext = React.createContext<
  | {
      showNotification: (text: string, type: NotificationType) => void;
    }
  | undefined
>(undefined);

type NotificationsContextProps = {
  children: ReactNode;
};

const NotificationsContextProvider = ({
  children,
}: NotificationsContextProps) => {
  const [notificationText, setNotificationText] = useState<string | null>(null);
  const [notificationType, setNotificationType] =
    useState<NotificationType | null>(null);

  const showNotification = useCallback(
    (text: string, type: NotificationType) => {
      setNotificationText(text);
      setNotificationType(type);
    },
    []
  );

  const resetNotification = useCallback(() => {
    setNotificationText(null);
    setNotificationType(null);
  }, []);

  const value = {
    showNotification,
  };

  const { top } = useSafeAreaInsets();

  return (
    <NotificationsContext.Provider value={value}>
      <View style={styles.container}>
        {children}
        <View
          style={[
            styles.notificationWrapper,
            { top: styles.notificationWrapper.top + top },
          ]}
        >
          <Notification
            text={notificationText}
            type={notificationType}
            resetNotification={resetNotification}
          />
        </View>
      </View>
    </NotificationsContext.Provider>
  );
};

function useNotifications() {
  const context = React.useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationsContext'
    );
  }
  return context;
}

export { NotificationsContextProvider, useNotifications };
