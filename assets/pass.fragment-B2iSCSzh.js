import{S as r}from"./racers-DRLipHhQ.js";import"./motion-DdRQOMwq.js";import"./Fx-DtizJhdv.js";const e="passPixelShader",a=`varying vec2 vUV;uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);}`;r.ShadersStore[e]||(r.ShadersStore[e]=a);const i={name:e,shader:a};export{i as passPixelShader};
