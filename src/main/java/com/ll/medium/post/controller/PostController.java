package com.ll.medium.post.controller;

import com.ll.medium.post.dto.PostDetailDto;
import com.ll.medium.post.dto.PostDto;
import com.ll.medium.post.dto.PostPageDto;
import com.ll.medium.post.dto.PostRequestDto;
import com.ll.medium.post.dto.PostUpdateDto;
import com.ll.medium.post.service.PostService;
import com.ll.medium.common.dto.ErrorResponseDto;
import com.ll.medium.common.dto.ResponseDto;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.security.UserPrinciple;
import com.ll.medium.user.service.UserService;
import java.nio.file.attribute.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping("/recent")
    public ResponseEntity<?> recentPosts(@RequestParam int page) {
        ResponseDto<Page<PostPageDto>> response;
        Page<PostPageDto> postPageDtoList = postService.findRecentPosts(page);
        response = ResponseDto.<Page<PostPageDto>>builder().objectData(postPageDtoList).build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{postId}")
    public ResponseEntity<?> updatePost(@PathVariable Long postId, @RequestBody PostUpdateDto postUpdateDto) {
        try {
            postService.update(postId, postUpdateDto);
            return ResponseEntity.ok("게시글이 성공적으로 업데이트되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("해당 게시글이 없습니다. id=" + postId);
        }
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


    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id) {
        try {
            log.info(String.valueOf(id));
            ResponseDto<PostDetailDto> post = postService.getPost(id);
            return ResponseEntity.ok(post);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/mypost/not-published")
    public ResponseEntity<Page<PostPageDto>> getNotPublishedPostsByUser(@AuthenticationPrincipal UserPrinciple userPrincipal, @PageableDefault(size = 9) Pageable pageable) {
        User user = userPrincipal.getUser();
        return ResponseEntity.ok(postService.getNotPublishedPostsByUser(user, pageable));
    }

    @GetMapping("/mypost/published")
    public ResponseEntity<Page<PostPageDto>> getPublishedPostsByUser(@AuthenticationPrincipal UserPrinciple userPrincipal, @PageableDefault(size = 9) Pageable pageable) {
        User user = userPrincipal.getUser();
        return ResponseEntity.ok(postService.getPublishedPostsByUser(user, pageable));
    }



}

