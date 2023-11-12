import {useState, useEffect, ReactNode} from 'react';

type UseAutoLogoutProps = {
  inactivityTimeInSeconds: number;
  logoutCallback: () => void;
  children: ReactNode;
};

export function useAutoLogout({
  inactivityTimeInSeconds,
  logoutCallback,
  children,
}: UseAutoLogoutProps) {
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Function to reset the logout timer
    const resetLogoutTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        // Call the logout callback when the user is inactive for the specified time
        logoutCallback();
      }, inactivityTimeInSeconds * 1000);

      setLogoutTimer(timeoutId);
    };

    // Event handler for user activity
    // Initialize the logout timer
    resetLogoutTimer();

    // Cleanup when the component unmounts
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [inactivityTimeInSeconds, logoutCallback, logoutTimer]);

  return children as ReactNode;
}
