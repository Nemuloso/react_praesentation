#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

#define MATERIAL_BASE_IOR 0.04
#define CLEAR_COAT_IOR 0.14
#define MAX_MIPMAP_LEVEL 10.0

precision highp float;
precision highp int;

uniform vec3 cam_position;

uniform vec3 albedo1;
uniform vec3 albedo2;
uniform float colorRatio;
uniform float metallicFactor;
uniform float roughnessFactor;
uniform float aoFactor;

uniform sampler2D albedoMap;
uniform sampler2D normalMap;
uniform sampler2D metallicMap;
uniform sampler2D roughnessMap;
uniform sampler2D aoMap;

uniform samplerCube envMap;
uniform samplerCube diffuseIBLMap;
uniform sampler2D   brdfLUTMap;

uniform float clearCoat;
uniform float clearCoatRoughness;

varying vec2 tex_uv;
varying vec3 frag_position;
varying vec3 frag_normal;

vec4 SRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );
}

/**
 * THE BOOK OF SHADERS
 **/
float random (const in float x) {
    return fract(sin(x) * 43758.5453123);
}

/**
 * THE BOOK OF SHADERS
 **/
float random (const in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

/**
 * 3D Random function based on the functions from "The Book Of Shaders".
 **/
vec3 random (const in vec3 x) {
    vec2 ipos1 = floor(x.xy);  // get the integer coords
	vec2 ipos2 = floor(x.xz);  // get the integer coords
	vec2 ipos3 = floor(x.yz);  // get the integer coords

    // Assign a random value based on the integer coord
    vec3 value = vec3(random( ipos1 ));
	value += vec3(random( ipos2 ));
	value += vec3(random( ipos3 ));

	value /= 3.0;

	return value;
}

/**
 * 3D Noise function based on the functions from "The Book Of Shaders".
 **/
vec3 noise(const in vec3 x){
	float averageX = ( x.x + x.y + x.z ) / 3.0;
	float i = floor( averageX) ;  // integer
	float f = fract( averageX );  // fraction
	float u = f * f * ( 3.0 - 2.0 * f ); // custom cubic curve
	return mix(random( x * 10.0 ), random( x * 10.0 + 1.0 ), u); // using it in the interpolation
}

void decodeFakeHDR(inout vec4 color){
	color = SRGBToLinear(color) * 32.0;
	// color = color / (color + vec4(1.0));
    color = pow(abs(color), vec4(0.5));
}

/**
 * Inspired by developer.amd.com
 * This function can be thought of returning a flakes reflection as a rgb color.
 **/
vec3 sparkle(const in vec3 viewDir, const in vec3 reflectance, const in vec3 specular, const in float dist ){
	float glitterAmount = 2.7; // The bigger the value the less sparkles.
	float sparkleSize = random( length(frag_position) ) * dist * 16.0; // The bigger the value the smaller the sparkles.

	vec3 noise = noise( sparkleSize * frag_position );

	float specBase = length( specular );

	vec3 fp = fract(0.7 * frag_position + 9.0 * noise + 0.1 * viewDir);
	fp *= (1.0 - noise);
	float glitter = clamp(1.0 - glitterAmount * (fp.x + fp.y + fp.z), 0.0, 1.0);
	float sparkle = glitter * pow(specBase, 1.5);
	return vec3(sparkle) / dist;
}

/**
 * Calculate how much the surface reflects light versus how much it refracts light.
 * @param: float cosTheta The cosine of the angle between the normal and the view direction.
 * @param: vec3 F0 IOR (indices of refraction) value of the surface.
 * @param: float roughness The roughness factor of the microfacet surface.
 **/
vec3 fresnelSchlickRoughness(const in float cosTheta, const in vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(1.0 - cosTheta, 5.0);
}  

/**
You would need first to bake 3 textures (possibly 2) :
the mesh world space normals (the interpolated vertex normals)
the mesh world space tangents
the mesh world space binormals
The first one can currently be baked inside Designer (using the world space normals baker) but not the other two.
You may not need the third one if your target engine computes binormals per fragment instead of per vertex
(e.g. UE4 does the former, Unity does the latter). 
Provided you could bake all the required texture, you could then transform tangent space textures into world space using
the Pixel Processor. For each resulting output pixel you would need to read the corresponding tangent space normal
pixel (x,y,z), the corresponding world space mesh normal N, the corresponding mesh tangent T,
the corresponding mesh binormal B (or, if computing binormal per fragment, compute B as the cross product of N and T).
The result would be T*x+B*y+N*z (normalized). Converting in the other direction (from world space to tangent space) is a bit
more complicated (it involves inverting the 3x3 matrix formed with T, B and N).  
**/
vec3 getNormalFromNormalMap(){
	vec3 tangent = cross(vec3(1.0, 1.0, 1.0), frag_normal); // any vetor in the plane
	vec3 binormal = cross(tangent, frag_normal);

	vec3 normalRaw = texture2D(normalMap, tex_uv).rgb;
	normalRaw = normalize(normalRaw * 2.0 - 1.0);

	vec3 norm = tangent * normalRaw.x + binormal * normalRaw.y + frag_normal * normalRaw.z;
	return normalize(norm);
}

void applyClearCoat( const in float NdotV, const in vec3 reflectance, inout vec3 color ) {
	vec3 F0 = vec3(CLEAR_COAT_IOR); 
	vec3 F  = fresnelSchlickRoughness(NdotV, F0, clearCoatRoughness);

	vec2 clearCoatBRDF  = texture2D(brdfLUTMap, vec2(NdotV, clearCoatRoughness)).rg;
	vec4 clearCoatReflectionColor = textureCubeLodEXT(envMap, reflectance, 0.0);
	vec4 clearCoatColor = vec4 (clearCoatReflectionColor.rgb * (F * clearCoatBRDF.x + clearCoatBRDF.y), 1.0);

	// decodeFakeHDR(clearCoatColor);

	color += clearCoat * clearCoatColor.rgb;
}

void applyFlakes(const in float NdotV, const in vec3 viewDir, const in vec3 reflectance, const in vec3 specular,
	const in float dist, inout vec3 color){
    color += 10.0 * pow(NdotV, 15.0) * sparkle(viewDir, reflectance, specular, dist) / dist;
}

void main(){
    vec3 normal     = frag_normal;//getNormalFromNormalMap();
    float metallic  = metallicFactor;//texture2D(metallicMap, tex_uv).r;
    float roughness = roughnessFactor;//texture2D(roughnessMap, tex_uv).r;
    float ao        = aoFactor;//texture(aoMap, tex_uv).r;

	vec3 CmP		= cam_position - frag_position;
	float dist		= length(CmP);
	vec3 viewDir 	= normalize(CmP);
	float NdotV		= max(dot(normal, viewDir), 0.0);
	//vec3 albedo		= pow( abs( texture2D(albedoMap, tex_uv).rgb ), vec3(2.2) );
	vec3 albedo		= mix(albedo1, albedo2, pow( NdotV, 1.0/colorRatio ) );

	vec3 F0 = vec3(MATERIAL_BASE_IOR); 
	F0      = mix(F0, albedo, metallic);
	vec3 F  = fresnelSchlickRoughness(NdotV, F0, roughness);

	// reflectance equation
	vec3 kS = F;
	vec3 kD = 1.0 - kS;
	kD *= 1.0 - metallic;

	// ----- Specular IBL
	vec3 reflectance = reflect(-viewDir, normal);

	vec2 envBRDF  = texture2D(brdfLUTMap, vec2(NdotV, roughness)).rg;
	
	vec4 prefilteredColor = textureCubeLodEXT(envMap, reflectance, roughness * MAX_MIPMAP_LEVEL);
	vec4 specular = vec4( prefilteredColor.rgb * (F * envBRDF.x + envBRDF.y), 1.0 );
	
	// decodeFakeHDR(specular);
	// -----

	// ----- Diffuse IBL
	vec4 irradiance = textureCube(diffuseIBLMap, normal);//textureCubeLodEXT(envMap, normal, MAX_MIPMAP_LEVEL);//
	vec4 diffuse    = vec4(irradiance.rgb * albedo, 1.0);
	// decodeFakeHDR(diffuse);
	// -----
	
	vec3 color = (kD * diffuse.rgb + specular.rgb);

	// ----- Additional effects
	
	applyClearCoat(NdotV, reflectance, color);
	applyFlakes(NdotV, viewDir, reflectance, specular.rgb, dist, color);
	// -----
	
	color     *= ao;

	gl_FragColor = vec4(color,1.0);
}