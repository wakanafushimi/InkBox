package hal.pi.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimeUtils {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    //TODO 前端传来的数据里面包括时间的情况下用下面方法不适当
    public static LocalDateTime transTimeString(String time){
        LocalDate localDate = LocalDate.parse(time, formatter);
        LocalDateTime localDateTime = localDate.atStartOfDay();
        return localDateTime;
    }
}



