import { gl, initWebGLContext } from "./webgl-context.js";
import loadTexture from "./load-texture.js";
import createProgram from "./shader-program.js";

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

async function init() {
    if (!initWebGLContext("renderCanvas")) {
        return;
    }
    gl.clearColor(0.2, 0.2, 0.2, 1);

    const program = await createProgram("assets/shaders/", "texture.vert", "texture.frag");

    const vertPositions = [
        -0.5, -0.5,
        0.5, -0.5,
        0.0, 0.5
    ];
    const vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertPositions), gl.STATIC_DRAW);
    const aPositionLocation = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPositionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPositionLocation);

    const texCoords = [
        0.0, 1.0,
        1.0, 1.0,
        0.5, 0.0
    ];
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    const aTexCoordLocation = gl.getAttribLocation(program, "aTexCoord");
    gl.vertexAttribPointer(aTexCoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aTexCoordLocation);

    const texture = await loadTexture("./assets/textures/texture.png", gl.LINEAR, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    draw();
}

init();
