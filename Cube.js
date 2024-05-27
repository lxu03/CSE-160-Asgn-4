class Cube{
    constructor(color){
      this.type = "cube";
      this.color = color;
      this.matrix = new Matrix4();
      this.textureNum = -1;
      this.cubeVerts = new Float32Array([
        0,0,0, 1,1,0, 1,0,0,
        0,0,0, 0,1,0, 1,1,0,
        0,1,0, 1,1,1, 1,1,0,
        0,1,0, 0,1,1, 1,1,1,
        1,0,0, 1,1,1, 1,1,0,
        1,0,0, 1,0,1, 1,1,1,
        0,0,0, 0,0,1, 0,1,1,
        0,0,0, 0,1,1, 0,1,0,
        0,0,1, 0,1,1, 1,1,1,
        0,0,1, 1,1,1, 1,0,1,
        0,0,0, 0,0,1, 1,0,1,
        0,0,0, 1,0,1, 1,0,0
      ])
      this.cubeUvs = new Float32Array([
        0,0, -1, 1,-1,0,
        0,0, 0, 1, -1,1,
        0,0, 1, -1, 1,0,
        0,0, 0, -1, 1,-1,
        0,-1,-1, 0, 0,0,
        0,-1, -1, -1,-1, 0,
        -1,0, 0, 0,0, 1,
        -1,0,0, 1, -1,1,
        0,0, 0, 1, 1,1,
        0,0, 1, 1, 1,0,
        0,0, 0, -1, -1,-1,
        0,0, -1, -1, -1,0
      ])
      this.cubeNormals = new Float32Array([
        0,0,-1,0,0,-1,0,0,-1,
        0,0,-1,0,0,-1,0,0,-1,
        0,1,0,0,1,0,0,1,0,
        0,1,0,0,1,0,0,1,0,
        1,0,0,1,0,0,1,0,0,
        1,0,0,1,0,0,1,0,0,
        -1,0,0,-1,0,0,-1,0,0,
        -1,0,0,-1,0,0,-1,0,0,
        0,0,1,0,0,1,0,0,1,
        0,0,1,0,0,1,0,0,1,
        0,-1,0,0,-1,0,0,-1,0,
        0,-1,0,0,-1,0,0,-1,0,
      ])
    }
  
    render() {
      var rgba = this.color;

      gl.uniform1i(u_whichTexture, this.textureNum);
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
      //front
      drawTriangle3DUVNormal( [0,0,0, 1,1,0, 1,0,0], [0,0, -1, 1,-1,0] )
      drawTriangle3DUV( [0,0,0, 0,1,0, 1,1,0], [0,0, 0, 1, -1,1] )
      //top
      drawTriangle3DUV( [0,1,0, 1,1,1, 1,1,0], [0,0, 1, -1, 1,0] )
      drawTriangle3DUV( [0,1,0, 0,1,1, 1,1,1], [0,0, 0, -1, 1,-1] )
      //right side
      drawTriangle3DUV( [1,0,0, 1,1,1, 1,1,0], [0,-1,-1, 0, 0,0] )
      drawTriangle3DUV( [1,0,0, 1,0,1, 1,1,1], [0,-1, -1, -1,-1, 0] )
      //left side
      drawTriangle3DUV( [0,0,0, 0,0,1, 0,1,1], [-1,0, 0, 0,0, 1] )
      drawTriangle3DUV( [0,0,0, 0,1,1, 0,1,0], [-1,0,0, 1, -1,1] )
      //back
      drawTriangle3DUV( [0,0,1, 0,1,1, 1,1,1], [0,0, 0, 1, 1,1] )
      drawTriangle3DUV( [0,0,1, 1,1,1, 1,0,1], [0,0, 1, 1, 1,0] )
      //bottom
      drawTriangle3DUV( [0,0,0, 0,0,1, 1,0,1], [0,0, 0, -1, -1,-1] )
      drawTriangle3DUV( [0,0,0, 1,0,1, 1,0,0], [0,0, -1, -1, -1,0] )
    }

    renderFast() {
      var rgba = this.color;
      gl.uniform1i(u_whichTexture, this.textureNum);
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
      drawTriangle3DUVNormal(this.cubeVerts, this.cubeUvs, this.cubeNormals);
    }

    renderFaster() {
      var rgba = this.color;
      gl.uniform1i(u_whichTexture, this.textureNum);
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
      if(g_vertexBuffer == null) {
        initTriangle3D()
      }
      gl.bufferData(gl.ARRAY_BUFFER, this.cubeVerts, gl.DYNAMIC_DRAW)
      if(g_uvBuffer == null) {
        initTriangleUV()
      }
      gl.bufferData(gl.ARRAY_BUFFER, this.cubeUvs, gl.DYNAMIC_DRAW);
      if(g_normalBuffer == null) {
        initTriangleNormal()
      }
      gl.bufferData(gl.ARRAY_BUFFER, this.cubeNormals, gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.TRIANGLES, 0, 36)
    }
}
