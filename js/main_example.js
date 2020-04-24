import RenderableBase from './render/renderable_base.js';
export default class Example extends RenderableBase {
    constructor() {
        super();
        this.tileset = new Image();
        this.tileset.src = 'asset/tileset_outdoors_terrain.png';
        this.tilesetColumns = 7;
        this.tilesetRows = 6;
        this.tileWidth = 16;
        this.tileHeight = 16;
        this.scale = 3.0;
        this.map = [
            [ 41, 41, 41, 28, 32, 33, 41, 41, 41, 41, 41, 41 ],
            [ 41, 41, 41, 28, 32, 33, 41, 41, 41, 41, 41, 41 ],
            [ 41, 41, 41, 35,  9, 15,  5, 41, 41, 41, 41, 41 ],
            [ 41, 41, 41, 41, 28, 32, 15,  4,  5, 41, 41, 41 ],
            [ 41,  0,  5, 41, 28,  8,  9, 32, 15,  5, 41, 41 ],
            [ 41, 28, 15,  4, 22, 40, 35,  9, 32, 33, 41, 41 ],
            [ 41, 35,  9,  8, 40, 41, 41, 28, 32, 33, 41, 41 ],
            [ 41, 41, 35, 40, 41, 41,  0, 16,  8, 40, 41, 41 ],
            [ 41, 41, 41, 41, 41,  0, 16,  8, 40, 41, 41, 41 ],
            [ 41, 41, 41, 41, 41, 28, 32, 33, 41, 41, 41, 41 ],
            [ 41, 41, 41, 41, 41, 35,  9, 15,  5, 41, 41, 41 ],
            [ 41, 41, 41, 41, 41, 41, 35,  9, 33, 41, 41, 41 ],
        ];
    }

    destroy() {
        this.tileset = null;
    }

    render(context) {
        var realWidth = this.tileWidth * 12 * this.scale;
        var realHeight = this.tileHeight * 12 * this.scale;
        var realX = this.getPositionX() - (realWidth * this.getAnchorX());
        var realY = this.getPositionY() - (realHeight * this.getAnchorY());
        for (var y = 0; y < this.map.length; ++y) {
          for (var x = 0; x < this.map[y].length; ++x) {
            var tilesetX = ~~ (this.map[y][x] % this.tilesetColumns);
            var tilesetY = ~~ (this.map[y][x] / this.tilesetColumns);
            context.drawImage(
                /* Image */                 this.tileset,
                /* Source X */              tilesetX * this.tileWidth,
                /* Source Y */              tilesetY * this.tileHeight,
                /* Source Width */          this.tileWidth,
                /* Source Height */         this.tileHeight,
                /* Destination X */         (x * this.tileWidth * this.scale) + realX,
                /* Destination Y */         (y * this.tileHeight * this.scale) + realY,
                /* Destination Width */     this.tileWidth * this.scale,
                /* Destination Height */    this.tileHeight * this.scale);
          }
        }
    }

    update(delta) {
        // Nothing.
    }
};