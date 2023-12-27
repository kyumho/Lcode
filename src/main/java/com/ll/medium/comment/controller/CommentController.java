package com.ll.medium.comment.controller;

import com.ll.medium.comment.dto.CommentDto;
import com.ll.medium.comment.dto.CommentSaveDto;
import com.ll.medium.comment.dto.CommentUpdateDto;
import com.ll.medium.comment.service.CommentService;
import com.ll.medium.common.dto.ResponseDto;
import com.ll.medium.user.security.UserPrinciple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/save")
    public ResponseEntity<ResponseDto<CommentDto>> saveComment(@RequestBody CommentSaveDto commentSaveDto,
                                                               @AuthenticationPrincipal UserPrinciple userPrinciple) {

        return ResponseEntity.ok(commentService.saveComment(commentSaveDto,
                userPrinciple.getUser()));
    }

    @GetMapping("/list/{postId}")
    public ResponseEntity<?> list(@PathVariable Long postId) {
        ResponseDto<?> allCommentsByPostId = commentService.getAllCommentsByPostId(postId);
        return ResponseEntity.ok(allCommentsByPostId);
    }

    @PutMapping("/update/{commentId}")
    public ResponseEntity<ResponseDto<CommentDto>> updateComment(@PathVariable Long commentId,
                                                                 @RequestBody CommentUpdateDto commentUpdateDto,
                                                                 @AuthenticationPrincipal UserPrinciple userPrinciple) {

        return ResponseEntity.ok(commentService.updateComment(commentId, commentUpdateDto,
                userPrinciple.getUser()));
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<ResponseDto<Void>> deleteComment(@PathVariable Long commentId,
                                                           @AuthenticationPrincipal UserPrinciple userPrinciple) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok(ResponseDto.<Void>builder()
                .successMessage("댓글이 삭제되었습니다.")
                .build());
    }

}
