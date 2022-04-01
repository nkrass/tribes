import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { SEOService } from '../../shared/seoservice.service';
import { BehaviorSubject, catchError, map, of, pluck, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment'
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {Html5QrcodeScanner, Html5Qrcode, Html5QrcodeSupportedFormats} from "html5-qrcode"
import { ActivatedRoute } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { CreateItemGQL, CreateItemMutation } from '@tribes/data-access';
import SwiperCore, { Pagination, Zoom, Navigation, Mousewheel, FreeMode } from "swiper";
import { ColorsDictionary } from 'libs/colors-dictionary/src';
SwiperCore.use([Pagination, Zoom, Navigation, Mousewheel, FreeMode]);

const staticAssetsUrl = environment.staticAssetsUrl

interface LocalState {
  isLoading: boolean
  item: CreateItemMutation['createItem']| null
  size: string|null
  id: string|null
  cameraState: number
}

@Component({
  selector: 'tribes-scan-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ScanToRegisterComponent implements OnDestroy {
  public seoData!: {title: string, description: string}
  public staticAssetsUrl = staticAssetsUrl
  public html5QrCode?: Html5Qrcode;
  public html5QrcodeScanner?: Html5QrcodeScanner
  public colorsDict = ColorsDictionary.getColorName
  public cameraId?: string
  barcodeInput$ = new Subject<string>()
  cameraStateInput$ = new BehaviorSubject<number>(0)
  cameraState$ = this.state.select('cameraState')
  saveItem$ = new Subject<any>()
  item$ = this.state.select('item')

  constructor(
    private route: ActivatedRoute,
    private seo: SEOService,
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef,
    private createItemGql: CreateItemGQL,
    private state: RxState<LocalState>,
    @Inject(DOCUMENT) private doc: Document, 
    @Inject(PLATFORM_ID) private platformId: typeof PLATFORM_ID,
    private elementRef: ElementRef
  ) {
    this.state.connect(this.cameraStateInput$.pipe( map(cameraState => ({ cameraState })) ))
    this.state.connect(this.route.paramMap.pipe(
      map((param) => ({ size: param.get('size'), id: param.get('id') }) )
    ))
    this.state.connect(this.barcodeInput$.pipe(switchMap(scannedCode => {
      const code = scannedCode.toLocaleLowerCase()
      const size = this.state.get('size') as string
      const id = this.state.get('id') as string
      if (code.slice(14,16) !== size) { 
        alert("Размер и баркод не совпадают. Перепроверьте код и попробуйте снова.")
        return of({size, id})
      }
      return this.createItemGql.mutate({ 
        input: { productBarcode: code, registered: true, id } 
      }).pipe(
        pluck('data', 'createItem'), 
        tap((item: CreateItemMutation['createItem']|any) => {
          alert(`Товар успешно зарегистрирован. Ваш код: ${item.id} и ваш товарный артикул: ${item.barcode?.barcode}`)
          this.html5QrCode?.clear()
        }),
        map((item) => {
          if (!item.barcode) throw new Error('Не удалось зарегистрировать товар, так он не найден в базе. Возможно, он появится в системе через пару дней. Попробуйте регистрацию позже.')
          return { size, id, item }
        }),
        catchError(error => {
          alert(`Ошибка при регистрации товара: ${error}`)
          return of({size, id})
        })
        
      )
    })), (state, data: Partial<LocalState>) => ({...state, ...data}))
   }
  onScanSuccess(decodedText: string, decodedResult: any) {
    // handle the scanned code as you like, for example:
    // alert(`Code matched = ${decodedText}, ${decodedResult}`);
    this.barcodeInput$.next(decodedText)
    this.html5QrCode?.stop()
    this.cameraStateInput$.next(this.html5QrCode?.getState() || 1)
    // this.onToggle()
  }
  onScanFailure(error: string) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
    this.cameraStateInput$.next(this.html5QrCode?.getState() || 1)
  }
  private async initCamera(){
    try {
      const devices = await Html5Qrcode.getCameras()
      if (devices && devices.length) this.cameraId = devices[0].id;
      console.log(devices)
      this.html5QrCode = new Html5Qrcode("reader", 
        { 
          // formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.CODE_128],
          verbose: false,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          }
        });
    } catch (error) {
      alert(error)
    }
  }
  async onToggle() {
    if (isPlatformBrowser(this.platformId)){
      if (!this.html5QrCode) await this.initCamera()
      switch(this.html5QrCode?.getState()){
        case 1: { // NOT_STARTED {
          this.html5QrCode.start({ 
            facingMode: 'environment',
            // deviceId: { 
            //     exact: this.cameraId
            //   }
            }, 
            { 
              fps: 3, 
              // qrbox: {
              //   // width: 350, 
              //   // height: 350
              // }
            },
            this.onScanSuccess.bind(this), this.onScanFailure.bind(this)
          );
          this.cameraStateInput$.next(this.html5QrCode?.getState() || 1)
          break;
        }
        case 2: { // SCANNING {
          this.html5QrCode.pause();
          this.cameraStateInput$.next(this.html5QrCode?.getState() || 1)
          break;
        }
        case 3: { // PAUSED {
          this.html5QrCode.resume();
          this.cameraStateInput$.next(this.html5QrCode?.getState() || 1)
          break;
        }
      }    
      // this.cdr.markForCheck();
    }
  }
  scrollTo(id: string){
    this.elRef.nativeElement.querySelector('#' + id).scrollIntoView();
  }
  ngOnDestroy() {
    // this.html5QrcodeScanner?.clear()
    this.html5QrCode?.clear()
  }
}
