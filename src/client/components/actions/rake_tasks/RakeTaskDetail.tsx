import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';

const RakeTaskDetail: React.FC = () => {
  const currentTask = useOutletContext<string>();
  const [task, setTask] = useState<string>(currentTask);
  const termContainer = useRef(null);
  useEffect(() => {
    setTask(currentTask);
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(new WebLinksAddon());
    term.loadAddon(fitAddon);
    term.options.disableStdin = true;
    if (!termContainer.current) return;

    const fetchTerminal = async () => {
      const data = await fetch('/api/v1/terminals', { method: 'POST' });
      const pid = await data.text();

      const socket = new WebSocket(
        'ws://localhost:8050/api/v1/terminals/' + pid
      );
      socket.onopen = () => {
        term.loadAddon(new AttachAddon(socket, { bidirectional: false }));
        socket.send(`bundle exec rake ${task}\n`);
      };
    };
    term.open(termContainer.current);
    fetchTerminal();
  }, [currentTask]);

  return (
    <Box>
      <h1>{`Task: rake ${currentTask}`}</h1>
      <div>
        <div ref={termContainer} style={{ pointerEvents: 'none' }}></div>
      </div>
    </Box>
  );
};

export default RakeTaskDetail;
