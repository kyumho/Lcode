package com.ll.medium.comment.service;

import com.ll.medium.comment.dto.CommentDto;
import com.ll.medium.comment.dto.CommentSaveDto;
import com.ll.medium.comment.dto.CommentUpdateDto;
import com.ll.medium.comment.entity.Comment;
import com.ll.medium.comment.exception.CommentNotFoundException;
import com.ll.medium.comment.repository.CommentRepository;
import com.ll.medium.common.dto.ResponseDto;
import com.ll.medium.post.entity.Post;
import com.ll.medium.post.exception.PostNotFoundException;
import com.ll.medium.post.repository.PostRepository;
import com.ll.medium.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Transactional
    public ResponseDto<CommentDto> saveComment(CommentSaveDto commentSaveDto, User user) {
        Post post = postRepository.findById(commentSaveDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException("포스트가 존재하지 않습니다. " + commentSaveDto.getPostId()));

        Comment savedComment = commentRepository.save(CommentSaveDto.toEntity(commentSaveDto, user, post));
        CommentDto commentDto = CommentDto.fromEntityToDto(savedComment);

        return ResponseDto.<CommentDto>builder()
                .successMessage("댓글이 등록되었습니다.")
                .objectData(commentDto)
                .build();
    }

    public ResponseDto<?> getAllCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findAllByPostId(postId);

        return ResponseDto.builder()
                .successMessage("댓글이 조회되었습니다.")
                .listData(comments.stream().map(CommentDto::fromEntityToDto).collect(Collectors.toList()))
                .build();
    }

    @Transactional
    public ResponseDto<CommentDto> updateComment(Long commentId, CommentUpdateDto commentUpdateDto, User user) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("댓글을 찾을 수 없습니다: " + commentId));

        comment.update(commentUpdateDto.getContent());

        return ResponseDto.<CommentDto>builder()
                .successMessage("댓글이 수정되었습니다.")
                .objectData(CommentDto.fromEntityToDto(comment))
                .build();

    }

    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("댓글을 찾을 수 없습니다: " + commentId));

        commentRepository.delete(comment);
    }
}
