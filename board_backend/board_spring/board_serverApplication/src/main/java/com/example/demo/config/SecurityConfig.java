package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.mapper.MemberMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@Slf4j
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	private MemberMapper memberMapper;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		// 인증을 무시하기 위한 설정
		web.ignoring().antMatchers("/css/**","/js/**","/img/**","/lib/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/**").permitAll()
				.and()
			.formLogin()	// 로그인 설정
				.loginPage("");
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
	}


	
	
}
