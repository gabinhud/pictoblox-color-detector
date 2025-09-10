class ColorDetector {
    constructor() {
        this.video = document.createElement("video");
        this.video.width = 320;
        this.video.height = 240;
        this.video.autoplay = true;

        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.srcObject = stream;
        });

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 320;
        this.canvas.height = 240;
    }

    _checkColor(color) {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

        let count = 0;
        for (let i = 0; i < imageData.length; i += 4) {
            let r = imageData[i];
            let g = imageData[i + 1];
            let b = imageData[i + 2];

            if (color === "red" && r > 150 && g < 100 && b < 100) count++;
            if (color === "green" && g > 150 && r < 100 && b < 100) count++;
            if (color === "blue" && b > 150 && r < 100 && g < 100) count++;
        }

        return count > 500; // true if enough pixels match
    }

    isColorVisible({ COLOR }) {
        return this._checkColor(COLOR);
    }
}

Scratch.extensions.register(new ColorDetector());
