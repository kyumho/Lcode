package com.ll.medium.common.config;

import com.ll.medium.post.entity.Post;
import com.ll.medium.post.repository.PostRepository;
import com.ll.medium.revenue.entity.Revenue;
import com.ll.medium.revenue.repository.RevenueRepository;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.repository.UserRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MonthlyEarningScheduler {

    private final UserRepository userRepository;

    private final PostRepository postRepository;

    private final RevenueRepository revenueRepository;

    private static final double PREMIUM_SUBSCRIPTION_FEE = 2000.0;

    // 매달 15일 자정에 실행됩니다.
    @Transactional
    @Scheduled(cron = "0 0 0 15 * ?")
    public void distributeEarnings() {
        // 프리미엄 사용자 수 가져오기
        int totalPremiumUsers = getTotalPremiumUsers();
        if (totalPremiumUsers <= 0) {
            log.error("프리미엄 유저가 없습니다.");
            return;
        }

        // 전체 수익 계산
        BigDecimal totalRevenue = BigDecimal.valueOf(totalPremiumUsers)
                .multiply(BigDecimal.valueOf(PREMIUM_SUBSCRIPTION_FEE));

        // 미디엄 수익 처리
        BigDecimal mediumEarnings = totalRevenue.multiply(BigDecimal.valueOf(0.5));
        processMediumEarnings(mediumEarnings);

        // 유료 글 작성자들에게 분배할 수익
        BigDecimal earningsForAuthors = totalRevenue.multiply(BigDecimal.valueOf(0.5));

        // 각 작성자별 조회수와 총 조회수 계산
        Map<User, Long> authorViews = getAuthorViews();
        long totalViews = authorViews.values().stream().mapToLong(Long::longValue).sum();
        if (totalViews <= 0) {
            log.error("총 조회수가 0이거나 음수입니다.");
            return;
        }

        // 각 작성자별로 수익 분배
        for (Map.Entry<User, Long> authorEntry : authorViews.entrySet()) {
            User author = authorEntry.getKey();
            long views = authorEntry.getValue();

            // 작성자별 수익 계산
            BigDecimal authorEarnings = BigDecimal.valueOf(views)
                    .divide(BigDecimal.valueOf(totalViews), 2, RoundingMode.HALF_UP)
                    .multiply(earningsForAuthors)
                    .setScale(0, RoundingMode.DOWN);

            // 유료 사용자에게 캐시로 수익 분배
            distributeUserEarnings(author, authorEarnings);
        }
    }

    private int getTotalPremiumUsers() {
        // 'PAID' 역할을 가진 사용자 수 조회
        return userRepository.countByRole("PAID");
    }

    private Map<User, Long> getAuthorViews() {
        // 각 유료 글 작성자별로 조회수를 계산합니다.
        Map<User, Long> authorViews = new HashMap<>();

        // 'PAID' 역할을 가진 사용자가 작성한 게시글 조회
        List<Post> posts = postRepository.findByUserRole("PAID");

        // 각 사용자별로 조회수 합산
        for (Post post : posts) {
            User author = post.getUser();
            authorViews.merge(author, post.getViews(), Long::sum);
        }

        return authorViews;
    }

    @Transactional
    public void processMediumEarnings(BigDecimal earnings) {
        // 미디엄의 수익 처리 로직

        // Revenue 엔티티 찾기 또는 새로 생성
        Revenue revenue = revenueRepository.findById(1L).orElse(new Revenue());

        // addRevenue 메서드를 사용하여 수익 업데이트
        revenue.addRevenue(earnings);

        // 변경 사항 저장
        revenueRepository.save(revenue);
    }

    @Transactional
    public void distributeUserEarnings(User author, BigDecimal earnings) {
        // 유료 사용자에게 캐시로 수익을 분배하는 로직

        // 유저의 캐시에 수익을 추가
        author.addCash(earnings);

        // 변경된 유저 정보를 저장
        userRepository.save(author);
    }
}
