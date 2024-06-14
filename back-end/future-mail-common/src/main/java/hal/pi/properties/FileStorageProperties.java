package hal.pi.properties;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class FileStorageProperties {
    @Value("${file.upload-dir}")
    static private String uploadDir;

    public static String getImageUploadDir() {
        return uploadDir + "image/";
    }

    public static String getQRUploadDir() {
        return uploadDir + "qr_code/";
    }
}
