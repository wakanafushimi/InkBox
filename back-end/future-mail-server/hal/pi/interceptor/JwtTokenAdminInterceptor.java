package hal.pi.interceptor;

import hal.pi.constant.JwtClaimsConstant;
import hal.pi.context.BaseContext;
import hal.pi.properties.JwtProperties;
import hal.pi.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * jwt token interceptor
 */
@Component
@Slf4j
public class JwtTokenAdminInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtProperties jwtProperties;

    /**
     * confirm jwt
     *
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //判断当前拦截到的是Controller的方法还是其他资源
        if (!(handler instanceof HandlerMethod)) {
            //当前拦截到的不是动态方法，直接放行
            return true;
        }

        //1、get token
        String token = request.getHeader(jwtProperties.getUserTokenName());

        //2、claims
        try {
            log.info("jwt:{}", token);
            Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
            Long empId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
            log.info("current id：", empId);
            BaseContext.setCurrentId(empId);
            //3、pass
            return true;
        } catch (Exception ex) {
            //4、could not pass, reture 401
            response.setStatus(401);
            return false;
        }
    }
}
