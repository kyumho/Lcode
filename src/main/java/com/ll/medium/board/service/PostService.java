package com.ll.medium.board.service;

import com.ll.medium.board.dto.PostDetailDto;
import com.ll.medium.board.dto.PostPageDto;
import com.ll.medium.board.dto.PostUpdateDto;
import com.ll.medium.board.entity.Post;
import com.ll.medium.board.repository.PostRepository;
import com.ll.medium.common.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public void save(final Post post) {
        postRepository.save(post);
    }

    public Page<PostPageDto> findAll(Pageable pageable) {
        Pageable sortedByCreatedAtDesc = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("createdAt").descending());
        return postRepository.findAll(sortedByCreatedAtDesc).map(PostPageDto::entityToDto);
    }

    @Transactional
    public void update(Long postId, PostUpdateDto postUpdateDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));

        post.update(postUpdateDto.getTitle(), postUpdateDto.getContent());
    }

    public ResponseDto<PostDetailDto> getPost(Long id) {
        PostDetailDto postDetailDto = postRepository.findById(id)
                .map(PostDetailDto::new)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        return ResponseDto.<PostDetailDto>builder()
                .successMessage("게시글 조회에 성공했습니다.")
                .objectData(postDetailDto).build();

    }
}
