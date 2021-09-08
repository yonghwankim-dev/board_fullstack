package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.MemberVO;

@Mapper
public interface MemberMapper {
	void insertMember(MemberVO member);	// 회원 추가
	int checkDuplicateID(MemberVO member);	// 유효성 검사 : ID 중복체크
	int checkDuplicateEmail(MemberVO member);	// 유효성 검사 : Email 중복체크
	int checkDuplicatePhone(MemberVO member);	// 유효성 검사 : Phone 중복체크
}
