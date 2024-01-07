package com.ll.medium.revenue.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRevenue is a Querydsl query type for Revenue
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRevenue extends EntityPathBase<Revenue> {

    private static final long serialVersionUID = -583550341L;

    public static final QRevenue revenue = new QRevenue("revenue");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<java.math.BigDecimal> totalRevenue = createNumber("totalRevenue", java.math.BigDecimal.class);

    public QRevenue(String variable) {
        super(Revenue.class, forVariable(variable));
    }

    public QRevenue(Path<? extends Revenue> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRevenue(PathMetadata metadata) {
        super(Revenue.class, metadata);
    }

}

