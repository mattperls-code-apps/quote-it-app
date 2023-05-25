import RNQRGenerator from 'rn-qr-generator';

export const readEmbed = (image, canvas) => {

    let qrData;

    canvas.height = Image.getSize(image).height
    canvas.width = Image.getSize(image).width

    const ctx = canvas.getContext("2d")

    ctx.drawImage(image, 0, 0)

    ctx.getImageData(0, 0, canvas.width, canvas.height).then((imgData) => {

        for (let i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; i++) {
                const idx = (i + j * canvas.width) * 4;

                const { r, g, b } = {
                    r: data.data[idx],
                    g: data.data[idx + 1],
                    b: data.data[idx + 2]
                }

                var isOdd = !!((r + g + b) % 2);

                imageData.data[idx + 0] = isOdd ? 255 : 0;
                imageData.data[idx + 1] = isOdd ? 255 : 0;
                imageData.data[idx + 2] = isOdd ? 255 : 0;
            }
        }

        const data = Object.values(imgData.data);
        const iData = new ImageData(canvas, data, 0, 0);
        ctx.putImageData(iData, 0, 0)

        qrData = canvas.toDataURL("image/png")







    })

    return qrData;


}

export const extractInfo = (image, canvas) => {
    let result = {
        qoute: "",
        quotee: "",
    };
    readEmbed(image, canvas).then((qrData) => {
        RNQRGenerator.detect({
            uri: qrData,
        })
            .then(response => {
                const { values } = response; // Array of detected QR code values. Empty if nothing found.

                if (values.length) {
                    const val = values[0]

                    const splitIndex = val.lastIndexOf(";")

                    const quote = val.substring(0, splitIndex)
                    const quotee = val.substring(splitIndex + 1)

                    result = {
                        quote,
                        quotee
                    }
                }

            })
            .catch(error => {
                console.log('Cannot detect QR code', error);

            });
    })

    return result;

}