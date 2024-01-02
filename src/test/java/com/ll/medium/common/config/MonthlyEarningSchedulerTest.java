package com.ll.medium.common.config;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ll.medium.post.entity.Post;
import com.ll.medium.post.repository.PostRepository;
import com.ll.medium.revenue.entity.Revenue;
import com.ll.medium.revenue.repository.RevenueRepository;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.entity.UserRole;
import com.ll.medium.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@ActiveProfiles("dev")
public class MonthlyEarningSchedulerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private RevenueRepository revenueRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    private MonthlyEarningScheduler monthlyEarningScheduler;

    @BeforeEach
    public void setUp() {
        doReturn(10).when(userRepository).countByRole(UserRole.PAID);
        doReturn(createPost()).when(postRepository).findByUserRole(UserRole.PAID);
        doReturn(Optional.of(new Revenue())).when(revenueRepository).findById(1L);
    }


    @Test
    public void whenDistributeEarningsWithPremiumUsers_thenSuccess() {
        // 가정 설정
        doReturn(10).when(userRepository.countByRole(UserRole.PAID));

        doReturn(createPost()).when(postRepository.findByUserRole(UserRole.PAID));

        doReturn(new Revenue()).when(revenueRepository.findById(1L));

        // 메서드 실행
        monthlyEarningScheduler.distributeEarnings();

        // 검증
        verify(revenueRepository).save(any(Revenue.class));
        verify(userRepository, atLeastOnce()).save(any(User.class));
    }


    @Test
    @DisplayName("유료 글 작성자가 없을 때 수익 처리 로직이 실행되지 않아야 함")
    public void whenDistributeEarningsWithNoPremiumUsers_thenHandleGracefully() {
        // 가정 설정
        lenient().when(userRepository.countByRole(UserRole.PAID)).thenReturn(0);

        // 메서드 실행
        monthlyEarningScheduler.distributeEarnings();

        // 검증: 수익 처리 로직이 실행되지 않아야 함
        verify(revenueRepository, never()).save(any(Revenue.class));
        verify(userRepository, never()).save(any(User.class));
    }

    private List<Post> createPost() {

        List<Post> posts = new ArrayList<>();

        for (long i = 1L; i <= 10L; i++) {
            User testUser = User
                    .builder()
                    .id(i)  // 식별자 추가
                    .username("test" + i)
                    .password(passwordEncoder.encode("test" + i))
                    .email("test" + i + "@test.com")
                    .role(UserRole.PAID)
                    .address("서울특별시" + i)
                    .addressDetail("강남구" + i)
                    .isPaid(true)
                    .emailVerified(true)
                    .build();

            Post post = Post.builder()
                    .id(i)  // 식별자 추가
                    .title("Title " + i)
                    .content("Content " + i)
                    .user(testUser)
                    .views(100000L * i)
                    .isPaid(true)
                    .isPublished(true)
                    .build();

            posts.add(post);
        }

        return posts;
    }

}