/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let cursors;
let player;
let showDebug = false;
let promptText;
let eKey;
let hKey;
let activePoint = null;
let debugText;
let speed = 175;
let gameEnded = false;

function preload() {
  this.load.image("tiles", "./assets/tilesets/tuxmon-sample-32px-extruded.png");
  this.load.tilemapTiledJSON("map", "./assets/tilemaps/tuxemon-town.json");

  // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
  // the player animations (walking left, walking right, etc.) in one image. For more info see:
  //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
  // If you don't use an atlas, you can do the same thing with a spritesheet, see:
  //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
  this.load.atlas(
    "atlas",
    "./assets/atlas/atlas.png",
    "./assets/atlas/atlas.json",
  );
}

function create() {
  const map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createLayer("World", tileset, 0, 0);
  const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // Set physics bounds
  this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = map.findObject(
    "Objects",
    (obj) => obj.name === "Spawn Point",
  );

  // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
  player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    .setSize(30, 40)
    .setOffset(0, 24);

  player.setCollideWorldBounds(true);

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(player, worldLayer);

  // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  const anims = this.anims;
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-left-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-right-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-front-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-back-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  cursors = this.input.keyboard.createCursorKeys();

  // on-screen debug readout
  debugText = this.add
    .text(16, 550, "", {
      font: "14px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000aa",
      padding: { x: 8, y: 4 },
    })
    .setScrollFactor(0)
    .setDepth(30);

  // floating "Press E" prompt, hidden by default
  promptText = this.add
    .text(0, 0, "Presione E", {
      font: "14px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000aa",
      padding: { x: 6, y: 3 },
    })
    .setDepth(30)
    .setVisible(false);

  eKey = this.input.keyboard.addKey("E");
  hKey = this.input.keyboard.addKey("H");

  // Help text that has a "fixed" position on the screen
  this.add
    .text(
      16,
      16,
      'Flechas para mover\n"D" para correr (debug)\n"H" para ayuda',
      {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff",
      },
    )
    .setScrollFactor(0)
    .setDepth(30);

  // Debug graphics
  this.input.keyboard.once("keydown-D", (event) => {
    speed = 400;
    /* // Turn on physics debugging to show player's hitbox
    this.physics.world.createDebugGraphic();

    // Create worldLayer collision graphic above the player, but below the help text
    const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
    worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    }); */
  });
}

function update(time, delta) {
  const prevVelocity = player.body.velocity.clone();

  if (Phaser.Input.Keyboard.JustDown(hKey)) {
    toggleHelp();
  }

  if (dialogOpen) {
    player.body.setVelocity(0);
    player.anims.stop();
    return;
  }

  if (gameEnded) return;

  // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
    player.anims.play("misa-left-walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("misa-right-walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("misa-back-walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("misa-front-walk", true);
  } else {
    player.anims.stop();

    // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
    else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
    else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
    else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
  }

  // check proximity to interaction points
  activePoint = null;
  for (const point of interactionPoints) {
    const dist = Phaser.Math.Distance.Between(
      player.x,
      player.y,
      point.x,
      point.y,
    );
    if (dist < point.radius) {
      activePoint = point;
      break;
    }
  }

  if (activePoint) {
    promptText
      .setVisible(true)
      .setPosition(activePoint.x - 30, activePoint.y - 50);
  } else {
    promptText.setVisible(false);
  }

  if (Phaser.Input.Keyboard.JustDown(eKey)) {
    if (dialogOpen) {
      closeModal();
    } else if (activePoint) {
      if (activePoint.type === "teleport") {
        player.setPosition(
          activePoint.destination.x,
          activePoint.destination.y,
        );
      } else if (activePoint.type === "end") {
        endGame(activePoint);
      } else {
        openModal(activePoint);
      }
    }
  }

  // update debug readout every frame
  debugText.setText(`x: ${Math.round(player.x)}, y: ${Math.round(player.y)}`);
}

function endGame(point) {
  dialogOpen = true;
  gameEnded = true;
  promptText.setVisible(false);

  modalContent.innerHTML = `
    <div id="modal-title">${point.title || "Fin"}</div>
    <p id="modal-message">${point.message}</p>
  `;
  modalOverlay.classList.remove("hidden");

  // hide the close button — there's nothing to go back to
  modalClose.style.display = "none";
}
