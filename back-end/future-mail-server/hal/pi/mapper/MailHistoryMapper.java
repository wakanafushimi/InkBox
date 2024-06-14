package hal.pi.mapper;


import hal.pi.VO.MailListVO;
import hal.pi.entity.MailHistory;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface MailHistoryMapper {


    List<MailListVO> selectList(Long id);

    List<MailListVO> selectRecList(Long id);


    @Insert("insert into mail_history(mail_id, user_id, send_id, title, send_time)" +
            "values (#{mailId}, #{userId}, #{sendId}, #{title}, #{sendTime})")
    int insert(MailHistory mailHistory);

    @Select("select * from mail_history where mail_id = #{id}")
    MailHistory select(long id);


    void update(MailHistory mailHistory);

    @Update("update mail_history set receive_id = null where mail_id = #{mailId}")
    void deleteRec(MailHistory recMail);

    @Delete("delete * from mail_history where mail_id = #{id}")
    void delete(Long id);
}
