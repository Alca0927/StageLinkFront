import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMemberStat, getPrevMonthStat } from '../../api/StatApi';

const MemberStat = ({ year: initialYear, month: initialMonth }) => {
    const navigate = useNavigate();
    
    // 현재 년월 상태
    const [selectedYear, setSelectedYear] = useState(
        initialYear || new Date().getFullYear()
    );
    const [selectedMonth, setSelectedMonth] = useState(
        initialMonth || new Date().getMonth() + 1
    );
    
    // 통계 데이터 상태
    const [currentStat, setCurrentStat] = useState(null);
    const [prevStat, setPrevStat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasCurrentData, setHasCurrentData] = useState(true);
    const [hasPrevData, setHasPrevData] = useState(true);

    // 년도 옵션 생성 (현재 년도부터 5년 전까지)
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= currentYear - 5; i--) {
            years.push(i);
        }
        return years;
    };

    // 월 옵션 생성
    const generateMonthOptions = () => {
        return Array.from({ length: 12 }, (_, i) => i + 1);
    };

    // 증감률 계산 함수
    const calculateChangeRate = (current, previous) => {
        if (!previous || previous === 0) return { rate: 0, isIncrease: true };
        
        const rate = ((current - previous) / previous * 100).toFixed(1);
        return {
            rate: Math.abs(rate),
            isIncrease: rate >= 0
        };
    };

    // 데이터 조회 함수
    const fetchStatData = async () => {
        setLoading(true);
        setError(null);
        setHasCurrentData(true);
        setHasPrevData(true);
        
        try {
            // 현재 월 데이터 조회
            let current = null;
            let prev = null;
            
            try {
                current = await getMemberStat(selectedYear, selectedMonth);
                setCurrentStat(current);
            } catch (err) {
                console.error('현재 월 통계 데이터 조회 실패:', err);
                setHasCurrentData(false);
                setCurrentStat(null);
            }
            
            // 이전 월 데이터 조회 (현재 데이터가 있을 때만)
            if (current) {
                try {
                    prev = await getPrevMonthStat(selectedYear, selectedMonth);
                    setPrevStat(prev);
                } catch (err) {
                    console.error('이전 월 통계 데이터 조회 실패:', err);
                    setHasPrevData(false);
                    setPrevStat(null);
                }
            }
            
        } catch (err) {
            console.error('통계 데이터 조회 실패:', err);
            setError('데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 데이터 조회
    useEffect(() => {
        fetchStatData();
    }, []);

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        // URL 변경하여 네비게이션
        navigate(`/admin/statisticsmanager/members/${selectedYear}/${selectedMonth}`);
        // 데이터 다시 조회
        fetchStatData();
    };

    // 로딩 중 표시
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">데이터를 불러오는 중...</div>
            </div>
        );
    }

    // 에러 표시
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">{error}</div>
                <button 
                    onClick={fetchStatData}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    // 통계 데이터가 없는 경우
    if (!hasCurrentData) {
        return (
            <div className="space-y-6">
                {/* 검색 영역 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                년도
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {generateYearOptions().map(year => (
                                    <option key={year} value={year}>
                                        {year}년
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                월
                            </label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {generateMonthOptions().map(month => (
                                    <option key={month} value={month}>
                                        {month}월
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="pt-6">
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                검색
                            </button>
                        </div>
                    </div>
                </div>

                {/* 데이터 없음 메시지 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <div className="text-gray-600 text-lg">데이터가 존재하지 않습니다.</div>
                </div>
            </div>
        );
    }

    // 증감률 계산 (currentStat이 있을 때만)
    const memberSumChange = currentStat ? calculateChangeRate(
        currentStat.memberSum, 
        prevStat?.memberSum
    ) : { rate: 0, isIncrease: true };
    
    const joinedMemberChange = currentStat ? calculateChangeRate(
        currentStat.joinedMember, 
        prevStat?.joinedMember
    ) : { rate: 0, isIncrease: true };

    return (
        <div className="space-y-6">
            {/* 검색 영역 */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            년도
                        </label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {generateYearOptions().map(year => (
                                <option key={year} value={year}>
                                    {year}년
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            월
                        </label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {generateMonthOptions().map(month => (
                                <option key={month} value={month}>
                                    {month}월
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="pt-6">
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            검색
                        </button>
                    </div>
                </div>
            </div>

            {/* 통계 카드 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 총 회원수 카드 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">총 회원수</h3>
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-blue-600">
                                    {currentStat.memberSum?.toLocaleString() || 0}
                                </span>
                                <span className="text-gray-500 ml-2">명</span>
                            </div>
                            {hasPrevData && prevStat && (
                                <div className="mt-2 flex items-center">
                                    <span className={`text-sm ${
                                        memberSumChange.isIncrease ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {memberSumChange.isIncrease ? '↗' : '↘'} {memberSumChange.rate}%
                                    </span>
                                    <span className="text-gray-500 text-sm ml-2">
                                        (지난달 대비)
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="text-blue-100 bg-blue-600 p-3 rounded-full">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 가입자수 카드 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">월 가입자수</h3>
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-green-600">
                                    {currentStat.joinedMember?.toLocaleString() || 0}
                                </span>
                                <span className="text-gray-500 ml-2">명</span>
                            </div>
                            {hasPrevData && prevStat && (
                                <div className="mt-2 flex items-center">
                                    <span className={`text-sm ${
                                        joinedMemberChange.isIncrease ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {joinedMemberChange.isIncrease ? '↗' : '↘'} {joinedMemberChange.rate}%
                                    </span>
                                    <span className="text-gray-500 text-sm ml-2">
                                        (지난달 대비)
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="text-green-100 bg-green-600 p-3 rounded-full">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기간 정보 */}
            <div className="text-center text-gray-500 text-sm">
                {selectedYear}년 {selectedMonth}월 통계
                {currentStat.createdDate && (
                    <span className="ml-2">
                        (업데이트: {new Date(currentStat.createdDate).toLocaleDateString()})
                    </span>
                )}
            </div>
        </div>
    );
};

export default MemberStat;