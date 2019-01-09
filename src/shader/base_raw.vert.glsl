precision highp float;
precision highp int;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 frag_position;
varying vec3 frag_normal;
varying vec2 tex_uv;
varying vec3 view_position;

void main()	{
    frag_position = position;
	frag_normal = normal;
    tex_uv = uv;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}