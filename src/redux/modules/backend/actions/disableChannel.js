import socket from 'utils/socket';

export default function disableChannel(contentId) {
  socket.emit('disableChannel', {contentId, p: window.P});
}
