package hal.pi.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import hal.pi.properties.FileStorageProperties;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class QRCodeUtils {
    public static String generateQRCode(String QRUrl, String fileName) {

        int size = 250;
        String fileType = "png";

        Path path = FileSystems.getDefault().getPath(FileStorageProperties.getQRUploadDir() + fileName);
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(QRUrl, BarcodeFormat.QR_CODE, size, size);
            MatrixToImageWriter.writeToPath(bitMatrix, fileType, path);
            return FileStorageProperties.getQRUploadDir() + fileName;
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
