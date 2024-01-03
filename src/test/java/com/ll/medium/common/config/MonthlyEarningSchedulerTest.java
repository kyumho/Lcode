package com.ll.medium.common.config;

import com.ll.medium.post.repository.PostRepository;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("dev")
public class MonthlyEarningSchedulerTest {


    @Autowired
    private MonthlyEarningScheduler monthlyEarningScheduler;

    @Test
    @DisplayName("정산 기능 잘 되는지 테스트")
    public void testDistributeEarnings() {
       monthlyEarningScheduler.distributeEarnings();
    }
}