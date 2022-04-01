import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk'
import { promiseAllN } from '../shared/utils.utils' 
import axios from 'axios'
const s3 = new S3({region: 'eu-north-1'});

enum FileStatus {
  PROCESSED,
  ERRORED,
  UNPROCESSED,
  NOT_EXISTING
}
enum FileType {
  IMAGE,
  VIDEO
}
type FileToUpload = {
  url: string,
  key: string, 
  stream: undefined | Promise<any>,
  content_type: string, 
  index: number, 
  status: FileStatus,
  errorCount: number,
  type: FileType
}
@Injectable()
export class UploadMediaService{
  private UPLOAD_RETRIES = 7
  async uploadFromWbToS3(wbId: string, sku: string){
    // const wb_id = product.id.toString()
    const wbImagesCounter = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const wbImagesUrl = wbImagesCounter.map(e => `https://images.wbstatic.net/big/new/${wbId.substring(0, 4)}0000/${wbId}-${e}.jpg`)
    const streamImages: FileToUpload[] = wbImagesUrl.map( (url, i) => ({
      url,
      key: `${sku}/${sku}-${i+1}.jpg`, 
      stream: undefined,
      content_type: 'image/jpeg', 
      index: i + 1, 
      status: FileStatus.UNPROCESSED,
      errorCount: 0,
      type: FileType.IMAGE
    }))
    const streamVideo: FileToUpload = { 
      url: `https://video.wbstatic.net/video/new/${wbId.substring(0, 4)}0000/${wbId}.mp4`,
      stream: undefined,
      key: `${sku}/${sku}-0.mov`,
      content_type: 'video/mp4',
      index: 0,
      status: FileStatus.UNPROCESSED,
      errorCount: 0, 
      type: FileType.VIDEO
    }
    const queue = [...streamImages, streamVideo]
    const processed: FileToUpload[] = []
    const processFile = async (file: FileToUpload) => {
      try {
        file.stream = axios({method: 'get', url: file.url, responseType: 'stream'}).then( ({ data })=> data);
        const result = await this.S3_Uploader(file)
        file.status = FileStatus.PROCESSED
        processed.push(file)
        return file
      } catch (error: any) {
        if (error.response && error.response.status == 404) { 
            file.status = FileStatus.NOT_EXISTING
        } else { 
          file.status = FileStatus.ERRORED;
          file.errorCount += 1
          //retry N times
          if (file.errorCount < this.UPLOAD_RETRIES) queue.push(file)
          else processed.push(file)
        }
      }
    }
    await promiseAllN(queue.map(i => processFile(i)), 5)
    // for await (const file of queue) {
    //   try {
    //     file.stream = axios({method: 'get', url: file.url, responseType: 'stream'}).then( ({ data })=> data);
    //     const result = await this.S3_Uploader(file)
    //     file.status = FileStatus.PROCESSED
    //     processed.push(file)
    //   } catch (error: any) {
    //     if (error.response && error.response.status == 404) { 
    //         file.status = FileStatus.NOT_EXISTING
    //     }
    //     else { 
    //       file.status = FileStatus.ERRORED;
    //       file.errorCount += 1
    //       //retry N times
    //       if (file.errorCount < this.UPLOAD_RETRIES) queue.push(file)
    //       else processed.push(file)
    //     }
    //   }
    // }
    const finalized = processed.sort((a, b) => a.index - b.index)
    const uploaded = finalized.filter(e => (e.status === FileStatus.PROCESSED))
    const errored = finalized.filter(e => (e.status === FileStatus.ERRORED))

    return { 
      processed: { 
        images: uploaded.filter(e => (e.type === FileType.IMAGE)).map(e => e.index.toString()),
        videos: uploaded.filter(e => (e.type === FileType.VIDEO)).map(e => e.index.toString())
      },
      errored: {
        images: errored.filter(e => (e.type === FileType.IMAGE)).map(e => e.index.toString()),
        videos: errored.filter(e => (e.type === FileType.IMAGE)).map(e => e.index.toString())
      }
    }
  }
  async S3_Uploader(file_obj: {stream: any, key: string, content_type: string}) {
    // Setting up S3 upload parameters
    const params = {
      Bucket: 'cdn.mytribes.ru',
      Key: file_obj.key,
      Body: await file_obj.stream,
      ContentType: file_obj.content_type,
      ACL:'public-read',
      CacheControl: 'max-age=31536000'
    }
    // Uploading files to the bucket
    return s3.upload(params).promise()
  }
}

function request_error_handler(error: any){
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}