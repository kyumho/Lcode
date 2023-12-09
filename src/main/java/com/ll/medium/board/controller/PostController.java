package com.ll.medium.board.controller;

import com.ll.medium.board.dto.PostDetailDto;
import com.ll.medium.board.dto.PostDto;
import com.ll.medium.board.dto.PostPageDto;
import com.ll.medium.board.dto.PostRequestDto;
import com.ll.medium.board.dto.PostUpdateDto;
import com.ll.medium.board.service.PostService;
import com.ll.medium.common.dto.ErrorResponseDto;
import com.ll.medium.common.dto.ResponseDto;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/post")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @GetMapping("/list")
    public ResponseEntity<?> list(@RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 9);
        ResponseDto<Page<PostPageDto>> response;
        Page<PostPageDto> postPageDtoList = postService.findAll(pageable);
        response = ResponseDto.<Page<PostPageDto>>builder().objectData(postPageDtoList).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/write")
    public ResponseEntity<?> save(@AuthenticationPrincipal UserDetails userDetails,
                                  @RequestBody PostRequestDto postRequestDto) {
        ResponseDto<PostDto> response;
        try {
            User user = userService.getUserByUsername(userDetails.getUsername());
            postService.save(PostDto.toEntity(new PostDto(postRequestDto, user)));
            response = ResponseDto.<PostDto>builder().objectData(new PostDto(postRequestDto, user)).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDto.<PostDto>builder().errorData(new ErrorResponseDto(500, e.getMessage())).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/modify")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostUpdateDto postUpdateDto) {
        postService.update(id, postUpdateDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id) {
        log.info(String.valueOf(id));
        ResponseDto<PostDetailDto> post = postService.getPost(id);
        return ResponseEntity.ok(post);
    }


}

