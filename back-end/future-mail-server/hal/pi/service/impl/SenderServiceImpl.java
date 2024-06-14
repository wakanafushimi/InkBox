package hal.pi.service.impl;

import hal.pi.DTO.OpenMailDTO;
import hal.pi.DTO.SendDTO;
import hal.pi.VO.MailListVO;
import hal.pi.VO.MailVO;
import hal.pi.constant.MessageConstant;
import hal.pi.context.BaseContext;
import hal.pi.entity.Format;
import hal.pi.entity.Mail;
import hal.pi.entity.MailHistory;
import hal.pi.entity.MessageInfo;
import hal.pi.exception.*;
import hal.pi.mapper.FormatMapper;
import hal.pi.mapper.MailHistoryMapper;
import hal.pi.mapper.MailMapper;
import hal.pi.mapper.MessageInfoMapper;
import hal.pi.service.SenderService;
import hal.pi.utils.QRCodeUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SenderServiceImpl implements SenderService {
    @Autowired
    private MessageInfoMapper messageInfoMapper;
    @Autowired
    private MailHistoryMapper mailHistoryMapper;
    @Autowired
    private MailMapper mailMapper;
    @Autowired
    private FormatMapper formatMapper;

    @Override
    public List<MailListVO> selectMailList(Long currentId) {
        List<MailListVO> mailList= mailHistoryMapper.selectList(currentId);
        if(mailList.isEmpty()){
            throw new MailNotFoundException(MessageConstant.MAIL_GET_FAILED);
        }
        return mailList;
    }

    @Override
    public List<MailListVO> selectRecMailList(Long currentId) {
        List<MailListVO> mailList= mailHistoryMapper.selectRecList(currentId);
        if(mailList.isEmpty()){
            throw new MailNotFoundException(MessageConstant.MAIL_GET_FAILED);
        }
        return mailList;
    }



    @Override
    public void open(OpenMailDTO openMailDTO) {
        try {
            long mailId = Long.parseLong(openMailDTO.getMailId());
            long userId = Long.parseLong(openMailDTO.getUserId());
            MailHistory mailHistory = mailHistoryMapper.select(mailId);
            MessageInfo messageInfo = messageInfoMapper.select(mailId);

            mailHistory.setReceiveId(userId);
            messageInfo.setRecipientId(userId);

            mailHistoryMapper.update(mailHistory);
            messageInfoMapper.update(messageInfo);
        } catch (Exception e) {
            throw new MailCreationException(MessageConstant.MAIL_UPDATE_FAILED);
        }
    }

    @Override
    public void deleteRec(String id) {
        try {
            MailHistory recMail = MailHistory.builder().mailId(Long.parseLong(id)).ReceiveId(null).build();
            mailHistoryMapper.deleteRec(recMail);
        } catch (Exception e) {
            throw new MailDeleteException(MessageConstant.MAIL_DELETE_FAILED);
        }
    }

    @Override
    public void delete(String userid) {
        try {
            long id = Long.parseLong(userid);
            mailHistoryMapper.delete(id);
            messageInfoMapper.delete(id);
        } catch (Exception e) {
            throw new MailDeleteException(MessageConstant.MAIL_DELETE_FAILED);
        }
    }

    @Override
    public MailVO selectMail(String mail_id) {
        Mail mail = mailMapper.select(Long.parseLong(mail_id));
        if(mail == null){
            throw  new MailNotFoundException(MessageConstant.MAIL_GET_FAILED);
        }
//        if(!mail.getPassword().isEmpty() && !mail.getPassword().equals(openMailDTO.getPassword())){
//            throw  new MailNotFoundException(MessageConstant.PASSWORD_ERROR);
//        }
        Format format = formatMapper.select(mail.getFormatId());
        if(format == null){
            throw  new MailNotFoundException(MessageConstant.MAIL_GET_FAILED);
        }
        if(mail.getPassword().isEmpty()){
        MailVO mailVO = new MailVO();
        BeanUtils.copyProperties(format, mailVO);
        BeanUtils.copyProperties(mail, mailVO);
        return mailVO;}else {
            return null;
        }
    }

    public MailVO selectMail(OpenMailDTO openMailDTO) {
        Mail mail = mailMapper.select(Long.parseLong(openMailDTO.getMailId()));
        if(mail == null){
            throw  new MailNotFoundException(MessageConstant.MAIL_GET_FAILED);
        }
        if(!mail.getPassword().isEmpty() && !mail.getPassword().equals(openMailDTO.getPassword())){
            throw  new MailNotFoundException(MessageConstant.PASSWORD_ERROR);
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
    public String send(SendDTO sendDTO) {
        try {
            long currentId = Long.parseLong(sendDTO.getMailId());
            Mail mailToSend = mailMapper.select(currentId);

            //更新messageInfo和MailHistory
            MessageInfo messageInfo = new MessageInfo();
            MailHistory mailHistory = new MailHistory();

            if(BaseContext.getCurrentId() == currentId){
                BeanUtils.copyProperties(mailToSend, messageInfo);
                BeanUtils.copyProperties(mailToSend, mailHistory);

                if(!sendDTO.getMailPreId().isEmpty()) {messageInfo.setMailPreId(Long.parseLong(sendDTO.getMailPreId()));}
                mailHistory.setSendId(currentId);
            }else {
                throw new MailSendException(MessageConstant.USER_NOT_LOGIN);
            }

            int res1 = messageInfoMapper.insert(messageInfo);
            int res2 = mailHistoryMapper.insert(mailHistory);

            if(res1 == 0 || res2 == 0){
                throw new MailSendException(MessageConstant.MAIL_SEND_FAILED);
            }

            //添加至前一封mail
            if(!sendDTO.getMailPreId().isEmpty()){
                long preMailId = Long.parseLong(sendDTO.getMailPreId());
                MessageInfo preMail = MessageInfo.builder().mailId(preMailId).mailNextId(currentId).build();
                messageInfoMapper.update(preMail);
            }

            //返回QRCODE
            String QR_name = mailToSend.getMailId()+ mailToSend.getSendTime().toString() + ".png";
            String QR_url = sendDTO.getUrl() + "/read/" + mailToSend.getMailId();
            return QRCodeUtils.generateQRCode(QR_url, QR_name);
        } catch (Exception e) {
            throw new MailSendException(e.getMessage());
        }
    }
}
