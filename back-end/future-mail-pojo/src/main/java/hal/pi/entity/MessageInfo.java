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
public class MessageInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long infoId;
    private Long userId;
    private Long mailId;
    private Long recipientId;

    private Long mailPreId;
    private Long mailNextId;
    private LocalDateTime sendTime;
    private String title;
}
