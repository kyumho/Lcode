package com.ll.medium.board.service;

import com.ll.medium.board.dto.PostPageDto;
import com.ll.medium.board.entity.Post;
import com.ll.medium.board.repository.PostRepository;
import java.util.List;
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

}
