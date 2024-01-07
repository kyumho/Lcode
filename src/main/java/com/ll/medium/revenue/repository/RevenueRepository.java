package com.ll.medium.revenue.repository;

import com.ll.medium.revenue.entity.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevenueRepository extends JpaRepository<Revenue, Long> {
}
