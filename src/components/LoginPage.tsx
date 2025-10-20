import React, { useState } from 'react';
// react-router-dom의 Link 컴포넌트를 import 합니다.
import { Link } from 'react-router-dom'; 
import '../css/login.css';

const LoginPage: React.FC = () => {
    // 폼 제출 시 실행될 함수 (실제 로그인 로직은 여기에 들어갑니다)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 페이지 새로고침 방지
        
        // ⭐️ 중요: 실제 로그인 및 관리자 페이지 이동 로직
        // 1. 아이디와 비밀번호를 서버로 전송합니다.
        // 2. 응답에 따라 로그인 성공/실패 처리 또는 관리자 페이지로 리디렉션(navigate)합니다.
        
        console.log("로그인 시도...");
        // 예시: 로그인 성공 시 '/admin' 또는 '/'로 이동
        // navigate('/admin'); 
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="logo-title">Pastel Shop</h1>
                <p className="subtitle">관리자 / 회원 로그인</p>

                {/* 폼 제출은 onSubmit 이벤트 핸들러로 처리합니다. action 속성 사용 안 함 */}
                <form onSubmit={handleSubmit} className="login-form">
                    
                    <div className="input-group">
                        <label htmlFor="username"><i className="fas fa-user"></i> 아이디</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="아이디를 입력하세요" 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password"><i className="fas fa-lock"></i> 비밀번호</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="비밀번호를 입력하세요" 
                            required 
                        />
                    </div>

                    <div className="options-group">
                        <label>
                            <input type="checkbox" name="remember" /> 아이디 저장
                        </label>
                        {/* <a> 태그 대신 <Link> 컴포넌트 사용을 권장하지만, 현재 경로는 #이므로 <a> 유지 */}
                        <a href="#" className="find-link">아이디/비밀번호 찾기</a> 
                    </div>

                    <button type="submit" className="login-btn">로그인</button>
                </form>

                <div className="extra-links">
                    {/* 회원가입 페이지가 있다면 <Link to="/signup">로 변경해야 합니다. */}
                    <a href="#">회원가입</a> | 
                    
                    {/* 메인 페이지로 돌아가기: <a> 태그 대신 <Link> 컴포넌트 사용 */}
                    <Link to="/">메인으로 돌아가기</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;