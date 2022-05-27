/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react';

const useVRisingServerStatus = () => {
  const [status, setStatus] = useState<'online' | 'offline'>('offline');

  const checkServerStatus = useCallback(() => {
    window.electron.isVRisingServerRunning((isRunning) => {
      setStatus(isRunning ? 'online' : 'offline');
    });
  }, []);

  useEffect(() => {
    checkServerStatus();
    window.electron.ipcRenderer.on('server-status-changed', (server) => {
      setStatus(server as 'online' | 'offline');
    });
  }, [checkServerStatus]);

  return { status, checkServerStatus };
};

export default useVRisingServerStatus;
