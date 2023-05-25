import RNQRGenerator from 'rn-qr-generator';
import { ImageData } from 'react-native-canvas';
import Image from "react-native"

// Implementation of https://github.com/elis/ImageHash/blob/master/main.js

export const embedImage = (image, quote, quotee, canvas1, canvas2) => {

    let result;

    RNQRGenerator.generate({
        value: quote + ";" + quotee,
        height: 100,
        width: 100,
    }).then(embedImg => {

        canvas.height = Image.getSize(image).height
        canvas.width = Image.getSize(image).width

        const ctx1 = canvas1.getContext("2d")

        ctx1.drawImage(image, 0, 0)

        ctx.getImageData(0, 0, canvas.width, canvas.height).then((originalData) => {


            canvas2.height = embedImg.height
            canvas2.width = embedImg.width
            const ctx2 = canvas2.getContext("2d")


            ctx2.drawImage(embedImg.uri, 0, 0)

            ctx.getImageData(0, 0, canvas.width, canvas.height).then((embedData) => {
                let blackCount = 0;
                let whiteCount = 0;
                let count = 0;

                for (let i = 0; i < embedData.data.length; i++) {

                    for (let j = 0; j < embedData.data.height; j++) {
                        const idx = (i + j * embedData.data.width) * 4;

                        const { r, g, b } = {
                            r: embedData.data[idx],
                            g: embedData.data[idx + 1],
                            b: embedData.data[idx + 2]
                        }

                        const { or, og, ob } = {
                            or: originalData.data[idx],
                            og: originalData.data[idx + 1],
                            ob: originalData.data[idx + 2]
                        }

                        const isBlack = (r <= 50) && (g <= 50) && (b <= 50)
                        if (isBlack) ++blackCount;
                        else ++whiteCount;


                        const isOdd = ((or + og + ob) % 2);

                        const fixedPixel = fixPixel([or, og, ob], isOdd)



                        embedData.data[idx + 0] = fixedPixel[0];
                        embedData.data[idx + 1] = fixedPixel[1];
                        embedData.data[idx + 2] = fixedPixel[2];

                    }

                }

                const data = Object.values(embedData.data);
                const imgData = new ImageData(canvas2, data, 0, 0);
                ctx1.putImageData(imgData, 0, 0)

                result = ctx1.toDataURL("image/jpeg")
            })
        })

    }).catch(error => console.error("Cannot generate QR code", error))

    return result;
}


const fixPixel = (pixel, needOdd) => {
    const r = pixel[0], g = pixel[1], b = pixel[2];

    const isOdd = !((r + g + b) % 2);

    if ((needOdd && !isOdd) || (!needOdd && isOdd)) {
        if (r <= g && r <= b) {
            if (r == 0) r++;
            else r--;
        }
        else if (g <= r && g <= b) {
            if (g == 0) g++;
            else g--;
        } else if (b <= r && b <= g) {
            if (b == 0) b++;
            else b--;
        }

    }
    return [r, g, b];
}
