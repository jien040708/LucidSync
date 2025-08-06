import React, { useState } from 'react';
import './TabContent.css';

const MockInvestment = () => {
  const [selectedStock, setSelectedStock] = useState('삼성전자');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isActiveInvestment, setIsActiveInvestment] = useState(false);
  const [investmentSettings, setInvestmentSettings] = useState({
    portfolioTitle: '',
    totalAssets: '',
    assetUnit: 'KRW', // 'KRW' or 'USD'
    startDate: '',
    endDate: '',
    riskLevel: 'medium'
  });

  // 기존 모의투자 포트폴리오 데이터
  const existingPortfolios = [
    {
      id: 1,
      name: '첫 번째 모의투자',
      totalAssets: '₩10,000,000',
      currentValue: '₩10,520,000',
      profit: '+₩520,000',
      profitRate: '+5.2%',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'completed'
    },
    {
      id: 2,
      name: 'AI 테마 투자',
      totalAssets: '₩15,000,000',
      currentValue: '₩14,850,000',
      profit: '-₩150,000',
      profitRate: '-1.0%',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      status: 'completed'
    },
    {
      id: 3,
      name: '현재 진행중 투자',
      totalAssets: '₩20,000,000',
      currentValue: '₩21,200,000',
      profit: '+₩1,200,000',
      profitRate: '+6.0%',
      startDate: '2024-03-01',
      endDate: '2024-04-01',
      status: 'active'
    }
  ];

  // 주식 데이터
  const stocks = [
    { name: '삼성전자', price: '₩75,000', change: '+2.1%', changeType: 'positive', sector: '반도체' },
    { name: 'SK하이닉스', price: '₩125,000', change: '-1.3%', changeType: 'negative', sector: '반도체' },
    { name: 'NAVER', price: '₩220,000', change: '+0.8%', changeType: 'positive', sector: 'IT' },
    { name: '카카오', price: '₩45,000', change: '+1.2%', changeType: 'positive', sector: 'IT' },
    { name: 'LG화학', price: '₩450,000', change: '-0.5%', changeType: 'negative', sector: '화학' },
    { name: '현대차', price: '₩180,000', change: '+3.2%', changeType: 'positive', sector: '자동차' },
    { name: '기아', price: '₩85,000', change: '+2.8%', changeType: 'positive', sector: '자동차' },
    { name: 'POSCO홀딩스', price: '₩380,000', change: '-0.8%', changeType: 'negative', sector: '철강' },
    { name: 'LG전자', price: '₩95,000', change: '+1.5%', changeType: 'positive', sector: '전자' },
    { name: 'KB금융', price: '₩55,000', change: '+0.3%', changeType: 'positive', sector: '금융' }
  ];

  // 검색 필터링
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // AI 분석 데이터
  const aiAnalysis = {
    삼성전자: {
      recommendation: '매수',
      confidence: '85%',
      analysis: '반도체 업종의 회복세와 AI 수요 증가로 인해 삼성전자는 강력한 성장 동력을 보이고 있습니다. 메모리 반도체 가격 상승과 AI 칩 수요 증가가 주요 호재로 작용할 것으로 예상됩니다.',
      keyPoints: [
        '메모리 반도체 가격 상승세 지속',
        'AI 칩 수요 급증',
        '글로벌 시장 점유율 확대',
        '차세대 기술 개발 우위'
      ],
      riskFactors: [
        '반도체 사이클 변동성',
        '글로벌 경기 침체 우려'
      ]
    },
    'SK하이닉스': {
      recommendation: '관망',
      confidence: '70%',
      analysis: '반도체 업종의 회복세가 예상되지만, 단기적으로는 메모리 가격 변동성으로 인한 불확실성이 존재합니다. 장기적으로는 AI 수요 증가로 인한 성장 가능성이 높습니다.',
      keyPoints: [
        '메모리 가격 변동성 존재',
        'AI 수요 증가 전망',
        '기술 경쟁력 우수',
        '장기 성장 가능성'
      ],
      riskFactors: [
        '단기 가격 변동성',
        '경쟁사 기술 발전'
      ]
    },
    NAVER: {
      recommendation: '매수',
      confidence: '80%',
      analysis: 'AI 기술 투자 확대와 플랫폼 사업의 안정적 성장으로 NAVER는 지속적인 성장이 예상됩니다. 특히 AI 분야에서의 기술적 우위가 주요 강점입니다.',
      keyPoints: [
        'AI 기술 투자 확대',
        '플랫폼 사업 안정성',
        '글로벌 진출 가속화',
        '신규 사업 확장'
      ],
      riskFactors: [
        '규제 환경 변화',
        '경쟁 심화'
      ]
    }
  };

  const currentAnalysis = aiAnalysis[selectedStock] || aiAnalysis['삼성전자'];

  const handleStartInvestment = () => {
    setIsActiveInvestment(true);
    setShowPopup(false);
  };

  const handleCancelInvestment = () => {
    setIsActiveInvestment(false);
    setShowPopup(false);
  };

  const handleReturnToHome = () => {
    setIsActiveInvestment(false);
    setSelectedStock('삼성전자');
    setSearchTerm('');
  };

  // 기존 포트폴리오 목록 화면
  if (!isActiveInvestment) {
    return (
      <div className="tab-content">
        <div className="content-header">
          <h1>모의투자</h1>
          <p>기존 포트폴리오와 새로운 모의투자 시작</p>
        </div>
        
        <div className="content-grid">
          {/* 기존 포트폴리오 목록 */}
          <div className="content-card">
            <h3>기존 모의투자 포트폴리오</h3>
            <div className="portfolio-list">
              {existingPortfolios.map((portfolio) => (
                <div key={portfolio.id} className="portfolio-item">
                  <div className="portfolio-header">
                    <h4>{portfolio.name}</h4>
                    <span className={`status-badge ${portfolio.status}`}>
                      {portfolio.status === 'active' ? '진행중' : '완료'}
                    </span>
                  </div>
                  <div className="portfolio-details">
                    <div className="portfolio-info">
                      <span>총 자산: {portfolio.totalAssets}</span>
                      <span>현재 가치: {portfolio.currentValue}</span>
                      <span className={`profit ${portfolio.profitRate.startsWith('+') ? 'positive' : 'negative'}`}>
                        {portfolio.profit} ({portfolio.profitRate})
                      </span>
                    </div>
                    <div className="portfolio-dates">
                      <span>시작일: {portfolio.startDate}</span>
                      <span>종료일: {portfolio.endDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
                         {/* 모의투자 시작 버튼 - 포트폴리오 카드 내부에 배치 */}
             <div className="start-investment-container">
               <button 
                 className="start-investment-btn"
                 onClick={() => setShowPopup(true)}
               >
                 새 모의투자 시작하기
               </button>
             </div>
          </div>
        </div>

                 {/* 모의투자 시작 팝업 */}
         {showPopup && (
           <div className="popup-overlay">
             <div className="investment-popup">
               <h3>새로운 모의투자 설정</h3>
               
               <div className="investment-settings">
                 <div className="setting-group">
                   <label>포트폴리오 제목</label>
                   <input
                     type="text"
                     placeholder="포트폴리오 제목을 입력하세요"
                     value={investmentSettings.portfolioTitle}
                     onChange={e => setInvestmentSettings({
                       ...investmentSettings,
                       portfolioTitle: e.target.value
                     })}
                     className="asset-input"
                   />
                 </div>
               </div>

               <div className="popup-buttons">
                 <button className="cancel-btn" onClick={handleCancelInvestment}>
                   취소
                 </button>
                 <button className="start-btn" onClick={handleStartInvestment}>
                   시작하기
                 </button>
               </div>
             </div>
           </div>
         )}
      </div>
    );
  }

  // 활성 모의투자 화면
  return (
    <div className="tab-content">
      <div className="content-header">
        <div className="header-with-button">
          <div className="header-content">
            <h1>모의투자 진행중</h1>
            <p>실제 시장 데이터를 기반으로 한 모의 투자 환경</p>
          </div>
          <button className="home-button" onClick={handleReturnToHome}>
            모의투자 홈
          </button>
        </div>
      </div>
      
      <div className="investment-layout">
        {/* 왼쪽: AI 분석 영역 */}
        <div className="ai-analysis-section">
          <div className="content-card">
            <h3>AI 투자 분석</h3>
            <div className="selected-stock-info">
              <h4>{selectedStock}</h4>
              <div className="stock-price-info">
                <span className="current-price">{stocks.find(s => s.name === selectedStock)?.price}</span>
                <span className={`price-change ${stocks.find(s => s.name === selectedStock)?.changeType}`}>
                  {stocks.find(s => s.name === selectedStock)?.change}
                </span>
              </div>
            </div>
            
            <div className="ai-recommendation">
              <div className="recommendation-badge">
                <span className="recommendation-text">{currentAnalysis.recommendation}</span>
                <span className="confidence-score">신뢰도: {currentAnalysis.confidence}</span>
              </div>
            </div>
            
            <div className="analysis-content">
              <h5>투자 분석</h5>
              <p>{currentAnalysis.analysis}</p>
              
              <h5>주요 포인트</h5>
              <ul className="key-points">
                {currentAnalysis.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              
              <h5>위험 요소</h5>
              <ul className="risk-factors">
                {currentAnalysis.riskFactors.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* 오른쪽: 주식 리스트뷰 */}
        <div className="stock-list-section">
          <div className="content-card">
            <h3>주식 목록</h3>
            
            {/* 검색바 */}
            <div className="search-container">
              <input
                type="text"
                placeholder="주식명 또는 섹터로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="stock-search"
              />
            </div>
            
            {/* 주식 리스트 */}
            <div className="stock-list-container">
              {filteredStocks.map((stock, index) => (
                <div
                  key={index}
                  className={`stock-list-item ${selectedStock === stock.name ? 'selected' : ''}`}
                  onClick={() => setSelectedStock(stock.name)}
                >
                  <div className="stock-info">
                    <div className="stock-name-sector">
                      <span className="stock-name">{stock.name}</span>
                      <span className="stock-sector">{stock.sector}</span>
                    </div>
                    <div className="stock-price-change">
                      <span className="stock-price">{stock.price}</span>
                      <span className={`stock-change ${stock.changeType}`}>
                        {stock.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 매수/매도 버튼 */}
            <div className="trading-buttons">
              <button className="buy-button">
                매수
              </button>
              <button className="sell-button">
                매도
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInvestment; 