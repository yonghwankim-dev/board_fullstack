package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.MemberMapper;
import com.example.demo.vo.MemberVO;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired(required = true)
	MemberMapper memberMapper;
	
	@PostMapping
	void insertMember(@RequestBody MemberVO member) {
		memberMapper.insertMember(member);
		System.out.println("회원 DB 저장 성공");
	}
	
	@PostMapping("/checkID")
	int checkDuplicateID(@RequestBody MemberVO member) {
		return memberMapper.checkDuplicateID(member);
	}
	
	@PostMapping("/checkEmail")
	int checkDuplicateEmail(@RequestBody MemberVO member) {
		return memberMapper.checkDuplicateEmail(member);
	}
	
	@PostMapping("/checkPhone")
	int checkDuplicatePhone(@RequestBody MemberVO member) {
		return memberMapper.checkDuplicatePhone(member);
	}
}
