precision highp float;
precision highp int;

varying vec3 frag_position;

uniform sampler2D equirectangularMap;

vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}

const vec2 invAtan = vec2(0.1591, 0.3183);
vec2 SampleSphericalMap(vec3 v)
{
    vec2 uv = vec2(atan(v.z, v.x), asin(v.y));
    uv *= invAtan;
    uv += 0.5;
    return uv;
}

void main()
{		
    vec2 uv = SampleSphericalMap(normalize(frag_position)); // make sure to normalize localPos
    vec4 color = texture2D(equirectangularMap, uv);

    color = RGBEToLinear(color);
    color.rgb = color.rgb / (color.rgb + vec3(1.0));
    color.rgb = pow(abs(color).rgb, vec3(1.0/2.2)); 
    
    gl_FragColor = color;
}