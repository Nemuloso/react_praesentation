precision highp float;
precision highp int;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 rotationMatrix;

varying vec3 frag_position;
varying vec3 frag_normal;
varying vec2 tex_uv;

void main()	{
    frag_position = (rotationMatrix * vec4(position, 1.0) ).xyz;
	frag_normal = (rotationMatrix * vec4(normal, 1.0) ).xyz;
    tex_uv = uv;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}