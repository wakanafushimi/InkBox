package hal.pi.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String userId;
    private String mailId;
    private String mailPreId;
    private String url;

}
