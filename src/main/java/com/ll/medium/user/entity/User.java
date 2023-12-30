package com.ll.medium.user.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ll.medium.common.entity.DateEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "users")
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class User extends DateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    private String address;

    @Column(name = "address_detail")
    private String addressDetail;

    @Column(name = "profile_url")
    private String profilePhotoUrl;

    @Column(name = "provider_id")
    @JsonIgnore
    private String providerId;

    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private SocialProvider provider;

    private boolean isPaid = false;  // 결제 여부를 나타내는 필드

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private LocalDateTime createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @JsonIgnore
    private boolean emailVerified;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "refresh_token_id")
    @JsonIgnore
    private RefreshToken refreshToken;

    public void verifyEmail() {
        this.emailVerified = true;
    }

    public void updateUser(boolean isPaid, UserRole role) {
        this.isPaid = isPaid;
        this.role = role;
    }

    public void updateUser(String password, String address, String addressDetail) {
        this.password = password;
        this.address = address;
        this.addressDetail = addressDetail;
    }
}
