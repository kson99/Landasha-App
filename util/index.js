export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new Error("Uri to Blob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + "y ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + "mo ago";
  }

  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return interval + "w ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + "d ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + "h ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + "m ago";
  }

  if (seconds < 10) {
    return "just now";
  }

  return Math.floor(seconds) + "s ago";
};
