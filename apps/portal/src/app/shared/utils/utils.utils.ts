import { environment } from "apps/portal/src/environments/environment";

export const resizedImgUrl = (key: string, width: number, height: number, fill='fill'): string => {
  const imageRequest = JSON.stringify({
    bucket: environment.cdnBucket,
    key,
    edits: {
      resize: {
        width,
        height,
        fill
      }
    }
  });
  if (typeof btoa === 'undefined') {
    return `${environment.cdn2Url}/${Buffer.from(imageRequest).toString('base64')}` 
  } else {
    return `${environment.cdn2Url}/${btoa(imageRequest)}`
  }
}
export const resizedImagesUrls = (images_paths: string[], width: number, height: number, fill = 'fill') => {
  return images_paths.map(src => {
    if (src.includes('https')) return src
    else return resizedImgUrl(src, width, height, fill)
  })
}