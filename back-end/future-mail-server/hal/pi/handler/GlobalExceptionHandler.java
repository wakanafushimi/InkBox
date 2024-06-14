package hal.pi.handler;

import hal.pi.constant.MessageConstant;
import hal.pi.exception.BaseException;
import hal.pi.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;

/**
 * 全局异常处理器，处理项目中抛出的业务异常
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 捕获业务异常
     * @param ex
     * @return
     */
    @ExceptionHandler
    public Result exceptionHandler(BaseException ex){
        log.error("Exception：{}", ex.getMessage());
        return Result.error(ex.getMessage());
    }

    @ExceptionHandler
    public Result exceptionHandler(SQLIntegrityConstraintViolationException ex){
        String msg = ex.getMessage();
        if(msg.contains("Duplicate entry")){
            String[] split = msg.split(" ");
            String username = split[2];
            String res = username + MessageConstant.ACCOUNT_NOT_FOUND;
            return Result.error(res);
        }else {
            return Result.error(MessageConstant.UNKNOWN_ERROR);
        }
    }

}
