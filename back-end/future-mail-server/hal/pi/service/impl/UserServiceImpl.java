package hal.pi.service.impl;

import hal.pi.DTO.UserLoginDTO;
import hal.pi.DTO.UserRegDTO;
import hal.pi.constant.MessageConstant;
import hal.pi.entity.User;
import hal.pi.exception.AccountNotFoundException;
import hal.pi.exception.PasswordErrorException;
import hal.pi.mapper.UserMapper;
import hal.pi.service.UserService;
import hal.pi.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(UserLoginDTO userLoginDTO) {
        String email = userLoginDTO.getEmail();
        String password = userLoginDTO.getPassword();

        User user = userMapper.getByEmail(email);

        if (user == null) {
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }

        if (!MD5Util.verifyPassword(password, user.getPassword())) {
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }

        return user;
    }

    public int save(UserRegDTO userDTO) {
        User user = new User();

        user.setUsername(userDTO.getUsername());
        user.setPassword(MD5Util.generateMD5(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());

       return userMapper.insert(user);
    }
}
