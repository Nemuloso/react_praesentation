varying vec3 frag_position;

uniform samplerCube envMap;
  
void main()
{
    vec4 rawColor = textureCube(envMap, frag_position);
    rawColor = RGBEToLinear(rawColor);
    vec3 envColor = rawColor.rgb;
    
    envColor = envColor / (envColor + vec3(1.0));
    envColor = pow(envColor, vec3(1.0/2.2)); 
  
    gl_FragColor = vec4(envColor, 1.0);
}