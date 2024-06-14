package hal.pi.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailListVO {
    private Long userId;
    private Long mailId;
    private String title;
    private LocalDateTime sendTime;
}
