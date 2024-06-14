package hal.pi.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailVO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long mailId;

    private int envelope;
    private int font;
    private int paper;

    private String qrUrl;
    private String imageUrl;

    private String title;
    private String text;
    private String recipient;
    private String sender;

    private LocalDateTime sendTime;
    private String password;

}
