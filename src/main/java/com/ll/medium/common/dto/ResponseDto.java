package com.ll.medium.common.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {
    //private String error;
    private String successMessage;
    private ErrorResponseDto errorData;
    private List<T> listData;
    private Page<T> pageData;
    private T objectData;

}