package hal.pi.service;

import hal.pi.DTO.EditMailDTO;
import hal.pi.DTO.NewMailDTO;
import hal.pi.VO.MailVO;
import hal.pi.entity.Format;
import hal.pi.entity.Mail;
import org.springframework.stereotype.Service;


public interface MailService {
    Long saveFormat(Format format);

    void saveMail(Mail mail);

    MailVO selectMail(String id);

    void updateMail(EditMailDTO newMailDTO);

    void deleteMail(String id);


}
