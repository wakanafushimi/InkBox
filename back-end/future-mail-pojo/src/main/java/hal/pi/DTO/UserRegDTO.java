package hal.pi.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    private String email;
    private String password;
}
