package hal.pi.service;

import hal.pi.DTO.UserLoginDTO;
import hal.pi.DTO.UserRegDTO;
import hal.pi.entity.User;
import org.springframework.stereotype.Service;


public interface UserService {
    User login(UserLoginDTO userLoginDTO);

    int save(UserRegDTO user);
}
