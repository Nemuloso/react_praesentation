precision highp float;
precision highp int;

attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 rotationMatrix;

varying vec3 frag_position;

void main()
{
    frag_position = position;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition; 
}