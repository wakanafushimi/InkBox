package hal.pi.mapper;

import hal.pi.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("select * from user where email = #{email}")
    User getByEmail(String email);


    @Insert("insert into user(username, password, email)" +
            "values (#{username}, #{password}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "userId")
    int insert(User user);
}
