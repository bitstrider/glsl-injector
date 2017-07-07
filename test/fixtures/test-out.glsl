
precision mediump float;
uniform vec2 iResolution;
float scalar = 1.0;
void mainImage(in vec2 fragCoord, out vec4 fragColor) {
  vec2 uv = fragCoord.xy / iResolution.xy;
  fragColor = vec4(uv, 1.0);
}
void main() {
  float s = scalar + 1.0;
  mainImage(gl_FragCoord.xy * scalar, gl_FragColor);
}