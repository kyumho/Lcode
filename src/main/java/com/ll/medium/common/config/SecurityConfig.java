package com.ll.medium.common.config;


import com.ll.medium.user.security.JwtAuthenticationFilter;
import com.ll.medium.user.security.JwtTokenUtil;
import com.ll.medium.user.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor

public class SecurityConfig {


    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenUtil);
        http
                .cors(c -> c.configure(http))
                .csrf(c -> c.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(a -> a
                        .requestMatchers(
                                new MvcRequestMatcher(introspector, "/h2-console/**"),
                                new AntPathRequestMatcher("/**"),
                                new AntPathRequestMatcher("/api/v1/member/join"),
                                new AntPathRequestMatcher("/api/v1/auth/login"),
                                new AntPathRequestMatcher("/api/v1/auth/logout"),
                                new AntPathRequestMatcher("/api/v1/auth/confirm-account"),
                                new AntPathRequestMatcher("/api/v1/auth/email-exists"),
                                new AntPathRequestMatcher("/api/v1/post/list"),
                                new AntPathRequestMatcher("/api/v1/post/detail/**"),
                                new AntPathRequestMatcher("/api/v1/post/recent"),
                                new AntPathRequestMatcher("/api/v1/member/exist/**"),
                                new AntPathRequestMatcher("/api/v1/email/exist/**")
                        ).permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailsService;
    }

}
