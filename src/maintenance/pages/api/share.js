import AWS from 'aws-sdk';

export default (req, res) => {
  const { id, dataUrl } = req.body;
  if (id && dataUrl) {
    const ext = dataUrl.split(';')[0].split('/')[1];
    const Body = Buffer.from(
      dataUrl.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    // Use S3 ManagedUpload class as it supports multipart uploads
    AWS.config.update({
      accessKeyId: process.env.HURUMAP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.HURUMAP_AWS_SECRET_ACCESS_KEY,
      region: process.env.HURUMAP_AWS_REGION
    });
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: process.env.HURUMAP_AWS_S3_BUCKET,
        Key: `media/images/${id}.${ext}`,
        Body,
        ContentEncoding: 'base64',
        ContentType: `image/${ext}`,
        ACL: 'public-read'
      }
    });
    const promise = upload.promise();
    return promise.then(
      () => {
        res.statusCode = 200;
        res.end('');
        return res.statusCode;
      },
      () => {
        res.statusCode = 500;
        res.end('');
        return res.statusCode;
      }
    );
  }
  res.statusCode = 400;
  res.end('');
  return res.statusCode;
};
