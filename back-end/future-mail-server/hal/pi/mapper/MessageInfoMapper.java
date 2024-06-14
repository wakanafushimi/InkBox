package hal.pi.mapper;


import hal.pi.VO.MailListVO;
import hal.pi.entity.MessageInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface MessageInfoMapper {

    @Insert("insert into message_info(user_id, mail_id, send_time, title)" +
            "values (#{userId}, #{mailId}, #{sendTime}, #{title})")
    @Options(useGeneratedKeys = true, keyProperty = "infoId")
    int insert(MessageInfo messageInfo);

    @Select("select * from message_info where mail_id = #{id}")
    MessageInfo select(long id);


    void update(MessageInfo messageInfo);

    @Delete("delete * from message_info where mail_id = #{id}")
    void delete(long id);
}
