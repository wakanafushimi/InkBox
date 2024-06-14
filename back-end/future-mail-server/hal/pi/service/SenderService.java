package hal.pi.service;

import hal.pi.DTO.OpenMailDTO;
import hal.pi.DTO.SendDTO;
import hal.pi.VO.MailListVO;
import hal.pi.VO.MailVO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface SenderService {
    String send(SendDTO sendDTO);

    List<MailListVO> selectMailList(Long currentId);

    List<MailListVO> selectRecMailList(Long currentId);

    void open(OpenMailDTO openMailDTO);

    void deleteRec(String id);

    void delete(String id);

    MailVO selectMail(String id);
    MailVO selectMail(OpenMailDTO openMailDTO);
}
