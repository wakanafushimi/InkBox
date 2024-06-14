package hal.pi.mapper;

import hal.pi.DTO.NewMailDTO;
import hal.pi.VO.MailListVO;
import hal.pi.entity.Mail;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import java.util.List;

@Mapper
public interface MailMapper {

    @Insert("insert into mail(user_id, format_id, title, text, recipient, sender, send_time, password)" +
            "values (#{userId}, #{formatId}, #{title}, #{text}, #{recipient}, #{sender}, #{sendTime}, #{password})")
    @Options(useGeneratedKeys = true, keyProperty = "mailId")
    int saveMail(Mail mail);

    Mail select(long id);

    int update(Mail mail);

    @Delete("delete * from mail where mail_id = #{id}")
    int delete(long id);

}
