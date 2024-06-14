package hal.pi.service.impl;

import hal.pi.DTO.EditMailDTO;
import hal.pi.DTO.NewMailDTO;
import hal.pi.VO.MailListVO;
import hal.pi.VO.MailVO;
import hal.pi.constant.MessageConstant;
import hal.pi.entity.Format;
import hal.pi.entity.Mail;
import hal.pi.exception.FormatCreationException;
import hal.pi.exception.MailCreationException;
import hal.pi.exception.MailNotFoundException;
import hal.pi.mapper.FormatMapper;
import hal.pi.mapper.MailMapper;
import hal.pi.service.MailService;
import hal.pi.utils.TimeUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MailServiceImpl implements MailService {
    @Autowired
    private MailMapper mailMapper;
    @Autowired
    private FormatMapper formatMapper;

    @Override
    public Long saveFormat(Format format) {
        int res = formatMapper.saveFormat(format);
        if(res == 0 ){
            throw new FormatCreationException(MessageConstant.FORMAT_CREATION_FAILED);
        }
        return format.getFormatId();
    }

    @Override
    public void saveMail(Mail mail) {
        int res = mailMapper.saveMail(mail);
        if(res == 0){
            throw new MailCreationException(MessageConstant.MAIL_CREATION_FAILED);
        }
    }

    @Override
    public MailVO selectMail(String id) {

        Mail mail = mailMapper.select(Long.parseLong(id));
        if(mail == null){
            throw  new MailNotFoundException(MessageConstant.MAIL_GET_FAILED);
        }
        Format format = formatMapper.select(mail.getFormatId());
        if(format == null){
            throw  new MailNotFoundException(MessageConstant.MAIL_GET_FAILED);
        }

        MailVO mailVO = new MailVO();
        BeanUtils.copyProperties(format, mailVO);
        BeanUtils.copyProperties(mail, mailVO);
        return mailVO;
    }

    @Override
    public void updateMail(EditMailDTO newMailDTO) {
        Mail mail = mailMapper.select(newMailDTO.getMailId());
        Format format = formatMapper.select(mail.getFormatId());
        BeanUtils.copyProperties(newMailDTO, mail);
        BeanUtils.copyProperties(newMailDTO, format);
        if(newMailDTO.getSendTime() != null){
            mail.setSendTime(TimeUtils.transTimeString(newMailDTO.getSendTime()));
        }
        int res = mailMapper.update(mail);
        int res1 = formatMapper.update(format);
        if(res == 0 || res1 == 0){
            throw new MailCreationException(MessageConstant.MAIL_UPDATE_FAILED);
        }
    }


    @Override
    public void deleteMail(String id) {
        int res = mailMapper.delete(Long.parseLong(id));
        if(res == 0){
            throw new MailCreationException(MessageConstant.MAIL_DELETE_FAILED);
        }
    }
}
