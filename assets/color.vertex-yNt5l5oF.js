import{S as i}from"./racers-DRLipHhQ.js";import"./bakedVertexAnimation-BnZIql0M.js";import"./clipPlaneVertex-BIGE-SEA.js";import"./fogVertex-BBXJjSZM.js";import"./instancesDeclaration-wVWRpdm9.js";import"./vertexColorMixing-C5X1fg5C.js";import"./motion-DdRQOMwq.js";import"./Fx-DtizJhdv.js";const e="colorVertexShader",n=`attribute position: vec3f;
#ifdef VERTEXCOLOR
attribute color: vec4f;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#ifdef FOG
uniform view: mat4x4f;
#endif
#include<instancesDeclaration>
uniform viewProjection: mat4x4f;
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vColor: vec4f;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
#ifdef VERTEXCOLOR
var colorUpdated: vec4f=vertexInputs.color;
#endif
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
var worldPos: vec4f=finalWorld* vec4f(input.position,1.0);vertexOutputs.position=uniforms.viewProjection*worldPos;
#include<clipPlaneVertex>
#include<fogVertex>
#include<vertexColorMixing>
#define CUSTOM_VERTEX_MAIN_END
}`;i.ShadersStoreWGSL[e]||(i.ShadersStoreWGSL[e]=n);const s={name:e,shader:n};export{s as colorVertexShaderWGSL};
