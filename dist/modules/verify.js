var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import Canvas from 'canvas';
import Color from 'color';
import Utils from './utils.js';
var Verify = /** @class */ (function () {
    function Verify() {
    }
    Verify.generate = function () {
        // @ts-ignore
        var alternateCapitals = function (str) { return __spreadArray([], str).map(function (char) { return char["to" + (Utils.Random(0, 1) ? "Upper" : "Lower") + "Case"](); }).join(""); };
        var code = alternateCapitals(Math.random().toString(36).substring(2, 8));
        var fonts = ['Impact', 'Arial', 'Times New Roman', 'Courier', 'Verdana', 'Comic Sans MS'];
        var font = fonts[Utils.Random(0, fonts.length - 1)];
        var txtbase = Utils.Random(0, 30);
        var txtcolor = Color({
            r: txtbase + (Utils.Random(0, 1) ? -1 : 1) * Utils.Random(0, 10),
            g: txtbase + (Utils.Random(0, 1) ? -1 : 1) * Utils.Random(0, 10),
            b: txtbase + (Utils.Random(0, 1) ? -1 : 1) * Utils.Random(0, 10)
        });
        var canvas = Canvas.createCanvas(250, 100);
        var ctx = canvas.getContext('2d');
        var imgData = ctx.createImageData(canvas.width, canvas.height);
        for (var i = 0; i < imgData.data.length; i += 4) {
            var r = Utils.Random((255 / 2), 255);
            imgData.data[i] = r;
            imgData.data[i + 1] = r;
            imgData.data[i + 2] = r;
            imgData.data[i + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
        ctx.font = "40px " + font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.rotate((Utils.Random(0, 1) ? -1 : 1) * ((Utils.Random(0, 5) * Math.PI) / 180));
        ctx.fillStyle = txtcolor.hex();
        ctx.fillText(code, canvas.width / 2, canvas.height / 2);
        var text = ctx.measureText(code);
        ctx.beginPath();
        ctx.lineWidth = Utils.Random(1, 2);
        ctx.moveTo((canvas.width / 2) - text.width / 2, (canvas.height / 2) + Utils.Random(-10, 10));
        ctx.lineTo((canvas.width / 2) + text.width / 2, (canvas.height / 2) + Utils.Random(-10, 10));
        ctx.strokeStyle = txtcolor.hex();
        ctx.stroke();
        return {
            buffer: canvas.toBuffer(),
            answer: code
        };
    };
    return Verify;
}());
export default Verify;
