package com.ll.medium.user.service;


import com.ll.medium.user.config.MailProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final MailProperties mailProperties;
    private final JavaMailSender javaMailSender;

    @Async
    public void sendVerificationEmail(String email, String token) {
        MimeMessage mail = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mail, "utf-8");

        String htmlMsg = "<h3>미디엄 클론 이메일 인증</h3>"
                + "<p>이메일 인증을 하시려면 아래 링크를 클릭해주세요 :</p>"
                + "<a href='http://localhost:8080/api/v1/auth/confirm-account?token=" + token + "'>이메일 인증하기</a>";

        try {
            helper.setTo(email);
            helper.setSubject("미디엄 클론 이메일 인증");
            helper.setText(htmlMsg, true); // true를 넣어주면 html 형식으로 메일이 보내집니다.
            helper.setFrom(mailProperties.getUsername());
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        javaMailSender.send(mail);
    }
}
