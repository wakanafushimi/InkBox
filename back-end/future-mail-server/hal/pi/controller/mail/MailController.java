package hal.pi.controller.mail;

import hal.pi.DTO.EditMailDTO;
import hal.pi.DTO.NewMailDTO;
import hal.pi.VO.MailListVO;
import hal.pi.VO.MailVO;
import hal.pi.properties.FileStorageProperties;
import hal.pi.constant.MessageConstant;
import hal.pi.context.BaseContext;
import hal.pi.entity.Format;
import hal.pi.entity.Mail;
import hal.pi.result.Result;
import hal.pi.service.MailService;
import hal.pi.service.SenderService;
import hal.pi.utils.TimeUtils;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/mail")
@Slf4j
public class MailController {

    @Autowired
    private MailService mailService;
    @Autowired
    private SenderService senderService;

   @PostMapping("/new")
   @ApiOperation("新しいメール")
   //TODO 需要返回mail的信息
    public Result createMail(@RequestBody NewMailDTO newMailDTO){

       Mail mail = new Mail();
       Format format = new Format();
       BeanUtils.copyProperties(newMailDTO, mail);
       mail.setSendTime(TimeUtils.transTimeString(newMailDTO.getSendTime()));
       BeanUtils.copyProperties(newMailDTO,format);
       try {
           Long res1 = mailService.saveFormat(format);
           mail.setFormatId(res1);
           mail.setUserId(BaseContext.getCurrentId());
           mailService.saveMail(mail);
       } catch (Exception e) {
           return Result.error(e.getMessage());
       }

       return Result.success();
   }

    @PostMapping("/upload")
    public Result<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return Result.error(MessageConstant.UNKNOWN_ERROR);
        }

        try {
            String uploadDir = FileStorageProperties.getImageUploadDir();
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(uploadDir + File.separator + fileName);
            Files.write(path, file.getBytes());

            return Result.success(path.toString());
        } catch (IOException e) {
            return Result.error(e.getMessage());
        }
    }

   @GetMapping("/open/{id}")
   @ApiOperation("ユーザーのマイページでメールを開く")
    public Result<MailVO> selectMail(@PathVariable String id){
       MailVO mailVO = null;
       try {
           mailVO = mailService.selectMail(id);
       } catch (Exception e) {
           return Result.error(MessageConstant.MAIL_GET_FAILED);
       }
       if (mailVO != null) {
           return Result.success(mailVO);
       } else {
           return Result.error(MessageConstant.MAIL_GET_FAILED);
       }
   }

    @PatchMapping("/update")
    @ApiOperation("メール更新")
    public Result editMail(@RequestBody EditMailDTO newMailDTO){
        try {
            mailService.updateMail(newMailDTO);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @ApiOperation("メール削除（発信者から）")
    public Result deleteMail(@PathVariable String id){
        try {
            mailService.deleteMail(id);
            senderService.delete(id);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }

        return Result.success();
    }

    @DeleteMapping("/rec/{id}")
    @ApiOperation("メール削除（受信者から）")
    public Result deleteRecMail(@PathVariable String id){
        try {
            senderService.deleteRec(id);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }

        return Result.success();
    }

    @GetMapping("/tomail/{id}")
    @ApiOperation("送信履歴")
    public Result<List<MailListVO>> userMailList(@PathVariable String id){
        if(Long.parseLong(id) == BaseContext.getCurrentId()){
            try {
                List<MailListVO> mailListVOS = senderService.selectMailList(BaseContext.getCurrentId());
                return Result.success(mailListVOS);
            } catch (Exception e) {
                return Result.error(e.getMessage());
            }
        }else {
            return Result.error(MessageConstant.USER_NOT_LOGIN);
        }
    }

    @GetMapping("/fromail/{id}")
    @ApiOperation("受信履歴")
    public Result<List<MailListVO>> sentMailList(@PathVariable String id){
        if(Long.parseLong(id) == BaseContext.getCurrentId()){
            try {
                List<MailListVO> mailListVOS = senderService.selectRecMailList(BaseContext.getCurrentId());
                return Result.success(mailListVOS);
            } catch (Exception e) {
                return Result.error(e.getMessage());
            }
        }else {
            return Result.error(MessageConstant.USER_NOT_LOGIN);
        }
    }
}
