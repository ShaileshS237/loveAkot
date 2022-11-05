import { Injectable } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImagecompressService {

  constructor(private imageCompress: NgxImageCompressService) {}
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
 
  compressFile() {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
      this.imageCompress.compressFile(image, orientation, 70, 70).then(
        result => {
          this.imgResultAfterCompress = result;
          console.log(this.imgResultAfterCompress);
          
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
      
    });
}
}
