import config from './config';

export const getCookie = name => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const found = cookies.find(
      cookie => cookie.substring(0, name.length + 1) === `${name}=`
    );
    if (found) {
      cookieValue = decodeURIComponent(found.substring(name.length + 1));
    }
  }
  return cookieValue;
};

export const shareIndicator = id => {
  const url = new URL(window.location);
  url.searchParams.set('indicator', id);
  window.open(`https://twitter.com/intent/tweet?url=${escape(url.href)}`);
};

export const uploadImage = (id, data) =>
  fetch(`${config.url}/api/twitter_view/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({
      id,
      image: data
    })
  }).then(res => {
    if (res.status === 200) {
      return true;
    }

    return false;
  });
