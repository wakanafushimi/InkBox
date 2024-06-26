package hal.pi.entity;

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
public class MailHistory implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long mailId;
    private Long userId;
    private Long ReceiveId;
    private Long sendId;
    private String title;
    private LocalDateTime sendTime;
}
