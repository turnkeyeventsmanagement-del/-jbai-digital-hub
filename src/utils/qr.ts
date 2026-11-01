import QRCode from 'qrcode';

export interface QRGenerationOptions {
  width?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
}

export async function generateQRCodeDataUrl(
  text: string,
  options: QRGenerationOptions = {}
): Promise<string> {
  const {
    width = 320,
    margin = 2,
    darkColor = '#050b18',
    lightColor = '#ffffff'
  } = options;

  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width,
      margin,
      color: {
        dark: darkColor,
        light: lightColor
      },
      errorCorrectionLevel: 'M'
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}

export function downloadDataUrlAsImage(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
