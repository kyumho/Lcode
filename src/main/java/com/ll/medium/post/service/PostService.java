package com.ll.medium.post.service;

import com.ll.medium.post.dto.PostDetailDto;
import com.ll.medium.post.dto.PostPageDto;
import com.ll.medium.post.dto.PostUpdateDto;
import com.ll.medium.post.entity.Post;
import com.ll.medium.post.repository.PostRepository;
import com.ll.medium.common.dto.ResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
        return postRepository.findAllByIsPublishedTrue(sortedByCreatedAtDesc).map(PostPageDto::entityToDto);
    }

    public Page<PostPageDto> findRecentPosts(int page) {
        List<Post> recentPosts = postRepository.findTop30ByIsPublishedTrueOrderByCreatedAtDesc();

        int start = Math.min(page * 9, recentPosts.size());
        int end = Math.min(start + 9, recentPosts.size());

        List<PostPageDto> pagedPosts = recentPosts.subList(start, end).stream()
                .map(PostPageDto::entityToDto)
                .collect(Collectors.toList());

        return new PageImpl<>(pagedPosts, PageRequest.of(page, 9), recentPosts.size());
    }

    @Transactional
    public void update(Long postId, PostUpdateDto postUpdateDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postId));

        post.update(postUpdateDto.getTitle(), postUpdateDto.getContent(), postUpdateDto.getIsPublished(), postUpdateDto.getGptAnswer());
    }

    public ResponseDto<PostDetailDto> getPost(Long id) {
        PostDetailDto postDetailDto = postRepository.findById(id)
                .map(PostDetailDto::new)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        return ResponseDto.<PostDetailDto>builder()
                .successMessage("게시글 조회에 성공했습니다.")
                .objectData(postDetailDto).build();

    }

    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        postRepository.delete(post);
    }
}
