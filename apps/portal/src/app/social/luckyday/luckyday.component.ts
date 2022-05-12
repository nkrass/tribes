import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { SEOService } from '../../../app/shared/seoservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
import { DOCUMENT } from '@angular/common';
const staticAssetsUrl = environment.staticAssetsUrl


@Component({
  selector: 'tribes-social-luckyday',
  templateUrl: './luckyday.component.html',
  styleUrls: ['./luckyday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialLuckydayComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  public seoData!: {title: string, description: string}
  public staticAssetsUrl = staticAssetsUrl
  constructor(
    private seo: SEOService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document, 
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.seo.currentRouteData$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.seo.setTitle('❤️Твой лучший день - сегодня! 🛍TRIBES ® - Больше своего времени')
      this.cdr.markForCheck()
    })
  }
//   ngAfterViewInit(){
//     // this.createScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r127/three.min.js')
//     // this.createScript('https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js')
//     // this.createScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-nft.js')

//     // this.renderer()
//   }
//   createScript(url: string){
//     var s = this.doc.createElement("script");
//     s.type = "text/javascript";
//     s.src = url;
//     this.elementRef.nativeElement.appendChild(s);
//   }
//   renderer(){
//     var s = this.doc.createElement("script");
//     s.type = "text/javascript";
//     s.innerHTML = `
//     var renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       precision: 'mediump',
//   });

//   var clock = new THREE.Clock();

//   var mixers = [];

//   renderer.setPixelRatio(window.devicePixelRatio);

//   renderer.setClearColor(new THREE.Color('lightgrey'), 0)
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   renderer.domElement.style.position = 'absolute'
//   renderer.domElement.style.top = '0px'
//   renderer.domElement.style.left = '0px'
//   document.body.appendChild( renderer.domElement );

//   // init scene and camera
//   var scene = new THREE.Scene();

//   //////////////////////////////////////////////////////////////////////////////////
//   //		Initialize a basic camera
//   //////////////////////////////////////////////////////////////////////////////////

//   // Create a camera
//   var camera = new THREE.Camera();
//   scene.add(camera);

//   var light = new THREE.AmbientLight(0xffffff);
//   scene.add(light);

//   ////////////////////////////////////////////////////////////////////////////////
//   //          handle arToolkitSource
//   ////////////////////////////////////////////////////////////////////////////////

//   var arToolkitSource = new THREEx.ArToolkitSource({
//       sourceType : 'webcam',
//       sourceWidth: 480,
//       sourceHeight: 640,
//   })

//   arToolkitSource.init(function onReady(){
//       // use a resize to fullscreen mobile devices
//       setTimeout(function() {
//           onResize()
//       }, 1000);
//   })

//   // handle resize
//   window.addEventListener('resize', function(){
//       onResize()
//   })

//   // listener for end loading of NFT marker
//   window.addEventListener('arjs-nft-loaded', function(ev){
//     console.log(ev);
//   })

//   function onResize(){
//       arToolkitSource.onResizeElement()
//       arToolkitSource.copyElementSizeTo(renderer.domElement)
//       if( arToolkitContext.arController !== null ){
//           arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
//       }
//   }

//   ////////////////////////////////////////////////////////////////////////////////
//   //          initialize arToolkitContext
//   ////////////////////////////////////////////////////////////////////////////////

//   // create atToolkitContext
//   var arToolkitContext = new THREEx.ArToolkitContext({
//       detectionMode: 'mono',
//       canvasWidth: 480,
//       canvasHeight: 640,
//   }, {
//       sourceWidth: 480,
//       sourceHeight: 640,
//   })

//   // initialize it
//   arToolkitContext.init(function onCompleted(){
//       // copy projection matrix to camera
//       camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
//   })

//   ////////////////////////////////////////////////////////////////////////////////
//   //          Create a ArMarkerControls
//   ////////////////////////////////////////////////////////////////////////////////

//   // init controls for camera
//   var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
//       type : 'nft',
//       descriptorsUrl : 'static/img/luckyday/luckyday_qr.iset',
//       changeMatrixMode: 'cameraTransformMatrix'
//   })

//   scene.visible = false

//   var root = new THREE.Object3D();
//   scene.add(root);

//   //////////////////////////////////////////////////////////////////////////////////
//   //		add an object in the scene
//   //////////////////////////////////////////////////////////////////////////////////

//   var threeGLTFLoader = new THREE.GLTFLoader();
//   var model;

//   threeGLTFLoader.load("static/img/luckyday/flamingo.glb", function (gltf) {
//       model = gltf.scene.children[0];
//       model.name = 'Flamingo';

//       var animation = gltf.animations[0];
//       var mixer = new THREE.AnimationMixer(model);
//       mixers.push(mixer);
//       var action = mixer.clipAction(animation);
//       action.play();

//       root.matrixAutoUpdate = false;
//       root.add(model);

//       model.position.z = -200;
//       model.position.x = 100;
//       model.position.y = 100;


//       //////////////////////////////////////////////////////////////////////////////////
//       //		render the whole thing on the page
//       //////////////////////////////////////////////////////////////////////////////////

//       var animate = function() {
//           requestAnimationFrame(animate);

//           if (mixers.length > 0) {
//               for (var i = 0; i < mixers.length; i++) {
//                   mixers[i].update(clock.getDelta());
//               }
//           }

//           if (!arToolkitSource.ready) {
//               return;
//           }

//           arToolkitContext.update( arToolkitSource.domElement )

//           // update scene.visible if the marker is seen
//           scene.visible = camera.visible;

//           renderer.render(scene, camera);
//       };

//       requestAnimationFrame(animate);
//   }
// );
//     `
//     this.elementRef.nativeElement.appendChild(s);
//   }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
