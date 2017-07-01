import socket from 'utils/socket';

export default function enableChannel(contentId) {
  socket.emit('enableChannel', {contentId, p: window.P});
}
