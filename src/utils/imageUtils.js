import Resizer from 'react-image-file-resizer'

export const resizeFile = (file) =>
  new Promise((resolve, reject) => {
    const outputFormat = file.type === 'image/png' ? 'PNG' : 'JPEG'
    const outputMimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'

    Resizer.imageFileResizer(
      file,
      500,
      500,
      outputFormat,
      90,
      0,
      (uri) => {
        fetch(uri)
          .then((res) => res.blob())
          .then((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: outputMimeType,
              lastModified: Date.now(),
            })
            resolve(resizedFile)
          })
          .catch(reject)
      },
      'base64',
      500,
      500
    )
  })
