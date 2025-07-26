window.onload = ->

  # camera
  camera = new THREE.PerspectiveCamera 70, window.innerWidth / window.innerHeight, 1, 500
  camera.position.set 0, 0, -75
  camera.lookAt new THREE.Vector3(0, 0, 0)

  # canvas
  container = document.createElement 'div'
  document.body.appendChild container

  # renderer
  renderer = new THREE.WebGLRenderer antialias: yes
  renderer.setSize window.innerWidth, window.innerHeight
  renderer.autoClear = no
  container.appendChild renderer.domElement

  # scene
  scene = new THREE.Scene
  scene.fog = new THREE.Fog 0x000000, 25, 150

  # render loop
  render = ->
    torus.update()                # update the torus for this frame
    renderer.clear yes, yes, yes  # clear the canvas and all buffers
    renderer.render scene, camera # render the scene with the camera
    requestAnimationFrame render  # schedule next frame rander

  # Object to track mouse state during dragging.
  mouse =
    down: no # is the mouse clicked down
    last:    # last coordinates of dragging mouse
      x: 0   
      y: 0   

  ##
  # Bind mouse events to animate orbiting
  #

  # Start orbiting on mousedown
  renderer.domElement.addEventListener 'mousedown', (event) ->
    mouse.down = yes
    mouse.last.x = event.clientX
    mouse.last.y = event.clientY

  # Stop orbiting on mouse up
  renderer.domElement.addEventListener 'mouseup', (event) ->
    mouse.down = no

  # Rotate torus on x and z axes while mouse is down
  renderer.domElement.addEventListener 'mousemove', (event) ->
    return unless mouse.down

    # Calculate amount to rotate since the last mousemove event.
    diff =
      x: (mouse.last.x - event.clientX) * 3 / window.innerWidth
      y: (mouse.last.y - event.clientY) * 3 / window.innerHeight

    # Set a new last position.
    mouse.last.x = event.clientX
    mouse.last.y = event.clientY

    # Rotate the torus.
    torus.particles.rotation.z += diff.x
    torus.particles.rotation.x += diff.y

  # The torus
  torus =

    # rotation speeds on all 3 axes
    rotationSpeedX: 0.01
    rotationSpeedY: 0.01
    rotationSpeedZ: 0.01

    # speed of torus involution
    involutionSpeed: 0.01

    # current involution amount
    involution: 0

    # Size of each particle
    size: 4

    # radius to the center of the ring
    r1: 20

    # radius of the ring
    r2: 10
    border: /border=1/.test(window.location.search)

    # number of particles
    qty:

      # number of torus chips
      chips: 12

      # fidelity of each chip
      segments: 36

    # Initializes the torus, sets up 3D objects, particles and materials.
    init: ->

      # Create a geometry object and populate it with vertices.
      # No need to position them yet, we do that every frame.
      @geometry = new THREE.Geometry
      for u in [0...@qty.segments]
        for v in [0...@qty.chips]

          # Create vertex and save it's u and v with it.
          vert = new THREE.Vector3
          vert.u = u / @qty.segments
          vert.v = v / @qty.chips

          # Add the vertex to the geometry and set a color for it.
          @geometry.vertices.push vert
          @geometry.colors.push new THREE.Color().setHSV(vert.v, 1, 1)

      # Create the particle system with our geometry and a simple material
      #   (material's fragment shader is hacked below)
      @particles = new THREE.ParticleSystem(
        @geometry
        new THREE.ParticleBasicMaterial(
          vertexColors: THREE.VertexColors  # use the vertex colors set above
          transparent: yes                  # allows particles to render over each other
        )
      )

      # A rotating, involuting torus covered in particles definately needs to be
      # depth sorted to draw properly.
      @particles.sortParticles = yes

      # add the particle system to the scene
      scene.add @particles

    # Remove the current torus and generate a new one. Needs to be done when updating a value
    # used in init().
    restart: ->
      # save current rotation of old torus
      oldRotation = @particles.rotation

      # remove the old torus form the scene
      scene.remove @particles

      # rereate the new torus
      @init()

      # reapply the rotation vector of the old torus to the new one.
      @particles.rotation = oldRotation

    # Applies animation on each frame.
    update: ->
      
      # update the particle size
      @particles.material.size = @size

      # add rotation speeds to to the torus rotation
      @particles.rotation.x += @rotationSpeedX / 60
      @particles.rotation.y += @rotationSpeedY / 60
      @particles.rotation.z += @rotationSpeedZ / 60

      # add involution speed to curent involution amount
      @involution += @involutionSpeed / 60

      # loop through each vertex and update the position according to current torus config
      for vert in @geometry.vertices
        vert.copy @placeVert(
          u: vert.u
          v: vert.v
          r1: @r1
          r2: @r2
          involution: @involution
        )

      # bust vertex cache so the new vertex data is loaded
      @geometry.verticesNeedUpdate = yes

    # Stops all motion by setting all speeds to zero.
    stopAnimation: ->
      @rotationSpeedX = 0
      @rotationSpeedY = 0
      @rotationSpeedZ = 0
      @involutionSpeed = 0

    # Given a u, v and involution, it returns a vector that represents the position of point on the torus.
    # Each is key in `options` normalized zero to one, representing how far around the circle the value is.
    #
    #   Required keys: u, v, involution
    placeVert: (options = {}) ->
      r1 = options.r1
      r2 = options.r2

      # convert from 0 to 1 to 0 to 2*PI
      u = options.u * 2 * Math.PI
      v = options.v * 2 * Math.PI

      # update v to make a holochip, instead of a simple ring
      v += u

      # update u with current involution amount
      u += options.involution * 2 * Math.PI

      # convert u, v to torus coordinates according to the standard torus formula
      new THREE.Vector3(
        (r1 + r2 * Math.cos(u)) * Math.cos(v)
        (r1 + r2 * Math.cos(u)) * Math.sin(v)
        r2 * Math.sin(u) * 1.6180339887 # PHI
      )

  ## CRAZY SHADER HACK!
  # 
  # The following code hacks the THREE.js shader for basic particles. This is nasty, but it was easier than rewriting
  # everything the default does from scratch.
  #
  # The hack makes the particles circles, and optionally adds a black border on the edge of the circle.
  #
  shaderLines = THREE.ShaderLib.particle_basic.fragmentShader.split("\n")
  shaderLines[shaderLines.length - 1] =
    """
      // custom shader
      
      vec4 circle = vec4(
        vec3(
          #{ if /border=1/.test(window.location.search) then "smoothstep(0.4, 0.37, length(gl_PointCoord - vec2(0.5)))" else "1.0" }
        ),
        smoothstep(0.5, 0.47, length(gl_PointCoord - vec2(0.5)))
      );
      
      gl_FragColor *= circle;

      // end custom shader
    }
    """
  THREE.ShaderLib.particle_basic.fragmentShader = shaderLines.join("\n")

  # Create the first torus!
  torus.init()

  # Start animation!
  render()

  # Initialize DAT GUI!
  gui = new dat.GUI
  gui.add(torus, 'r1', 0, 50).step 0.01
  gui.add(torus, 'r2', 0, 50).step 0.01
  gui.add(torus, 'size', 1, 10).step 0.01

  gui.add(torus.qty, 'chips',    1, 250).step(1).onChange -> torus.restart()
  gui.add(torus.qty, 'segments', 3, 250).step(1).onChange -> torus.restart()
  gui.add(torus, 'border').onChange (val) -> window.location.href = "?border=#{ if val then 1 else 0 }"

  gui.add(torus, 'involutionSpeed', -.5, .5).listen()
  gui.add(torus, 'rotationSpeedX').min(-1.5).max(1.5).listen()
  gui.add(torus, 'rotationSpeedY').min(-1.5).max(1.5).listen()
  gui.add(torus, 'rotationSpeedZ').min(-1.5).max(1.5).listen()

  gui.add(torus, 'stopAnimation')

  # Set all animation speed properties to zero. They started with a positive decimal value
  # just to force DAT GUI to display decimal percision.
  torus.rotationSpeedX = 0
  torus.rotationSpeedY = 0
  torus.rotationSpeedZ = 0
  torus.involutionSpeed = 0