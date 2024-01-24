/**
 * @author andreasl
 *
 * Additive horizontal linear blur.
 */

AdditiveLinearBlurHorizontalShader = {
  uniforms: {
    tDiffuse: { type: "t", value: null },
    offsetPerPixel: { type: "f", value: 0.0 }, // usually something like :=   1.0 / canvas.width
  },

  vertexShader: [
    "varying vec2 vUv;",

    "void main() {",
    "vUv = uv;",
    //"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "gl_Position = vec4( position, 1.0 );", // seems to be sufficient
    "}",
  ].join("\n"),

  fragmentShader: [
    "#define STEP 2.4",
    "#define RADIUS 24.0", // shd be a multiple of STEP
    "#define COVERING_POWER .8", // use this value to adjust the blur part

    "uniform sampler2D tDiffuse;",
    "uniform float offsetPerPixel;",

    "varying vec2 vUv;",

    "void main() {",
    "    vec4 sum = vec4(.0,.0,.0,.0);",
    "    float divisor = 0.0;",
    "    for( float offset = -RADIUS ; offset < .0; offset += STEP) {",
    "        float weight = RADIUS + 1.0 - abs(offset);",
    "        sum += weight * texture2D( tDiffuse, vUv + vec2( offset * offsetPerPixel, 0.0));",
    "        divisor += weight;",
    "    }",
    "    for( float offset = STEP ; offset < RADIUS; offset += STEP) {",
    "        float weight = RADIUS + 1.0 - abs(offset);",
    "        sum += weight * texture2D( tDiffuse, vUv + vec2( offset * offsetPerPixel, 0.0));",
    "        divisor += weight;",
    "    }",
    "    gl_FragColor = 2.0 * texture2D(tDiffuse, vUv) + COVERING_POWER * (sum / divisor);",
    "}",
  ].join("\n"),
};
