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
public class EditMailDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long mailId;
    //format
    private int envelope;
    private int font;
    private int paper;

    //mail
    private String recipient;
    private String sender;

    private File image;
    private String title;
    private String text;

    private String sendTime;
    private String password;

}
