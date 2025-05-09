import React from 'react';

const MemberDetailModal = ({ member, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
            ×
        </button>
        <h2 className="text-xl font-semibold mb-4">회원 상세정보</h2>
        <ul className="space-y-2">
            <li><strong>회원번호:</strong> {member.mbrNo}</li>
            <li><strong>회원ID:</strong> {member.mbrId}</li>
            <li><strong>이름:</strong> {member.mbrName}</li>
            <li><strong>이메일:</strong> {member.email}</li>
            <li><strong>상태:</strong> {member.stat}</li>
        </ul>
        <div className="mt-4 text-right">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                닫기
            </button>
            </div>
        </div>
        </div>
    );
};

export default MemberDetailModal;