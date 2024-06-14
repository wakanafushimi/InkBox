package hal.pi.controller.user;

import hal.pi.DTO.UserLoginDTO;
import hal.pi.DTO.UserRegDTO;
import hal.pi.VO.UserLoginVO;
import hal.pi.constant.JwtClaimsConstant;
import hal.pi.constant.MessageConstant;
import hal.pi.context.BaseContext;
import hal.pi.entity.User;
import hal.pi.properties.JwtProperties;
import hal.pi.result.Result;
import hal.pi.service.UserService;
import hal.pi.utils.JwtUtil;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Slf4j
public class AccountController {

    @Autowired
    private JwtProperties jwtProperties;
    @Autowired
    private UserService userService;


    @PostMapping("/login")
    @ApiOperation("ログイン")
    public Result<UserLoginVO> login(@RequestBody UserLoginDTO userLoginDTO) {
        log.info("UserLogin：{}", userLoginDTO);

        User user = null;
        try {
            user = userService.login(userLoginDTO);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }

        UserLoginVO userLoginVO = null;
        try {
            Map<String, Object> claims = new HashMap<>();
            claims.put(JwtClaimsConstant.USER_ID, user.getUserId());
            String token = JwtUtil.createJWT(
                    jwtProperties.getUserSecretKey(),
                    jwtProperties.getUserTtl(),
                    claims);

            userLoginVO = UserLoginVO.builder()
                    .id(user.getUserId())
                    .username(user.getUsername())
                    .token(token)
                    .build();

            BaseContext.setCurrentId(user.getUserId());
        } catch (Exception e) {
            return Result.error(MessageConstant.LOGIN_FAILED);
        }

        return Result.success(userLoginVO);
    }

    @GetMapping("/exit")
    @ApiOperation("ログアウト")
    public Result logOut(){
        BaseContext.removeCurrentId();
        return Result.success();
    }

    @PostMapping("/register")
    @ApiOperation("ユーザー登録")
    public Result save(@RequestBody UserRegDTO user){
        log.info("new register:{}", user);

        int result = userService.save(user);
        if(result == 0){
            Result.error(MessageConstant.ACCOUNT_REGISTER_FAILED);
        }
        return  Result.success();
    }
}
