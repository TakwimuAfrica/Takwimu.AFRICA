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

export const uploadImage = (id, dataUrl) =>
  // TODO(kilemensi): We'll continue uploading images to takwimu.africa -> s3
  // until we have this functionality in WP
  fetch('https://takwimu.africa/api/twitter_view/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({
      id,
      image: dataUrl
    })
  }).then(res => {
    if (res.status === 200) {
      return true;
    }

    return false;
  });

export const shareIndicator = (id, e, dataUrl) => {
  uploadImage(id, dataUrl).then(success => {
    if (success) {
      const url = new URL(window.location);
      url.searchParams.set('indicator', id);
      window.open(`https://twitter.com/intent/tweet?url=${escape(url.href)}`);
    }
  });
};
