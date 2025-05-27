import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSalesStat, getPrevMonthSalesStat, recalculateSalesStat } from '../../api/StatApi';

const SalesStatComponent = ({ year: initialYear, month: initialMonth }) => {
    const navigate = useNavigate();
    
    // 현재 년월 상태
    const [selectedYear, setSelectedYear] = useState(
        parseInt(initialYear) || new Date().getFullYear()
    );
    const [selectedMonth, setSelectedMonth] = useState(
        parseInt(initialMonth) || new Date().getMonth() + 1
    );
    
    // 통계 데이터 상태
    const [currentStat, setCurrentStat] = useState(null);
    const [prevStat, setPrevStat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasCurrentData, setHasCurrentData] = useState(true);
    const [hasPrevData, setHasPrevData] = useState(true);
    const [isRecalculating, setIsRecalculating] = useState(false);

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

    // 숫자 포맷팅 함수 (원 단위)
    const formatCurrency = (amount) => {
        if (!amount) return '0';
        return new Intl.NumberFormat('ko-KR').format(amount);
    };

    // 데이터 조회 함수
    const fetchSalesData = async () => {
        setLoading(true);
        setError(null);
        setHasCurrentData(true);
        setHasPrevData(true);
        
        try {
            // 현재 월 데이터 조회
            let current = null;
            let prev = null;
            
            try {
                current = await getSalesStat(selectedYear, selectedMonth);
                setCurrentStat(current);
            } catch (err) {
                console.error('현재 월 매출 통계 조회 실패:', err);
                setHasCurrentData(false);
                setCurrentStat(null);
            }
            
            // 이전 월 데이터 조회 (현재 데이터가 있을 때만)
            if (current) {
                try {
                    prev = await getPrevMonthSalesStat(selectedYear, selectedMonth);
                    setPrevStat(prev);
                } catch (err) {
                    console.error('이전 월 매출 통계 조회 실패:', err);
                    setHasPrevData(false);
                    setPrevStat(null);
                }
            }
            
        } catch (err) {
            console.error('매출 통계 조회 실패:', err);
            setError('데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 데이터 조회
    useEffect(() => {
        fetchSalesData();
    }, []);

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        // URL 변경하여 네비게이션
        navigate(`/admin/statisticsmanager/sales/${selectedYear}/${selectedMonth}`);
        // 데이터 다시 조회
        fetchSalesData();
    };

    // 재계산 버튼 클릭 핸들러
    const handleRecalculate = async () => {
        setIsRecalculating(true);
        try {
            const recalculatedData = await recalculateSalesStat(selectedYear, selectedMonth);
            setCurrentStat(recalculatedData);
            setHasCurrentData(true);
            
            // 이전 월 데이터도 다시 조회
            try {
                const prev = await getPrevMonthSalesStat(selectedYear, selectedMonth);
                setPrevStat(prev);
                setHasPrevData(true);
            } catch (err) {
                setHasPrevData(false);
                setPrevStat(null);
            }
            
            alert('매출 통계가 재계산되었습니다.');
        } catch (err) {
            console.error('매출 통계 재계산 실패:', err);
            alert('매출 통계 재계산에 실패했습니다.');
        } finally {
            setIsRecalculating(false);
        }
    };

    // 로딩 중 표시
    if (loading) {
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
                
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">데이터를 불러오는 중...</div>
                </div>
            </div>
        );
    }

    // 에러 표시
    if (error) {
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
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-800">{error}</div>
                    <button 
                        onClick={fetchSalesData}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    // 매출 데이터가 없는 경우
    if (!hasCurrentData || !currentStat) {
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
                        
                        <div className="pt-6 flex space-x-2">
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                검색
                            </button>
                            <button
                                onClick={handleRecalculate}
                                disabled={isRecalculating}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
                            >
                                {isRecalculating ? '계산중...' : '재계산'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 데이터 없음 메시지 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <div className="text-gray-600 text-lg mb-4">데이터가 존재하지 않습니다.</div>
                    <div className="text-gray-500 text-sm">
                        재계산 버튼을 클릭하여 해당 월의 매출 통계를 생성할 수 있습니다.
                    </div>
                </div>
            </div>
        );
    }

    // 증감률 계산 (currentStat이 확실히 있을 때만)
    const salesChange = calculateChangeRate(
        currentStat.salesSum || 0, 
        prevStat?.salesSum || 0
    );

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
                    
                    <div className="pt-6 flex space-x-2">
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            검색
                        </button>
                        <button
                            onClick={handleRecalculate}
                            disabled={isRecalculating}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
                        >
                            {isRecalculating ? '계산중...' : '재계산'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 제목 */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    {selectedYear}년 {selectedMonth}월 매출 통계
                </h2>
            </div>

            {/* 메인 통계 카드 */}
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 현재 월 매출 */}
                    <div className="text-center">
                        <div className="text-lg font-medium text-gray-600 mb-2">
                            {selectedYear}년 {selectedMonth}월 매출
                        </div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                            {formatCurrency(currentStat.salesSum)}
                        </div>
                        <div className="text-sm text-gray-500">원</div>
                    </div>

                    {/* 전월 대비 증감 */}
                    <div className="text-center">
                        <div className="text-lg font-medium text-gray-600 mb-2">
                            전월 대비
                        </div>
                        {hasPrevData && prevStat ? (
                            <>
                                <div className={`text-2xl font-bold mb-2 ${
                                    salesChange.isIncrease ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {salesChange.isIncrease ? '+' : '-'}{salesChange.rate}%
                                </div>
                                <div className="text-sm text-gray-500">
                                    전월: {formatCurrency(prevStat.salesSum)}원
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-400">
                                <div className="text-xl mb-2">비교 데이터 없음</div>
                                <div className="text-sm">전월 데이터가 존재하지 않습니다</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 상세 정보 */}
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">상세 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded">
                        <div className="text-sm font-medium text-gray-600">조회 기간</div>
                        <div className="text-lg font-semibold text-gray-800">
                            {selectedYear}년 {selectedMonth}월
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                        <div className="text-sm font-medium text-gray-600">총 매출액</div>
                        <div className="text-lg font-semibold text-gray-800">
                            {formatCurrency(currentStat.salesSum)}원
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                        <div className="text-sm font-medium text-gray-600">데이터 생성일</div>
                        <div className="text-lg font-semibold text-gray-800">
                            {currentStat.createdAt ? 
                                new Date(currentStat.createdAt).toLocaleDateString('ko-KR') : 
                                '정보 없음'
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* 안내 메시지 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                            매출 통계 정보
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <ul className="list-disc pl-4 space-y-1">
                                <li>매출 통계는 예약 상태가 'CONFIRMED'인 예약만을 대상으로 합니다.</li>
                                <li>좌석 등급별 가격은 각 공연의 설정 가격을 기준으로 계산됩니다.</li>
                                <li>재계산 버튼을 통해 최신 데이터를 기반으로 통계를 업데이트할 수 있습니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesStatComponent;