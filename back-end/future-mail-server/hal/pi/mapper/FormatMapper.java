package hal.pi.mapper;

import hal.pi.entity.Format;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface FormatMapper {

    @Insert("insert into format(envelope, font, paper)" +
            "values (#{envelope}, #{font}, #{paper})")
    @Options(useGeneratedKeys = true, keyProperty = "formatId")
    int saveFormat(Format format);



    @Select("select * from format where format_id = #{formatId}")
    Format select(Long formatId);

    int update(Format format);
}
