import socket from 'utils/socket';

export default function setTitle(contentId, title = '') {
  socket.emit('setTitle', {contentId, title, p: window.P});
}
