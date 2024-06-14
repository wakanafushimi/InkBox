package hal.pi.controller.send;

import hal.pi.DTO.OpenMailDTO;
import hal.pi.DTO.SendDTO;
import hal.pi.VO.MailListVO;
import hal.pi.VO.MailVO;
import hal.pi.constant.MessageConstant;
import hal.pi.context.BaseContext;
import hal.pi.result.Result;
import hal.pi.service.MailService;
import hal.pi.service.SenderService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.util.List;

@RestController
@RequestMapping("/post")
@Slf4j
public class SendController {
    @Autowired
    private SenderService senderService;

    @PostMapping
    @ApiOperation("メール発信")
    public Result<String> sendMail(@RequestBody SendDTO sendDTO){
        try {
            sendDTO.setUrl(InetAddress.getLocalHost().getHostAddress());
            String QR_url = senderService.send(sendDTO);
            return Result.success(QR_url);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/open")
    @ApiOperation("受信者登録あとにユーザーID登録")
    public Result openMail(@RequestBody OpenMailDTO openMailDTO){
        try {
            senderService.open(openMailDTO);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
        return Result.success();
    }

    @GetMapping("/read/{id}")
    @ApiOperation("受信者がメールを開く、パスワードが必要であれば/read_with_pswに遷移してください")
    public Result<MailVO> selectMail(@RequestParam String id){
        MailVO mailVO = null;
        try {
            mailVO = senderService.selectMail(id);
        } catch (Exception e) {
            return Result.error(MessageConstant.MAIL_GET_FAILED);
        }
        if (mailVO != null) {
            return Result.success(mailVO);
        } else {
            return Result.error(MessageConstant.PASSWORD_ERROR);
        }
    }

    @GetMapping("/read_with_psw")
    @ApiOperation("受信者がメールを開く")
    public Result<MailVO> selectMail(@RequestBody OpenMailDTO openMailDTO){
        MailVO mailVO = null;
        try {
            mailVO = senderService.selectMail(openMailDTO);
        } catch (Exception e) {
            return Result.error(MessageConstant.MAIL_GET_FAILED);
        }
        if (mailVO != null) {
            return Result.success(mailVO);
        } else {
            return Result.error(MessageConstant.MAIL_GET_FAILED);
        }
    }

}
