varying vec3 frag_position;

// TODO: create raw shader variant

void main()	{
    frag_position = position;

    mat4 rotView = mat4(mat3(viewMatrix)); // remove translation from the view matrix
    vec4 clipPos = projectionMatrix * rotView * vec4(position, 1.0);

    gl_Position = clipPos.xyww;
}