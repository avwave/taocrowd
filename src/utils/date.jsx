const timeAgo = (isoDateString) => {
  const date = new Date(isoDateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // Convert milliseconds to seconds


  if (diff < 60) {
    return `${diff} seconds ago`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diff < 2592000) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  }
}


export { timeAgo }