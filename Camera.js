class Camera {
    constructor() {
        this.fov = 60.0;
        this.eye = new Vector3([-0.5,0,3])
        this.at = new Vector3([-0.5,0,-1])
        this.up = new Vector3([0,1,0])
        this.viewMatrix = new Matrix4()
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2])
        this.projectionMatrix = new Matrix4()
        this.projectionMatrix.setPerspective(this.fov, canvas.width/canvas.height, 0.1, 1000)
    }

    moveForward() {
        let f = new Vector3()
        f.set(this.at)
        f.sub(this.eye)
        f.normalize();
        f.mul(0.25)
        this.eye.add(f)
        this.at.add(f)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2])
    }

    moveBackward() {
        let b = new Vector3()
        b.set(this.eye)
        b.sub(this.at)
        b.normalize();
        b.mul(0.25)
        this.eye.add(b)
        this.at.add(b)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2])
    }

    moveLeft() {
        let f = new Vector3();
        let s = new Vector3();
        f.set(this.at)
        f.sub(this.eye)
        s = Vector3.cross(this.up, f)
        s.normalize()
        s.mul(0.25)
        this.eye.add(s)
        this.at.add(s)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2])
    }

    moveRight() {
        let f = new Vector3();
        let s = new Vector3();
        f.set(this.at)
        f.sub(this.eye)
        s = Vector3.cross(f, this.up)
        s.normalize()
        s.mul(0.25)
        this.eye.add(s)
        this.at.add(s)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2]) 
    }

    moveUp() {
        this.eye.add(this.up)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2]) 
    }

    moveDown() {
        this.eye.sub(this.up)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2]) 
    }

    panLeft(degrees) {
        let f = new Vector3();
        f.set(this.at)
        f.sub(this.eye)
        let rotationMatrix = new Matrix4()
        rotationMatrix.setRotate(degrees, this.up.elements[0], this.up.elements[1], this.up.elements[2])
        let f_prime = new Vector3()
        f_prime = rotationMatrix.multiplyVector3(f)
        let temp = new Vector3()
        temp.set(this.eye)
        this.at = temp.add(f_prime)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2]) 
    }

    panRight(degrees) {
        let f = new Vector3();
        f.set(this.at)
        f.sub(this.eye)
        let rotationMatrix = new Matrix4()
        rotationMatrix.setRotate(-degrees, this.up.elements[0], this.up.elements[1], this.up.elements[2])
        let f_prime = new Vector3()
        f_prime = rotationMatrix.multiplyVector3(f)
        let temp = new Vector3()
        temp.set(this.eye)
        this.at = temp.add(f_prime)
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
            this.at.elements[0], this.at.elements[1], this.at.elements[2], 
            this.up.elements[0], this.up.elements[1], this.up.elements[2]) 
    }

    panUp() {
        this.at.elements[1] += 0.1
    }

    panDown() {
        this.at.elements[1] -= 0.1
    }
}